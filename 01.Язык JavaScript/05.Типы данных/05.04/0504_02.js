'use strict';
// Сумма введённых чисел
// Напишите функцию sumInput(), которая:
//
// Просит пользователя ввести значения, используя prompt и сохраняет их в массив.
// Заканчивает запрашивать значения, когда пользователь введёт не числовое значение, пустую строку или нажмёт «Отмена».
// Подсчитывает и возвращает сумму элементов массива.
// P.S. Ноль 0 – считается числом, не останавливайте ввод значений при вводе «0».

function sumInput() {
  let numbers = [];
  while (true) {
    let num = prompt("Enter a number", 0);
    if (num === "" || num === null || !isFinite(num)) break;
    numbers.push(+num);
  }
  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum;
}

alert(sumInput());