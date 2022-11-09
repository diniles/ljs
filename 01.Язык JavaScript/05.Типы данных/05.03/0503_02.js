'use strict';
// Проверка на спам
// Напишите функцию checkSpam(str), возвращающую true, если str содержит 'viagra' или 'XXX', а иначе false.
//
// Функция должна быть нечувствительна к регистру:
//
// checkSpam('buy ViAgRA now') == true
// checkSpam('free xxxxx') == true
// checkSpam("innocent rabbit") == false

function checkSpam(str) {
  let st = str.toLowerCase();
  return st.includes('viagra'.toLowerCase()) || st.includes('XXX'.toLowerCase());
}

console.log(checkSpam('buy ViAgRA now'));
console.log(checkSpam('free xxxxx'));
console.log(checkSpam("innocent rabbit"));