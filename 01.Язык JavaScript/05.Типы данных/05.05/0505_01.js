'use strict';
// Переведите текст вида border-left-width в borderLeftWidth
// Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».
//
// То есть дефисы удаляются, а все слова после них получают заглавную букву.
//
//   Примеры:
//
// camelize("background-color") == 'backgroundColor';
// camelize("list-style-image") == 'listStyleImage';
// camelize("-webkit-transition") == 'WebkitTransition';
// P.S. Подсказка: используйте split, чтобы разбить строку на массив символов, потом переделайте всё как нужно и
// методом join соедините обратно.

function camelize(str) {
  let strArray = str.split('');
  for (let i = 0; i < strArray.length; i++) {
    if (strArray[i] === '-') {
      strArray[i + 1] = strArray[i + 1].toUpperCase();
      strArray.splice(i, 1);
    }
  }
  return strArray.join('');
}

console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
console.log(camelize("-webkit-transition"));