# Proxy и Reflect

#### [Proxy и Reflect](https://learn.javascript.ru/proxy)

Объект `Proxy` «оборачивается» вокруг другого объекта и может перехватывать (и, при желании, самостоятельно обрабатывать) разные действия с ним, например чтение/запись свойств и другие. Далее мы будем называть такие объекты «прокси».

Прокси используются во многих библиотеках и некоторых браузерных фреймворках. В этой главе мы увидим много случаев применения прокси в решении реальных задач.

Синтаксис:

    let proxy = new Proxy(target, handler);

- `target` – это объект, для которого нужно сделать прокси, может быть чем угодно, включая функции.
- `handler` – конфигурация прокси: объект с «ловушками» («traps»): методами, которые перехватывают разные операции, например, ловушка `get` – для чтения свойства из `target`, ловушка `set` – для записи свойства в `target` и так далее.
  При операциях над `proxy`, если в `handler` имеется соответствующая «ловушка», то она срабатывает, и прокси имеет возможность по-своему обработать её, иначе операция будет совершена над оригинальным объектом `target`.

В качестве начального примера создадим прокси без всяких ловушек:

    let target = {};
    let proxy = new Proxy(target, {}); // пустой handler

    proxy.test = 5; // записываем в прокси (1)
    alert(target.test); // 5, свойство появилось в target!

    alert(proxy.test); // 5, мы также можем прочитать его из прокси (2)

    for(let key in proxy) alert(key); // test, итерация работает (3)

Так как нет ловушек, то все операции на `proxy` применяются к оригинальному объекту target.

1. Запись свойства `proxy.test=` устанавливает значение на `target`.
2. Чтение свойства `proxy.test` возвращает значение из `target`.
3. Итерация по `proxy` возвращает значения из `target`.

Как мы видим, без ловушек proxy является прозрачной обёрткой над `target`.

`Proxy` – это особый, «экзотический», объект, у него нет собственных свойств. С пустым `handler` он просто перенаправляет все операции на `target`.

Чтобы активировать другие его возможности, добавим ловушки.

Для большинства действий с объектами в спецификации JavaScript есть так называемый «внутренний метод», который на самом низком уровне описывает, как его выполнять. Например, `[[Get]]` – внутренний метод для чтения свойства, `[[Set]]` – для записи свойства, и так далее. Эти методы используются только в спецификации, мы не можем обратиться напрямую к ним по имени.

Ловушки как раз перехватывают вызовы этих внутренних методов. Полный список методов, которые можно перехватывать, перечислен в [спецификации Proxy](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots), а также в таблице ниже.

Для каждого внутреннего метода в этой таблице указана ловушка, то есть имя метода, который мы можем добавить в параметр `handler` при создании `new Proxy`, чтобы перехватывать данную операцию:

| Внутренний метод        | Ловушка                    | Что вызывает                                                                                                                                                                                                                                                                                                              |
| ----------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[[Get]]`               | `get`                      | чтение свойства                                                                                                                                                                                                                                                                                                           |
| `[[Set]]`               | `set`                      | запись свойства                                                                                                                                                                                                                                                                                                           |
| `[[HasProperty]]`       | `has`                      | оператор `in`                                                                                                                                                                                                                                                                                                             |
| `[[Delete]]`            | `deleteProperty`           | оператор delete                                                                                                                                                                                                                                                                                                           |
| `[[Call]]`              | `apply`                    | вызов функции                                                                                                                                                                                                                                                                                                             |
| `[[Construct]]`         | `construct`                | оператор `new`                                                                                                                                                                                                                                                                                                            |
| `[[GetPrototypeOf]]`    | `getPrototypeOf`           | [Object.getPrototypeOf](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)                                                                                                                                                                                              |
| `[[SetPrototypeOf]]`    | `setPrototypeOf`           | [Object.setPrototypeOf](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)                                                                                                                                                                                              |
| `[[IsExtensible]]`      | `isExtensible`             | [Object.isExtensible](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible)                                                                                                                                                                                                  |
| `[[PreventExtensions]]` | `preventExtensions`        | [Object.preventExtensions](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions)                                                                                                                                                                                        |
| `[[DefineOwnProperty]]` | `defineProperty`           | [Object.defineProperty](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty), [Object.defineProperties](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)                                                            |
| `[[GetOwnProperty]]`    | `getOwnPropertyDescriptor` | [Object.getOwnPropertyDescriptor](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor), `for..in, Object.keys/values/entries`                                                                                                                                   |
| `[[OwnPropertyKeys]]`   | `ownKeys`                  | [Object.getOwnPropertyNames](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames), [Object.getOwnPropertySymbols](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols), `for..in, Object.keys/values/entries` |

**Инварианты**

JavaScript налагает некоторые условия – инварианты на реализацию внутренних методов и ловушек.

Большинство из них касаются возвращаемых значений:

- Метод `[[Set]]` должен возвращать `true`, если значение было успешно записано, иначе `false`.
- Метод `[[Delete]]` должен возвращать `true`, если значение было успешно удалено, иначе `false`.
- …и так далее, мы увидим больше в примерах ниже.

Есть и другие инварианты, например:

- Метод `[[GetPrototypeOf]]`, применённый к прокси, должен возвращать то же значение, что и метод `[[GetPrototypeOf]]`, применённый к оригинальному объекту. Другими словами, чтение прототипа объекта прокси всегда должно возвращать прототип оригинального объекта.
  Ловушки могут перехватывать вызовы этих методов, но должны выполнять указанные условия.

Инварианты гарантируют корректное и последовательное поведение конструкций и методов языка. Полный список инвариантов можно найти в [спецификации](https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots), хотя скорее всего вы не нарушите эти условия, если только не соберётесь делать что-то совсем уж странное.
