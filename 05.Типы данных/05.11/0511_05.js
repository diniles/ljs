'use strict';
// Последнее число месяца?
// Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца. Иногда это 30, 31
// или даже февральские 28/29.
//
// Параметры:
//
// year – год из четырёх цифр, например, 2012.
// month – месяц от 0 до 11.
// К примеру, getLastDayOfMonth(2012, 1) = 29 (високосный год, февраль).

function getLastDayOfMonth(year, month) {
  switch (month) {
    case 1:
      return leap(year) ? 29 : 28;
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    default:
      return 30;
  }

  function leap(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
  }
}

console.log(getLastDayOfMonth(2012, 1));
console.log(getLastDayOfMonth(2011, 1));
console.log(getLastDayOfMonth(2012, 0));
console.log(getLastDayOfMonth(2012, 3));