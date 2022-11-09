'use script';
// Сколько сегодня прошло секунд?
// Напишите функцию getSecondsToday(), возвращающую количество секунд с начала сегодняшнего дня.
//
// Например, если сейчас 10:00, и не было перехода на зимнее/летнее время, то:
//
// getSecondsToday() == 36000 // (3600 * 10)
// Функция должна работать в любой день, т.е. в ней не должно быть конкретного значения сегодняшней даты.

// My solution
function getSecondsToday() {
  let currTime = Date.now();
  let currYear = new Date().getFullYear();
  console.log(currYear);
  let currMonth = new Date().getMonth();
  console.log(currMonth);
  let currDate = new Date().getDate();
  console.log(currDate);
  let zeroTime = new Date(currYear, currMonth, currDate, 0, 0, 0, 0);
  console.log(zeroTime);
  return (currTime - zeroTime) / 1000;

}

// Best solution
function getSecondsTodayGood() {
  let now = new Date();

  // создаём объект с текущими днём/месяцем/годом
  let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let diff = now - today; // разница в миллисекундах
  return Math.round(diff / 1000); // получаем секунды
}

console.log(getSecondsToday());
console.log(getSecondsTodayGood());