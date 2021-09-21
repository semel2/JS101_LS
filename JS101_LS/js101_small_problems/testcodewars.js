var maxSequence = function(arr){
  let returnSum = 0;
  for (let i = 0; i < arr.length; i += 1) {
    for (let j = i + 1; j <= arr.length; j += 1) {
      newSum = arr.slice(i, j).reduce((accum, element) => accum + element, 0);
      if (newSum > returnSum) {
        returnSum = newSum;
      };
    };
  };
};

maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4])