'use strict';
// Форматирование относительной даты
// Напишите функцию formatDate(date), форматирующую date по следующему принципу:
//
// Если спустя date прошло менее 1 секунды, вывести "прямо сейчас".
// В противном случае, если с date прошло меньше 1 минуты, вывести "n сек. назад".
// В противном случае, если меньше часа, вывести "m мин. назад".
// В противном случае, полная дата в формате "DD.MM.YY HH:mm". А именно: "день.месяц.год часы:минуты",
// всё в виде двух цифр, т.е. 31.12.16 10:00.
// Например:
//
// alert( formatDate(new Date(new Date - 1)) ); // "прямо сейчас"
//
// alert( formatDate(new Date(new Date - 30 * 1000)) ); // "30 сек. назад"
//
// alert( formatDate(new Date(new Date - 5 * 60 * 1000)) ); // "5 мин. назад"
//
// // вчерашняя дата вроде 31.12.2016, 20:00
// alert( formatDate(new Date(new Date - 86400 * 1000)) );

function formatDate(date) {
  let diff = Date.now() - date;
  if (diff < 1000) {
    return 'прямо сейчас';
  } else if (diff < 1000 * 60) {
    return `${diff / 1000} сек. назад`;
  } else if (diff < 1000 * 60 * 60) {
    return `${diff / (1000 * 60)} мин. назад`;
  } else {
    return diff;
  }

}

console.log((formatDate(new Date(new Date - 1)))); // "прямо сейчас"

console.log((formatDate(new Date(new Date - 30 * 1000)))); // "30 сек. назад"

console.log((formatDate(new Date(new Date - 5 * 60 * 1000)))); // "5 мин. назад"

console.log((formatDate(new Date(new Date - 86400 * 1000))));