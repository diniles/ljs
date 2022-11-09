'use strict';
// Умножаем все числовые свойства на 2
// Создайте функцию multiplyNumeric(obj), которая умножает все числовые свойства объекта obj на 2.
//
// Например:
//
// // до вызова функции
//   let menu = {
//     width: 200,
//     height: 300,
//     title: "My menu"
//   };
//
// multiplyNumeric(menu);
//
// // после вызова функции
// menu = {
//   width: 400,
//   height: 600,
//   title: "My menu"
// };
// Обратите внимание, что multiplyNumeric не нужно ничего возвращать. Следует напрямую изменять объект.
//
//   P.S. Используйте typeof для проверки, что значение свойства числовое.

let menu = {
  width: 200,
  height: 300,
  title: "My menu"
};

const multiplyNumeric = (obj) => {
  for (const objKey in obj) {
    if (typeof (obj[objKey]) === 'number') obj[objKey] *= 2;
  }
};

multiplyNumeric(menu);

console.log(menu);