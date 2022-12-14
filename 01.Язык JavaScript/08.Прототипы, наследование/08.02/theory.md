# F.prototype

#### [F.prototype](https://learn.javascript.ru/function-prototype)

Как мы помним, новые объекты могут быть созданы с помощью функции-конструктора `new
F()`.

Если в `F.prototype` содержится объект, оператор new устанавливает его в качестве `[[Prototype]]` для нового объекта.

Обратите внимание, что `F.prototype` означает обычное свойство с именем `prototype` для `F`. Это ещё не «прототип
объекта», а обычное свойство `F` с таким именем.

Приведём пример:

    let animal = {
        eats: true
    };
    
    function Rabbit(name) {
        this.name = name;
    }
    
    Rabbit.prototype = animal;
    
    let rabbit = new Rabbit("White Rabbit"); // rabbit.__proto__ == animal
    
    alert( rabbit.eats ); // true

Установка `Rabbit.prototype = animal` буквально говорит интерпретатору следующее: "При создании объекта
через `new Rabbit()` запиши ему animal в `[[Prototype]]`".

**F.prototype используется только в момент вызова new F()**

### F.prototype по умолчанию, свойство constructor

У каждой функции по умолчанию уже есть свойство `prototype`.

По умолчанию `prototype` – объект с единственным свойством `constructor`, которое ссылается на функцию-конструктор.

Вот такой:

    function Rabbit() {}
    
    /* прототип по умолчанию
    Rabbit.prototype = { constructor: Rabbit };
    */

Мы можем использовать свойство `constructor` существующего объекта для создания нового.

Пример:

    function Rabbit(name) {
        this.name = name;
        alert(name);
    }
    
    let rabbit = new Rabbit("White Rabbit");
    
    let rabbit2 = new rabbit.constructor("Black Rabbit");

Это удобно, когда у нас есть объект, но мы не знаем, какой конструктор использовался для его создания (например, он мог
быть взят из сторонней библиотеки), а нам необходимо создать ещё один такой объект.

Но, пожалуй, самое важное о свойстве "constructor" это то, что…

**…JavaScript сам по себе не гарантирует правильное значение свойства `constructor`**.

Да, оно является свойством по умолчанию в `prototype` у функций, но что случится с ним позже – зависит только от нас.

В частности, если мы заменим прототип по умолчанию на другой объект, то свойства `constructor` в нём не будет.

Например:

    function Rabbit() {}
        Rabbit.prototype = {
        jumps: true
    };
    
    let rabbit = new Rabbit();
    alert(rabbit.constructor === Rabbit); // false

Таким образом, чтобы сохранить верное свойство `constructor`, мы должны добавлять/удалять/изменять свойства у прототипа
по умолчанию вместо того, чтобы перезаписывать его целиком:

    function Rabbit() {}
    
    // Не перезаписываем Rabbit.prototype полностью,
    // а добавляем к нему свойство
    Rabbit.prototype.jumps = true
    // Прототип по умолчанию сохраняется, и мы всё ещё имеем доступ к Rabbit.prototype.constructor

Или мы можем заново создать свойство `constructor`:

    Rabbit.prototype = {
        jumps: true,
        constructor: Rabbit
    };
    
    // теперь свойство constructor снова корректное, так как мы добавили его

### Итого

В этой главе мы кратко описали способ задания `[[Prototype]]` для объектов, создаваемых с помощью функции-конструктора.
Позже мы рассмотрим, как можно использовать эту возможность.

Всё достаточно просто. Выделим основные моменты:

- Свойство `F.prototype` (не путать с `[[Prototype]]`) устанавливает`[[Prototype]]` для новых объектов при
  вызове `new F()`.
- Значение `F.prototype` должно быть либо объектом, либо `null`. Другие значения не будут работать.
- Свойство `prototype` является особым, только когда оно назначено функции-конструктору, которая вызывается
  оператором `new`.

В обычных объектах `prototype` не является чем-то особенным:

    let user = {
        name: "John",
        prototype: "Bla-bla" // никакой магии нет - обычное свойство
    };

По умолчанию все функции имеют `F.prototype = { constructor: F }`, поэтому мы можем получить конструктор объекта через
свойство `constructor`.