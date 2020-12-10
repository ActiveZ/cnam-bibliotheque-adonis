// http://zetcode.com/javascript/lodash/

// const _ = require("lodash")

// let words = ['sky', 'wood', 'forest', 'falcon', 
//     'pear', 'ocean', 'universe'];

// let fel = _.first(words);
// let lel = _.last(words);

// console.log(`First element: ${fel}`);
// console.log(`Last element: ${lel}`);

// let nums = [1, 2, 3, 4, 5, 6, 7, 8];
 
// console.log(_.slice(nums,2,6));
// console.log(_.slice(nums,0,8));

// const R = require('ramda');

// const users1 = [
//   { name: 'John', age: 25 },
//   { name: 'Lenny', age: 51 },
//   { name: 'Andrew', age: 43 },
//   { name: 'Peter', age: 81 },
//   { name: 'Anna', age: 43 },
//   { name: 'Albert', age: 76 },
//   { name: 'Adam', age: 47 },
//   { name: 'Robert', age: 72 }
// ];

// console.log(R.pluck('age', users1));
// console.log(R.pluck('name', users1));


// // http://zetcode.com/javascript/ramda/

// const users = [
//     { name: 'John', city: 'London', born: '2001-04-01' },
//     { name: 'Lenny', city: 'New York', born: '1997-12-11' },
//     { name: 'Andrew', city: 'Boston', born: '1987-02-22' },
//     { name: 'Peter', city: 'Prague', born: '1936-03-24' },
//     { name: 'Anna', city: 'Bratislava', born: '1973-11-12' },
//     { name: 'Albert', city: 'Bratislava', born: '1940-18-19' },
//     { name: 'Adam', city: 'Trnava', born:'1983-12-01' },
//     { name: 'Robert', city: 'Bratislava', born: '1935-05-15' }, 
//     { name: 'Robert', city: 'Prague', born:'1998-03-14' }
//   ];

// let res = R.reject(R.propEq('city', 'Bratislava'))(users);
// console.log(res);

// let res2 = R.filter(R.propEq('city', 'Bratislava'))(users);
// console.log(res2);

let debiter = (montant)=>{
  const solde = 500
  if (solde-montant<0) {
    throw new Error("le solde sera < 0")
  }
  else {
    return solde-montant
  }
}

try {
  let solde = debiter(600)
  console.log("solde:", solde)
}
catch(e) {
  console.log(e.message)
}

console.log("fin")
