# Пользовательские ошибки, расширение Error

#### [Пользовательские ошибки, расширение Error](https://learn.javascript.ru/custom-errors)

Когда что-то разрабатываем, то нам часто необходимы собственные классы ошибок для разных вещей, которые могут пойти не
так в наших задачах.

Наши ошибки должны поддерживать базовые свойства, такие как `message`, `name` и, желательно, `stack`. Но также они могут
иметь свои собственные свойства. Например, объекты `HttpError` могут иметь свойство `statusCode` со значениями `404`
, `403` или `500`.

JavaScript позволяет вызывать `throw` с любыми аргументами, то есть технически наши классы ошибок не нуждаются в
наследовании от `Error`. Но если использовать наследование, то появляется возможность идентификации объектов ошибок
посредством `obj instanceof Error`. Так что лучше применять наследование.

По мере роста приложения, наши собственные ошибки образуют иерархию, например, `HttpTimeoutError` может наследовать
от `HttpError` и так далее.

### Расширение Error

В качестве примера рассмотрим функцию `readUser(json)`, которая должна читать данные пользователя в формате JSON.

Пример того, как может выглядеть корректный `json`:

    let json = `{ "name": "John", "age": 30 }`;

    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }
    
    // Использование
    function readUser(json) {
        let user = JSON.parse(json);
        
        if (!user.age) {
            throw new ValidationError("Нет поля: age");
        }
        if (!user.name) {
            throw new ValidationError("Нет поля: name");
        }
        
        return user;
        }
        
        // Рабочий пример с try..catch
        
        try {
            let user = readUser('{ "age": 25 }');
        } catch (err) {
            if (err instanceof ValidationError) {
                alert("Некорректные данные: " + err.message); // Некорректные данные: Нет поля: name
        } else if (err instanceof SyntaxError) { // (*)
            alert("JSON Ошибка Синтаксиса: " + err.message);
        } else {
            throw err; // неизвестная ошибка, пробросить исключение (**)
        }
    }

Блок `try..catch` в коде выше обрабатывает и нашу `ValidationError`, и встроенную `SyntaxError` из `JSON.pars`e.

Обратите внимание, как мы используем `instanceof` для проверки конкретного типа ошибки в строке `(*)`.

Мы можем также проверить тип, используя `err.name`:

    // ...
    // вместо (err instanceof SyntaxError)
    } else if (err.name == "SyntaxError") { // (*)
    // ...

Версия с `instanceof` гораздо лучше, потому что в будущем мы собираемся расширить `ValidationError`, сделав его подтипы,
такие как `PropertyRequiredError`. И проверка `instanceof` продолжит работать для новых наследованных классов. Так что
это на будущее.

### Дальнейшее наследование

Класс `ValidationError` является слишком общим. Много что может пойти не так. Свойство может отсутствовать или иметь
неверный формат (например, строка как значение возраста `age`). Поэтому для отсутствующих свойств сделаем более
конкретный класс `PropertyRequiredError`. Он будет нести дополнительную информацию о свойстве, которое отсутствует.

    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }
    
    class PropertyRequiredError extends ValidationError {
        constructor(property) {
            super("Нет свойства: " + property);
            this.name = "PropertyRequiredError";
            this.property = property;
        }
    }
    
    // Применение
    function readUser(json) {
    let user = JSON.parse(json);
    
    if (!user.age) {
        throw new PropertyRequiredError("age");
    }
    if (!user.name) {
        throw new PropertyRequiredError("name");
    }
    
    return user;
    }
    
    // Рабочий пример с try..catch
    
    try {
        let user = readUser('{ "age": 25 }');
        } catch (err) {
        if (err instanceof ValidationError) {
            alert("Неверные данные: " + err.message); // Неверные данные: Нет свойства: name
            alert(err.name); // PropertyRequiredError
            alert(err.property); // name
        } else if (err instanceof SyntaxError) {
            alert("Ошибка синтаксиса JSON: " + err.message);
        } else {
            throw err; // неизвестная ошибка, повторно выбросит исключение
        }
    }

Новый класс `PropertyRequiredError` очень просто использовать: необходимо указать только имя
свойства `new PropertyRequiredError(property)`. Сообщение для пользователя `message` генерируется конструктором.

Обратите внимание, что свойство `this.name` в конструкторе `PropertyRequiredError` снова присвоено вручную. Правда,
немного утомительно – присваивать `this.name = <class name>` в каждом классе пользовательской ошибки. Можно этого
избежать, если сделать наш собственный «базовый» класс ошибки, который будет ставить `this.name = this.constructor.name`
. И затем наследовать все ошибки уже от него.

Давайте назовём его `MyError`.

Вот упрощённый код с `MyError` и другими пользовательскими классами ошибок:

    class MyError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
        }
    }
    
    class ValidationError extends MyError { }
    
    class PropertyRequiredError extends ValidationError {
        constructor(property) {
            super("Нет свойства: " + property);
            this.property = property;
        }
    }
    
    // name корректное
    alert( new PropertyRequiredError("field").name ); // PropertyRequiredError

Теперь пользовательские ошибки стали намного короче, особенно `ValidationError`, так как мы избавились от
строки "`this.name = ...`" в конструкторе.

### Обёртывание исключений

Если ошибка возникает внутри `readUser`, мы её перехватим и сгенерируем `ReadError`. Мы также сохраним ссылку на
исходную ошибку в свойстве `cause`. Тогда внешний код должен будет только проверить наличие `ReadError`.

Этот код определяет ошибку `ReadError` и демонстрирует её использование в `readUser` и `try..catch`:

    class ReadError extends Error {
        constructor(message, cause) {
            super(message);
            this.cause = cause;
            this.name = 'ReadError';
        }
    }
    
    class ValidationError extends Error { /*...*/ }
    class PropertyRequiredError extends ValidationError { /* ... */ }
    
    function validateUser(user) {
        if (!user.age) {
            throw new PropertyRequiredError("age");
    }
    
    if (!user.name) {
        throw new PropertyRequiredError("name");
        }
    }
    
    function readUser(json) {
    let user;
    
    try {
        user = JSON.parse(json);
        } catch (err) {
        if (err instanceof SyntaxError) {
            throw new ReadError("Синтаксическая ошибка", err);
        } else {
            throw err;
        }
    }
    
    try {
        validateUser(user);
        } catch (err) {
        if (err instanceof ValidationError) {
            throw new ReadError("Ошибка валидации", err);
        } else {
            throw err;
        }
    }
    
    }
    
    try {
        readUser('{bad json}');
        } catch (e) {
            if (e instanceof ReadError) {
            alert(e);
        // Исходная ошибка: SyntaxError:Unexpected token b in JSON at position 1
            alert("Исходная ошибка: " + e.cause);
        } else {
            throw e;
        }
    }

В приведённом выше коде `readUser` работает так, как описано – функция распознаёт синтаксические ошибки и ошибки
валидации и выдаёт вместо них ошибки `ReadError` (неизвестные ошибки, как обычно, пробрасываются).

Внешний код проверяет только `instanceof ReadError`. Не нужно перечислять все возможные типы ошибок

Этот подход называется «обёртывание исключений», потому что мы берём «исключения низкого уровня» и «оборачиваем» их
в `ReadError`, который является более абстрактным и более удобным для использования в вызывающем коде. Такой подход
широко используется в объектно-ориентированном программировании.

