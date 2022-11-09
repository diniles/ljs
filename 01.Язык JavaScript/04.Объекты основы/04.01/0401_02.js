'use strict';
// Проверка на пустоту
// Напишите функцию isEmpty(obj), которая возвращает true, если у объекта нет свойств, иначе false.
//
//   Должно работать так:
//   let schedule = {};
//
// alert( isEmpty(schedule) ); // true
//
// schedule["8:30"] = "get up";
//
// alert( isEmpty(schedule) ); // false

const isEmpty = (obj) => {
  for (const objKey in obj) {
    return false;
  }
  return true;
};

let schedule = {};
console.log(isEmpty(schedule));
schedule["8:30"] = "get up";
console.log(isEmpty(schedule));