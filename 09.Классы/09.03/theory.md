# Статические свойства и методы

#### [Статические свойства и методы](https://learn.javascript.ru/static-properties-methods)

Статические методы используются для функциональности, принадлежат классу «в целом», а не относятся к конкретному объекту
класса.

Например, метод для сравнения двух статей `Article.compare(article1, article2)` или фабричный
метод `Article.createTodays()`.

      class Article {
         constructor(title, date) {
            this.title = title;
            this.date = date;
         }
      
      static compare(articleA, articleB) {
         return articleA.date - articleB.date;
         }
      }
      
      // использование
      let articles = [
      new Article("HTML", new Date(2019, 1, 1)),
      new Article("CSS", new Date(2019, 0, 1)),
      new Article("JavaScript", new Date(2019, 11, 1))
      ];
      
      articles.sort(Article.compare);
      
      alert( articles[0].title ); // CSS

      class Article {
         constructor(title, date) {
         this.title = title;
         this.date = date;
      }
      
      static createTodays() {
         // помним, что this = Article
         return new this("Сегодняшний дайджест", new Date());
         }
      }
      
      let article = Article.createTodays();
      
      alert( article.title ); // Сегодняшний дайджест

В объявлении класса они помечаются ключевым словом `static`.

Статические свойства используются в тех случаях, когда мы хотели бы сохранить данные на уровне класса, а не какого-то
одного объекта.

Синтаксис:

      class MyClass {
         static property = ...;
         
         static method() {
         ...
         }
      }

Технически, статическое объявление – это то же самое, что и присвоение классу:

      MyClass.property = ...
      MyClass.method = ...

Статические свойства и методы наследуются.

Для class B extends A прототип класса B указывает на `A: B.[[Prototype]] = A`. Таким образом, если поле не найдено в `B`
, поиск продолжается в `A`.