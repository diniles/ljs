# Формат JSON, метод toJSON

#### [Формат JSON, метод toJSON](https://learn.javascript.ru/json)

JavaScript предоставляет методы:

- JSON.stringify для преобразования объектов в JSON.
- JSON.parse для преобразования JSON обратно в объект.

### JSON.stringify

    let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
    };

    let json = JSON.stringify(student);

    alert(typeof json); // мы получили строку!

    alert(json);
    /* выведет объект в формате JSON:
    {
    "name": "John",
    "age": 30,
    "isAdmin": false,
    "courses": ["html", "css", "js"],
    "wife": null
    }

Метод `JSON.stringify(student)` берёт объект и преобразует его в строку.

Полученная строка `json` называется JSON-форматированным или сериализованным объектом. Мы можем отправить его по сети или поместить в обычное хранилище данных.

Обратите внимание, что объект в формате JSON имеет несколько важных отличий от объектного литерала:

- Строки используют двойные кавычки. Никаких одинарных кавычек или обратных кавычек в JSON. Так `'John'` становится `"John"`.
- Имена свойств объекта также заключаются в двойные кавычки. Это обязательно. Так `age:30` становится `"age":30`.

`JSON.stringify` может быть применён и к примитивам.

JSON поддерживает следующие типы данных:

- Объекты { ... }
- Массивы [ ... ]
- Примитивы:
- строки,
- числа,
- логические значения true/false,
- null.

JSON является независимой от языка спецификацией для данных, поэтому `JSON.stringify` пропускает некоторые специфические свойства объектов JavaScript.
А именно:

- Свойства-функции (методы).
- Символьные ключи и значения.
- Свойства, содержащие `undefined`.

Самое замечательное, что вложенные объекты поддерживаются и конвертируются автоматически.

### Исключаем и преобразуем: replacer

Полный синтаксис JSON.stringify:

    let json = JSON.stringify(value, [replacer, space])
**value**

Значение для кодирования.

**replacer**

Массив свойств для кодирования или функция соответствия `function(key, value)`.

**space**

Дополнительное пространство (отступы), используемое для форматирования.

    let room = {
    number: 23
    };

    let meetup = {
        title: "Conference",
        participants: [{name: "John"}, {name: "Alice"}],
        place: room // meetup ссылается на room
    };

    room.occupiedBy = meetup; // room ссылается на meetup

    alert( JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
    }));

    /* пары ключ:значение, которые приходят в replacer:
    :             [object Object]
    title:        Conference
    participants: [object Object],[object Object]
    0:            [object Object]
    name:         John
    1:            [object Object]
    name:         Alice
    place:        [object Object]
    number:       23
    occupiedBy: [object Object]
    */

Обратите внимание, что функция `replacer` получает каждую пару ключ/значение, включая вложенные объекты и элементы массива. И она применяется рекурсивно. Значение `this` внутри `replacer` – это объект, который содержит текущее свойство.

Первый вызов – особенный. Ему передаётся специальный «объект-обёртка»: `{"": meetup}`. Другими словами, первая `(key, value)` пара имеет пустой ключ, а значением является целевой объект в общем. Вот почему первая строка из примера выше будет `":[object Object]"`.

Идея состоит в том, чтобы дать как можно больше возможностей `replacer` – у него есть возможность проанализировать и заменить/пропустить даже весь объект целиком, если это необходимо.

### Форматирование: space

Третий аргумент в `JSON.stringify(value, replacer, space)` – это количество пробелов, используемых для удобного форматирования.

Ранее все JSON-форматированные объекты не имели отступов и лишних пробелов. Это нормально, если мы хотим отправить объект по сети. Аргумент `space` используется исключительно для вывода в удобочитаемом виде.

Третьим аргументом также может быть строка. В этом случае строка будет использоваться для отступа вместо ряда пробелов.

Параметр `space` применяется исключительно для логирования и красивого вывода.

### Пользовательский «toJSON»

Как и `toString` для преобразования строк, объект может предоставлять метод `toJSON` для преобразования в `JSON. JSON.stringify` автоматически вызывает его, если он есть.

Например:

    let room = {
    number: 23
    };

    let meetup = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
    };

    alert( JSON.stringify(meetup) );
    /*
    {
        "title":"Conference",
        "date":"2017-01-01T00:00:00.000Z",  // (1)
        "room": {"number":23}               // (2)
    }
    */

Как видим, `date (1)` стал строкой. Это потому, что все объекты типа `Date` имеют встроенный метод `toJSON`, который возвращает такую строку.

Теперь давайте добавим собственную реализацию метода `toJSON` в наш объект `room (2)`:

    let room = {
    number: 23,
    toJSON() {
        return this.number;
    }
    };

    let meetup = {
        title: "Conference",
        room
    };

    alert( JSON.stringify(room) ); // 23

    alert( JSON.stringify(meetup) );
    /*
    {
        "title":"Conference",
        "room": 23
    }
    */

### JSON.parse

Чтобы декодировать JSON-строку, нам нужен другой метод с именем `JSON.parse`.

Синтаксис:

    let value = JSON.parse(str, [reviver]);

**str**

JSON для преобразования в объект.

**reviver**

Необязательная функция, которая будет вызываться для каждой пары (ключ, значение) и может преобразовывать значение.

    // строковый массив
    let numbers = "[0, 1, 2, 3]";

    numbers = JSON.parse(numbers);

    alert( numbers[1] ); // 1

Или для вложенных объектов:

    let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

    user = JSON.parse(user);

    alert( user.friends[1] ); // 1

### Использование reviver

    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

    let meetup = JSON.parse(str);

    alert( meetup.date.getDate() ); // Ошибка!

Ой, ошибка!

Значением `meetup.date` является строка, а не `Date` объект. Как `JSON.parse` мог знать, что он должен был преобразовать эту строку в `Date`?

Давайте передадим `JSON.parse` функцию восстановления вторым аргументом, которая возвращает все значения «как есть», но `date` станет `Date`:

    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

    let meetup = JSON.parse(str, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
    });

    alert( meetup.date.getDate() ); // 30 - теперь работает!

Кстати, это работает и для вложенных объектов:

    let schedule = `{
    "meetups": [
        {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
        {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
    ]
    }`;

    schedule = JSON.parse(schedule, function(key, value) {
        if (key == 'date') return new Date(value);
            return value;
    });

    alert( schedule.meetups[1].date.getDate() ); // 18 - отлично!

