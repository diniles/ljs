'use strict';
// Вывод односвязного списка
// Допустим, у нас есть односвязный список (как описано в главе Рекурсия и стек):
//
// let list = {
//   value: 1,
//   next: {
//     value: 2,
//     next: {
//       value: 3,
//       next: {
//         value: 4,
//         next: null
//       }
//     }
//   }
// };
// Напишите функцию printList(list), которая выводит элементы списка по одному.
//
// Сделайте два варианта решения: используя цикл и через рекурсию.
//
// Как лучше: с рекурсией или без?

let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

function printListCircle(list) {
  let tmp = list;

  while (tmp) {
    console.log(tmp.value);
    tmp = tmp.next;
  }
}

function printListRecursion(list) {
  while (list) {
    console.log(list.value);
    list = list.next;
  }
}

printListCircle(list);
printListRecursion(list);