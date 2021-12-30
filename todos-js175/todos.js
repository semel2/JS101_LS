const express = require("express");
const morgan = require("morgan");
const flash = require("express-flash");
const session = require("express-session");
const { body, validationResult } = require("express-validator");
const TodoList = require("./lib/todolist");
const Todo = require("./lib/todo");
const { sortTodoLists, sortTodos } = require("./lib/sort");
const store = require("connect-loki");

const app = express();
const host = "localhost";
const port = 3000;
const LokiStore = store(session);

app.set("views", "./views");
app.set("view engine", "pug");

const loadTodoList = (todoListId, todoLists) => {
  return todoLists.find(todoList => todoList.id === todoListId);
} 

app.use(morgan("common"));
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(session({
  cookie: {
    httpOnly: true,
    maxAge: 31 * 24 * 60 * 60 * 1000,
    path: "/",
    secure: false,
  },
  name: "launch-school-todos-session-id",
  resave: false,
  saveUninitialized: true,
  secret: "this is not very secure",
  store: new LokiStore({}),
}));

app.use(flash());
app.use((req, res, next) => {
  let todoLists = [];
  if ("todoLists" in req.session) {
    req.session.todoLists.forEach(todoList => {
      todoLists.push(TodoList.makeTodoList(todoList));
    });
  }

  req.session.todoLists = todoLists;
  next();
});

app.use((req, res, next) => {
  res.locals.flash = req.session.flash;
  delete req.session.flash;
  next();
})

app.get("/", (req, res) => {
  res.redirect("/lists");
});

app.get("/lists", (req, res) => {
  res.render("lists", {
    todoLists: sortTodoLists(req.session.todoLists),
  });
});

app.get("/lists/new", (req, res) => {
  res.render("new-list");
});

app.post("/lists", //Handle attempts to create new lists
  [
    body("todoListTitle")
      .trim()
      .isLength({ min: 1 })
      .withMessage("The list title is required.")
      .isLength({ max: 100 })
      .withMessage("List title must be between 1 and 100 characters.")
      .custom((title, { req }) => {
        let todoLists = req.session.todoLists;
        let duplicate = todoLists.find(list => list.title === title);
        return duplicate === undefined;
      })
      .withMessage("List title must be unique."),
  ],
  (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));
      res.render("new-list", {
        flash: req.flash(),
        todoListTitle: req.body.todoListTitle,
      });
    } else {
      req.session.todoLists.push(new TodoList(req.body.todoListTitle));
      req.flash("success", "The todo list has been created.");
      res.redirect("/lists");
    }
  }
);

app.get("/lists/:todoListId/edit", (req, res, next) => { //Display edit list page
  let todoList = loadTodoList(+req.params.todoListId, req.session.todoLists);
  if (!todoList) {
    next(new Error("Not found."))
  } else {
    res.render("edit-list", { todoList });
  }
})

app.post("/lists/:todoListId/destroy", (req, res, next) => { //Handle attempts to delete lists
  let todoLists = req.session.todoLists;
  let todoList = loadTodoList(+req.params.todoListId, todoLists); 
  if (!todoList) {
    next(new Error("Not found."))
  } else {
    req.flash("info", `${todoList.title} has been deleted.`)
    todoLists.splice(todoLists.indexOf(todoList), 1);
    res.redirect("/lists")
  }
})

app.post("/lists/:todoListId/edit", //Handle attempts to edit list titles
[
  body("todoListTitle")
    .trim()
    .isLength({ min: 1 })
    .withMessage("The list title is required.")
    .isLength({ max: 100 })
    .withMessage("List title must be between 1 and 100 characters.")
    .custom((title, { req }) => {
      let duplicate = req.session.todoLists.find(list => list.title === title);
      return duplicate === undefined;
    })
    .withMessage("List title must be unique."),
],
(req, res, next) => {
  let todoList = loadTodoList(+req.params.todoListId, req.session.todoLists);
  if (!todoList) {
    next(new Error("Not found."))
  } else {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));
      res.render("edit-list", {
        flash: req.flash(),
        todoList: todoList,
        todoListTitle: req.body.todoListTitle,
      });
    } else {
      req.flash("success", `Todo list ${todoList.title} renamed to ${req.body.todoListTitle}.`)
      todoList.setTitle(req.body.todoListTitle); 
      res.redirect(`/lists/${req.params.todoListId}`);
    }
  }
})

app.post("/lists/:todoListId/todos/:todoId/toggle", (req, res, next) => { //Handle attempts to mark todos as done/not done
  let todoList = loadTodoList(+req.params.todoListId, req.session.todoLists);
  if (!todoList) {
    next(new Error("Not found."))
  } else {
    let todo = todoList.findById(+req.params.todoId);
    if (!todo) {
      next(new Error("Not found."));
    } else {
      let title = todo.title;
      if (!todo.isDone()) {
        todo.markDone();
        req.flash("success", `${title} has been completed!`);
      } else {
        todo.markUndone();
        req.flash("lol", `${title} has been marked incomplete.`);
      }
      res.redirect(`/lists/${req.params.todoListId}`);
    }
  }
})

app.post("/lists/:todoListId/todos/:todoId/destroy", (req, res, next) => { //Handle attempts to delete individual todos
  let todoList = loadTodoList(+req.params.todoListId, req.session.todoLists);
  if (!todoList) {
    next(new Error("Not found."))
  } else {
    let todo = todoList.findById(+req.params.todoId);
    if (!todo) {
      next(new Error("Not found."));
    } else {
      let title = todo.title;
      todoList.removeAt(todoList.findIndexOf(todo));
      req.flash("info", `${title} has been deleted.`)
      res.redirect(`/lists/${req.params.todoListId}`);
    }
  }
})

app.post("/lists/:todoListId/complete_all", (req, res, next) => { //Handle attempts to mark all todos on a list as done
  let todoList = loadTodoList(+req.params.todoListId, req.session.todoLists);
  if (!todoList) {
    next(new Error("Not found."))
  } else {
    todoList.markAllDone();
    req.flash("success", `All todos on ${todoList.title} marked complete!`)
    res.redirect(`/lists/${req.params.todoListId}`);
  }
})

app.post("/lists/:todoListId/todos", //Handle attempts to create new todo on a list
[
  body("todoTitle")
  .trim()
  .isLength({ min: 1 })
  .withMessage("Todo title is required.")
  .isLength({ max: 100 })
  .withMessage("Todo title must be between 1 and 100 characters.")
],
(req, res, next) => {
  let todoList = loadTodoList(+req.params.todoListId, req.session.todoLists);
  if (!todoList) {
    next(new Error("Not found."));
  } else {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach(message => req.flash("error", message.msg));
      res.redirect(`/lists/${req.params.todoListId}`);
    } else {
      todoList.add(new Todo(req.body.todoTitle));
      req.flash("success", `Todo "${req.body.todoTitle}" has been created.`)
      res.redirect(`/lists/${req.params.todoListId}`);
    }
  }
})

app.get("/lists/:todoListId", (req, res, next) => {
  let todoListId = req.params.todoListId;
  let todoList = loadTodoList(+todoListId, req.session.todoLists);
  if (todoList === undefined) {
    next(new Error("Not found."));
  } else {
    res.render("list", {
      todoList: todoList,
      todos: sortTodos(todoList),
    })
  }
})

app.use((err, req, res, _next) => {
  console.log(err);
  res.status(404).send(err.message);
})

app.listen(port, host, () => {
  console.log(`Todos is listening on port ${port} of ${host}!`);
});