'use strict';
// Подсчёт количества свойств объекта
// Напишите функцию count(obj), которая возвращает количество свойств объекта:
//
//   let user = {
//     name: 'John',
//     age: 30
//   };
//
// alert( count(user) ); // 2
// Постарайтесь сделать код как можно короче.
//
// P.S. Игнорируйте символьные свойства, подсчитывайте только «обычные».

let user = {
  name: 'John',
  age: 30
};

// My solution
// function count(obj) {
//   let counter = 0;
//   for (const objElement of Object.keys(obj)) {
//     counter++;
//   }
//   return counter;
// }

// Correct solution!!!
function count(obj) {
  return Object.keys(obj).length;
}

console.log(count(user));