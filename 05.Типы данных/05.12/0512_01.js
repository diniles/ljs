'use strict';
// Преобразуйте объект в JSON, а затем обратно в обычный объект
// Преобразуйте user в JSON, затем прочитайте этот JSON в другую переменную.

// let user = {
//   name: "Василий Иванович",
//   age: 35
// };

let user = {
  name: "Василий Иванович", age: 35
};
console.log(user);

const userJson = JSON.stringify(user);
console.log(userJson);

const userFromJson = JSON.parse(userJson);
console.log(userFromJson);