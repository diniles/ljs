# Взаимодействие: alert, prompt, confirm

#### [Взаимодействие: alert, prompt, confirm](https://learn.javascript.ru/alert-prompt-confirm)

### alert

    alert("Hello");

### prompt

Функция prompt принимает два аргумента:

    result = prompt(title, [default]);

Этот код отобразит модальное окно с текстом, полем для ввода текста и кнопками OK/Отмена.

- **title** - Текст для отображения в окне.
- **default** - Необязательный второй параметр, который устанавливает начальное значение в поле для текста в окне.

### confirm

    result = confirm(question);

Функция **confirm** отображает модальное окно с текстом вопроса **question** и двумя кнопками: **OK** и **Отмена**.

Результат – **true**, если нажата кнопка **OK**. В других случаях – **false**.
