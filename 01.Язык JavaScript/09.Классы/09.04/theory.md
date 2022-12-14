# Приватные и защищённые методы и свойства

#### [Приватные и защищённые методы и свойства](https://learn.javascript.ru/private-protected-properties-methods)

В JavaScript есть два типа полей (свойств и методов) объекта:

- Публичные: доступны отовсюду. Они составляют внешний интерфейс. До этого момента мы использовали только публичные
  свойства и методы.
- Приватные: доступны только внутри класса. Они для внутреннего интерфейса.

Защищённые поля не реализованы в JavaScript на уровне языка, но на практике они очень удобны, поэтому их эмулируют.

А теперь давайте сделаем кофеварку на JavaScript со всеми этими типами свойств. Кофеварка имеет множество деталей, мы не
будем их моделировать для простоты примера (хотя могли бы).

### Защищённое свойство «waterAmount»

Давайте для начала создадим простой класс для описания кофеварки:

    class CoffeeMachine {
        waterAmount = 0; // количество воды внутри
        
        constructor(power) {
        this.power = power;
        alert( `Создана кофеварка, мощность: ${power}` );
    }
    
    }
    
    // создаём кофеварку
    let coffeeMachine = new CoffeeMachine(100);
    
    // добавляем воды
    coffeeMachine.waterAmount = 200;

Прямо сейчас свойства `waterAmount` и `power` публичные. Мы можем легко получать и устанавливать им любое значение
извне.

Давайте изменим свойство `waterAmount` на защищённое, чтобы иметь больше контроля над ним. Например, мы не хотим, чтобы
кто-либо устанавливал его ниже нуля.

**Защищённые свойства обычно начинаются с префикса `_`.**

Так что наше свойство будет называться `_waterAmount`:

    class CoffeeMachine {
        _waterAmount = 0;
        
        set waterAmount(value) {
            if (value < 0) throw new Error("Отрицательное количество воды");
            this._waterAmount = value;
        }
        
        get waterAmount() {
            return this._waterAmount;
        }
        
        constructor(power) {
            this._power = power;
        }
        
    }
    
    // создаём новую кофеварку
    let coffeeMachine = new CoffeeMachine(100);
    
    // устанавливаем количество воды
    coffeeMachine.waterAmount = -10; // Error: Отрицательное количество воды

### Свойство только для чтения «power»

Давайте сделаем свойство `power` доступным только для чтения. Иногда нужно, чтобы свойство устанавливалось только при
создании объекта и после этого никогда не изменялось.

Это как раз требуется для кофеварки: мощность никогда не меняется.

Для этого нам нужно создать только геттер, но не сеттер:

    class CoffeeMachine {
        // ...
        
        constructor(power) {
            this._power = power;
        }
        
        get power() {
            return this._power;
        }
        
    }
    
    // создаём кофеварку
    let coffeeMachine = new CoffeeMachine(100);
    
    alert(`Мощность: ${coffeeMachine.power}W`); // Мощность: 100W
    
    coffeeMachine.power = 25; // Error (no setter)

**Геттеры/сеттеры**
Здесь мы использовали синтаксис геттеров/сеттеров.

Но в большинстве случаев использование функций `get.../set...` предпочтительнее:

    class CoffeeMachine {
        _waterAmount = 0;
        
        setWaterAmount(value) {
            if (value < 0) throw new Error("Отрицательное количество воды");
            this._waterAmount = value;
        }
        
        getWaterAmount() {
            return this._waterAmount;
        }
    }
    
    new CoffeeMachine().setWaterAmount(100);

Это выглядит немного длиннее, но функции более гибкие. Они могут принимать несколько аргументов (даже если они нам
сейчас не нужны). Итак, на будущее, если нам надо что-то отрефакторить, функции – более безопасный выбор.

**Защищённые поля наследуются**

Если мы унаследуем `class MegaMachine extends CoffeeMachine`, ничто не помешает нам обращаться к `this._waterAmount`
или `this._power` из методов нового класса.

Таким образом, защищённые поля, конечно же, наследуются. В отличие от приватных полей, в чём мы убедимся ниже.

### Приватное свойство «#waterLimit»

**Новая возможность**
Эта возможность была добавлена в язык недавно. В движках JavaScript пока не поддерживается или поддерживается частично,
нужен [полифил](https://learn.javascript.ru/polyfills).

Приватные свойства и методы должны начинаться с `#`. Они доступны только внутри класса.

Например, в классе ниже есть приватное свойство `#waterLimit` и приватный метод `#checkWater` для проверки количества
воды:

    class CoffeeMachine {
        #waterLimit = 200;
        
        #checkWater(value) {
            if (value < 0) throw new Error("Отрицательный уровень воды");
            if (value > this.#waterLimit) throw new Error("Слишком много воды");
        }
    }
    
    let coffeeMachine = new CoffeeMachine();
    
    // снаружи нет доступа к приватным методам класса
    coffeeMachine.#checkWater(); // Error
    coffeeMachine.#waterLimit = 1000; // Error

На уровне языка `#` является специальным символом, который означает, что поле приватное. Мы не можем получить к нему
доступ извне или из наследуемых классов.

Приватные поля не конфликтуют с публичными. У нас может быть два поля одновременно – приватное `#waterAmount` и
публичное `waterAmount`.

В отличие от защищённых, функциональность приватных полей обеспечивается самим языком. Это хорошо.

Но если мы унаследуем от `CoffeeMachine`, то мы не получим прямого доступа к `#waterAmount`. Мы будем вынуждены
полагаться на геттер/сеттер `waterAmount`:

    class MegaCoffeeMachine extends CoffeeMachine {
            method() {
            alert( this.#waterAmount ); // Error: can only access from CoffeeMachine
            }
    }

**Важно**:
Приватные поля особенные.

Как мы помним, обычно мы можем получить доступ к полям объекта с помощью `this[name]`:

    class User {
        ...
        sayHi() {
            let fieldName = "name";
            alert(`Hello, ${this[fieldName]}`);
        }
    }

С приватными свойствами такое невозможно: `this['#name']` не работает. Это ограничение синтаксиса сделано для
обеспечения приватности.