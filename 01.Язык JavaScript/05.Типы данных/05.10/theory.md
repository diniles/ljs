# Деструктурирующее присваивание

#### [Деструктурирующее присваивание](https://learn.javascript.ru/destructuring-assignment)

### Деструктуризация массива

Деструктуризация позволяет разбивать объект или массив на переменные при присвоении.

**Полный синтаксис для массива:**

    let [item1 = default, item2, ...rest] = array

Первый элемент отправляется в item1; второй отправляется в item2, все остальные элементы попадают в массив rest.

- Пропускайте элементы, используя запятые

  `let [firstName, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];`
- Работает с любым перебираемым объектом с правой стороны

  `let [a, b, c] = "abc";`
  `let [one, two, three] = new Set([1, 2, 3]);`
- Присваивайте чему угодно с левой стороны

  `let user = {};`
  `[user.name, user.surname] = "Ilya Kantor".split(' ');`
- Цикл с .entries()

  `let user = {
  name: "John",
  age: 30
  };`

  `// цикл по ключам и значениям`
  `for (let [key, value] of Object.entries(user)) {`
  `alert(`${key}:${value}`)`; `// name:John, затем age:30`
  `}`

…то же самое для map:
let user = new Map();
user.set("name", "John");
user.set("age", "30");

    for (let [key, value] of user) {
        alert(`${key}:${value}`); // name:John, затем age:30
    }

- Остаточные параметры «…»

  `let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];`

  Переменная `rest` является массивом из оставшихся элементов.

- Значения по умолчанию

  `let [name = "Guest", surname = "Anonymous"] = ["Julius"];`

### Деструктуризация объекта

    let {var1, var2} = {var1:…, var2:…}

    let options = {
        title: "Menu",
        width: 100,
        height: 200
    };
    
    let {title, width, height} = options;

Свойства `options.title`, `options.width` и `options.height` присваиваются соответствующим переменным. Порядок не имеет
значения.

    let {width: w, height: h, title} = options;

Двоеточие показывает «что : куда идёт». В примере выше свойство `width` сохраняется в переменную `w`, свойство `height`
сохраняется в `h`, а `title` присваивается одноимённой переменной.

Для потенциально отсутствующих свойств мы можем установить значения по умолчанию, используя `=`, как здесь:

    let {width = 100, height = 200, title} = options;

Мы также можем совмещать `:` и `=:`

    let {width: w = 100, height: h = 200, title} = options;

**Остаток объекта «…»**

    let {title, ...rest} = options;

**Вот так не будет работать:**

    let title, width, height;
    
    // ошибка будет в этой строке
    {title, width, height} = {title: "Menu", width: 200, height: 100};

Чтобы показать JavaScript, что это не блок кода, мы можем заключить выражение в скобки `(...)`:

    let title, width, height;
    
    // сейчас всё работает
    ({title, width, height} = {title: "Menu", width: 200, height: 100});

### Вложенная деструктуризация

В приведённом ниже коде options хранит другой объект в свойстве `size` и массив в свойстве `items`. Шаблон в левой части
присваивания имеет такую же структуру, чтобы извлечь данные из них:

    let options = {
        size: {
        width: 100,
        height: 200
        },
        items: ["Cake", "Donut"],
        extra: true
    };
    
    // деструктуризация разбита на несколько строк для ясности
    let {
        size: { // положим size сюда
        width,
        height
    },
    items: [item1, item2], // добавим элементы к items
    title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
    } = options;

### Умные параметры функций

    let options = {
        title: "My menu",
        items: ["Item1", "Item2"]
    };
    
    function showMenu({
        title = "Untitled",
        width: w = 100,  // width присваиваем в w
        height: h = 200, // height присваиваем в h
        items: [item1, item2] // первый элемент items присваивается в item1, второй в item2
    }) {
        alert( `${title} ${w} ${h}` ); // My Menu 100 200
        alert( item1 ); // Item1
        alert( item2 ); // Item2
    }
    
    showMenu(options);

