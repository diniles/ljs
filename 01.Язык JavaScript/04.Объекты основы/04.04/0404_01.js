// Создайте калькулятор
// Создайте объект calculator (калькулятор) с тремя методами:
//
// read() (читать) запрашивает два значения и сохраняет их как свойства объекта.
// sum() (суммировать) возвращает сумму сохранённых значений.
// mul() (умножить) перемножает сохранённые значения и возвращает результат.
//
//   let calculator = {
//   // ... ваш код ...
// };
//
// calculator.read();
// alert( calculator.sum() );
// alert( calculator.mul() );

const calculator = {
  read() {
    this.a = +prompt('Enter first number', 2);
    this.b = +prompt('Enter second number', 3);
  },
  sum() {
    return (`Sum of ${this.a} and ${this.b} is ${this.a + this.b}`);
  },
  mul() {
    return (`Mul of ${this.a} and ${this.b} is ${this.a * this.b}`);
  },
};

calculator.read();
alert(calculator.sum());
alert(calculator.mul());