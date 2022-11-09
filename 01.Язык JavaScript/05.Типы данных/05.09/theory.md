# Object.keys, values, entries

#### [Object.keys, values, entries](https://learn.javascript.ru/keys-values-entries)

### Object.keys, values, entries

Для простых объектов доступны следующие методы:

- `Object.keys(obj)` – возвращает массив ключей.
- `Object.values(obj)` – возвращает массив значений.
- `Object.entries(obj)` – возвращает массив пар `[ключ, значение]`.

Первое отличие в том, что мы должны вызвать `Object.keys(obj)`, а не `obj.keys()`.

Почему так? Основная причина – гибкость. Помните, что объекты являются основой всех сложных структур в JavaScript. У нас
может быть объект `data`, который реализует свой собственный метод `data.values()`. И мы всё ещё можем применять к нему
стандартный метод `Object.values(data)`.

Второе отличие в том, что методы вида `Object.*` возвращают «реальные» массивы, а не просто итерируемые объекты. Это в
основном по историческим причинам.

**Object.keys/values/entries игнорируют символьные свойства**

### Трансформации объекта

У объектов нет множества методов, которые есть в массивах, например `map`, `filter` и других.

Если мы хотели бы их применить, то можно использовать `Object.entries` с последующим вызовом `Object.fromEntries`:

1. Вызов `Object.entries(obj)` возвращает массив пар `ключ/значение` для `obj`.
2. На нём вызываем методы массива, например, `map`.
3. Используем `Object.fromEntries(array)` на результате, чтобы преобразовать его обратно в объект.

Например, у нас есть объект с ценами, и мы хотели бы их удвоить:

    let prices = {
        banana: 1,
        orange: 2,
        meat: 4,
    };
    
    let doublePrices = Object.fromEntries(
        // преобразовать в массив, затем map, затем fromEntries обратно объект
        Object.entries(prices).map(([key, value]) => [key, value * 2])
    );
    
    alert(doublePrices.meat); // 8

