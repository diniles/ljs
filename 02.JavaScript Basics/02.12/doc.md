# Оператор нулевого слияния (??)

#### https://learn.javascript.ru/nullish-coalescing-operator

**Новая возможность**

Эта возможность была добавлена в язык недавно. В старых браузерах может понадобиться полифил.

Оператор нулевого слияния представляет собой два вопросительных знака `??`

Результат выражения `a ?? b` будет следующим:

- если a определено, то a,
- если a не определено, то b.

Иначе говоря, оператор `??` возвращает первый аргумент, если он не `null/undefined`, иначе второй.

Оператор нулевого слияния не является чем-то принципиально новым. Это всего лишь удобный синтаксис, как из двух значений
получить одно, которое «определено».

**Сравнение с ||**

Важное различие между ними заключается в том, что:

- `||` возвращает первое истинное значение.
- `??` возвращает первое определённое значение.

### Итого

- Оператор нулевого слияния ?? — это быстрый способ выбрать первое «определённое» значение из списка.

Используется для присвоения переменным значений по умолчанию:

`// будет height=100, если переменная height равна null или undefined`

`height = height ?? 100;`

- Оператор ?? имеет очень низкий приоритет, лишь немного выше, чем у ? и =, поэтому при использовании его в выражении,
  скорее всего, потребуются скобки.
- Запрещено использовать вместе с || или && без явно указанного приоритета, то есть без скобок.