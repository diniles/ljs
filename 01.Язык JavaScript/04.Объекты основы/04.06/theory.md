# Опциональная цепочка '?.'

#### [Опциональная цепочка '?.'](https://learn.javascript.ru/optional-chaining)

Опциональная цепочка `?.` останавливает вычисление и возвращает `undefined`, если значение перед `?.` равно `undefined`
или `null`.

Далее в этой статье, для краткости, мы будем говорить, что что-то «существует», если оно не является `null` и
не `undefined`.

Другими словами, `value?.prop`:

работает как `value.prop`, если значение `value` существует, в противном случае (когда value равно `undefined/null`) он
возвращает `undefined`.

Синтаксис опциональной цепочки `?.` имеет три формы:

1. `obj?.prop` – возвращает `obj.prop` если `obj` существует, в противном случае `undefined`.
2. `obj?.[prop]` – возвращает `obj[prop]` если `obj` существует, в противном случае `undefined`.
3. `obj.method?.()` – вызывает `obj.method()`, если `obj.method` существует, в противном случае возвращает `undefined`.
