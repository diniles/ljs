'use strict';
// Сколько секунд осталось до завтра?
// Создайте функцию getSecondsToTomorrow(), возвращающую количество секунд до завтрашней даты.
//
// Например, если сейчас 23:00, то:
//
// getSecondsToTomorrow() == 3600
// P.S. Функция должна работать в любой день, т.е. в ней не должно быть конкретного значения сегодняшней даты.


// My solution
function getSecondsToTomorrow() {
  let now = new Date();
  let todayNight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
  return Math.round((todayNight - now) / 1000);
}

// Correct solution
function getSecondsToTomorrowBest() {
  let now = new Date();

  // завтрашняя дата
  let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

  let diff = tomorrow - now; // разница в миллисекундах
  return Math.round(diff / 1000); // преобразуем в секунды
}

console.log(getSecondsToTomorrow());
console.log(getSecondsToTomorrowBest());