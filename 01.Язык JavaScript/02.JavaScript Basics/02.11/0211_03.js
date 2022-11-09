'use strict';

const userName = prompt(`Enter login`, 'Админ');

if (userName === 'Админ') {
  const password = prompt('Enter passowrd', 'Я главный');
  if (password === 'Я главный') {
    alert('Здравствуйте!');
  } else if (password === '' || password === null) {
    alert('Отменено');
  } else {
    alert('Неверный пароль');
  }
} else if (userName === null || userName === '') {
  alert('Отменено');
} else {
  alert('Я вас не знаю');
}