'use strict';
// Покажите день недели
// Напишите функцию getWeekDay(date), показывающую день недели в коротком формате:
// «ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».
//
// Например:
//
//   let date = new Date(2012, 0, 3);  // 3 января 2012 года
// alert( getWeekDay(date) );        // нужно вывести "ВТ"

let date = new Date(2012, 0, 3);

function getWeekDay(date) {
  switch (date.getDay()) {
    case 0:
      return 'Su';
    case  1:
      return 'Mo';
    case  2:
      return 'Tu';
    case  3:
      return 'We';
    case 4:
      return 'Th';
    case 5:
      return 'Fr';
    case 6:
      return 'Sa';
  }
}

console.log(getWeekDay(date));