# Методы прототипов, объекты без свойства __proto__

#### [Методы прототипов, объекты без свойства __proto__](https://learn.javascript.ru/prototype-methods)

В первой главе этого раздела мы упоминали, что существуют современные методы работы с прототипами.

Свойство `__proto__` считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.

Современные же методы это:

- [Object.create(proto, [descriptors])](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
  – создаёт пустой объект со свойством `[[Prototype]]`, указанным как `proto`, и необязательными дескрипторами
  свойств `descriptors`.
- [Object.getPrototypeOf(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
  – возвращает свойство `[[Prototype]]` объекта `obj`.
- [Object.setPrototypeOf(obj, proto)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)
  – устанавливает свойство `[[Prototype]]` объекта `obj` как `proto`.

Эти методы нужно использовать вместо `__proto__`.

Например:

    let animal = {
    eats: true
    };
    
    // создаём новый объект с прототипом animal
    let rabbit = Object.create(animal);
    
    alert(rabbit.eats); // true
    
    alert(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit
    
    Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}

У `Object.create` есть необязательный второй аргумент: дескрипторы свойств. Мы можем добавить дополнительное свойство
новому объекту таким образом:

    let animal = {
    eats: true
    };
    
    let rabbit = Object.create(animal, {
    jumps: {
    value: true
    }
    });
    
    alert(rabbit.jumps); // true

Формат задания дескрипторов описан в
главе [Флаги и дескрипторы свойств](https://learn.javascript.ru/property-descriptors).

Мы также можем использовать `Object.create` для «продвинутого» клонирования объекта, более мощного, чем копирование
свойств в цикле `for..in`:

    // клон obj c тем же прототипом (с поверхностным копированием свойств)
    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));

Такой вызов создаёт точную копию объекта `obj`, включая все свойства: перечисляемые и неперечисляемые, геттеры/сеттеры
для свойств – и всё это с правильным свойством `[[Prototype]]`.

**Не меняйте [[Prototype]] существующих объектов, если важна скорость**

Встроенный геттер/сеттер `__proto__` не безопасен, если мы хотим использовать созданные пользователями ключи в объекте.
Как минимум потому, что пользователь может ввести "`__proto__`" как ключ, от чего может возникнуть ошибка. Если повезёт
– последствия будут лёгкими, но, вообще говоря, они непредсказуемы.

Так что мы можем использовать либо `Object.create(null)` для создания «простейшего» объекта, либо использовать
коллекцию `Map`.

Ещё методы:

- [Object.keys(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
  / [Object.values(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/values)
  / [Object.entries(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)
  – возвращают массив всех перечисляемых собственных строковых ключей/значений/пар ключ-значение.
- [Object.getOwnPropertySymbols(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
  – возвращает массив всех собственных символьных ключей.
- [Object.getOwnPropertyNames(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames)
  – возвращает массив всех собственных строковых ключей.
- [Reflect.ownKeys(obj)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys)
  – возвращает массив всех собственных ключей.
- [obj.hasOwnProperty(key)](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty):
  возвращает `true`, если у `obj` есть собственное (не унаследованное) свойство с именем `key`.

Все методы, которые возвращают свойства объектов (такие как `Object.keys` и другие), возвращают «собственные» свойства.
Если мы хотим получить и унаследованные, можно воспользоваться циклом `for..in`.