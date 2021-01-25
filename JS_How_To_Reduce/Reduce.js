const list = [1,2,3,4,5,6];

//reduce is like doing a for loop where val represents each iteration and acc is where the return is stored to until the whole loop is done.
function sum(acc, val){
  return acc * val;
}

// can also be written as
//function sum((acc,val) => (val*acc));

// acc refers to the 1st index of the list unless specified eg; list.reduce(sum,20);
const a = list.reduce(sum);
console.log(a);

