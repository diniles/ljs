// Создание калькулятора при помощи конструктора
//
// Создайте функцию-конструктор Calculator, который создаёт объекты с тремя методами:
//
// read() запрашивает два значения при помощи prompt и сохраняет их значение в свойствах объекта.
// sum() возвращает сумму введённых свойств.
// mul() возвращает произведение введённых свойств.
//
//   Например:
//
// let calculator = new Calculator();
// calculator.read();
//
// alert( "Sum=" + calculator.sum() );
// alert( "Mul=" + calculator.mul() );

function Calculator() {
  this.read = function () {
    this.a = +prompt('Enter first number', 2);
    this.b = +prompt('Enter second number', 3);
  };
  this.sum = function () {
    return (this.a + this.b);
  };
  this.mul = function () {
    return (this.a * this.b);
  };
}

let calculator = new Calculator();
calculator.read();

alert("Sum=" + calculator.sum());
alert("Mul=" + calculator.mul());