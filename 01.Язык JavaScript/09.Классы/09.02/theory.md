# Наследование классов

#### [Наследование классов](https://learn.javascript.ru/class-inheritance)

1. Чтобы унаследовать от класса: `class Child extends Parent`:
    - При этом `Child.prototype.__proto__` будет равен `Parent.prototype`, так что методы будут унаследованы.
2. При переопределении конструктора:
    - Обязателен вызов конструктора родителя `super()` в конструкторе `Child` до обращения к `this`.
3. При переопределении другого метода:
    - Мы можем вызвать `super.method()` в методе `Child` для обращения к методу родителя `Parent`.
4. Внутренние детали:
    - Методы запоминают свой объект во внутреннем свойстве `[[HomeObject]]`. Благодаря этому работает `super`, он в его
      прототипе ищет родительские методы.
    - Поэтому копировать метод, использующий super, между разными объектами небезопасно.

Также:

- У функций-стрелок нет своего `this` и `super`, поэтому они «прозрачно» встраиваются во внешний контекст.

