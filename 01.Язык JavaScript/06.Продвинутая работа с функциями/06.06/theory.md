# Объект функции, NFE

#### [Объект функции, NFE](https://learn.javascript.ru/function-object)

В JavaScript функции – это объекты.

### Свойство «name»

Например, имя функции нам доступно как свойство «name»:

      function sayHi() {
         alert("Hi");
      }
      
      alert(sayHi.name); // sayHi

Что довольно забавно, логика назначения `name` весьма умная. Она присваивает корректное имя даже в случае, когда функция
создаётся без имени и тут же присваивается, вот так:

      let sayHi = function() {
         alert("Hi");
      };
      
      alert(sayHi.name); // sayHi (есть имя!)

Это работает даже в случае присваивания значения по умолчанию:

      function f(sayHi = function() {}) {
         alert(sayHi.name); // sayHi (работает!)
      }
      
      f();

Также имена имеют и методы объекта:

      let user = {
      
         sayHi() {
         // ...
         },
         
         sayBye: function() {
         // ...
         }
      
      }
      
      alert(user.sayHi.name); // sayHi
      alert(user.sayBye.name); // sayBye

### Свойство «length»

Ещё одно встроенное свойство «length» содержит количество параметров функции в её объявлении. Например:

      function f1(a) {}
      function f2(a, b) {}
      function many(a, b, ...more) {}
      
      alert(f1.length); // 1
      alert(f2.length); // 2
      alert(many.length); // 2

Как мы видим, троеточие, обозначающее «остаточные параметры», здесь как бы «не считается»

Свойство `length` иногда используется
для [интроспекций](https://ru.wikipedia.org/wiki/%D0%98%D0%BD%D1%82%D1%80%D0%BE%D1%81%D0%BF%D0%B5%D0%BA%D1%86%D0%B8%D1%8F_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5))
в функциях, которые работают с другими функциями.

Например, в коде ниже функция `ask` принимает в качестве параметров вопрос `question` и произвольное количество
функций-обработчиков ответа `handler`.

Когда пользователь отвечает на вопрос, функция вызывает обработчики. Мы можем передать два типа обработчиков:

- Функцию без аргументов, которая будет вызываться только в случае положительного ответа.
- Функцию с аргументами, которая будет вызываться в обоих случаях и возвращать ответ.
  Чтобы вызвать обработчик `handler` правильно, будем проверять свойство `handler.length`.

Идея состоит в том, чтобы иметь простой синтаксис обработчика без аргументов для положительных ответов (наиболее
распространённый случай), но также и возможность передавать универсальные обработчики:

      function ask(question, ...handlers) {
         let isYes = confirm(question);
         
         for(let handler of handlers) {
            if (handler.length == 0) {
               if (isYes) handler();
                  } else {
               handler(isYes);
            }
         }
         
      }
      
      // для положительных ответов вызываются оба типа обработчиков
      // для отрицательных - только второго типа
      ask("Вопрос?", () => alert('Вы ответили да'), result => alert(result));

### Пользовательские свойства

Мы также можем добавить свои собственные свойства.

Давайте добавим свойство `counter` для отслеживания общего количества вызовов:

      function sayHi() {
         alert("Hi");
      
      // давайте посчитаем, сколько вызовов мы сделали
         sayHi.counter++;
      }
      sayHi.counter = 0; // начальное значение
      
      sayHi(); // Hi
      sayHi(); // Hi
      
      alert( `Вызвана ${sayHi.counter} раза` ); // Вызвана 2 раза

**Свойство не есть переменная**

Свойство функции, назначенное как `sayHi.counter = 0`, не объявляет локальную переменную `counter` внутри неё. Другими
словами, свойство `counter` и переменная `let counter` – это две независимые вещи.

Иногда свойства функции могут использоваться вместо замыканий. Например, мы можем переписать функцию-счётчик из
главы [Замыкание](https://learn.javascript.ru/closure), используя её свойство:

      function makeCounter() {
         // вместо
         // let count = 0
         
         function counter() {
            return counter.count++;
         };
         
         counter.count = 0;
         
         return counter;
      }
      
      let counter = makeCounter();
      alert( counter() ); // 0
      alert( counter() ); // 1

Свойство `count` теперь хранится прямо в функции, а не в её внешнем лексическом окружении.

Основное отличие в том, что если значение `count` живёт во внешней переменной, то оно не доступно для внешнего кода.
Изменить его могут только вложенные функции.

### Named Function Expression

Named Function Expression или NFE – это термин для Function Expression, у которого есть имя.

Например, давайте объявим Function Expression:

      let sayHi = function(who) {
         alert(`Hello, ${who}`);
      };

И присвоим ему имя:

      let sayHi = function func(who) {
         alert(`Hello, ${who}`);
      };

Чего мы здесь достигли? Какова цель этого дополнительного имени `func`?

Для начала заметим, что функция всё ещё задана как Function Expression. Добавление "`func`" после `function` не
превращает объявление в Function Declaration, потому что оно все ещё является частью выражения присваивания.

Добавление такого имени ничего не ломает.

Функция все ещё доступна как `sayHi()`:

      let sayHi = function func(who) {
         alert(`Hello, ${who}`);
      };
      
      sayHi("John"); // Hello, John

Есть две важные особенности имени `func`, ради которого оно даётся:

1. Оно позволяет функции ссылаться на себя же.
2. Оно не доступно за пределами функции.

      let sayHi = function func(who) {
         if (who) {
            alert(`Hello, ${who}`);
         } else {
            func("Guest"); // Теперь всё в порядке
         }
      };
   
      let welcome = sayHi;
      sayHi = null;
   
      welcome(); // Hello, Guest (вложенный вызов работает)

