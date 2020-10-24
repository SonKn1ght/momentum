// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// сохраняю сюда значения из полей для перезаписи если они не изменятся
let currentName = '';
// храню номер текущей картинки что б при смене получать другую
const currentImageNumber = 0;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    dayWeek = today.toLocaleString(`en-US`, {weekday: `long`});
    day = today.getDate();
    month = today.toLocaleString(`en-US`, {month: `long`});

  // Output Time
  time.innerHTML = `<div class="wrapper-time">
${hour}:${addZero(min)}:${addZero(sec)}
</div>
<div class="wrapper-date">
${dayWeek}, ${day} ${month}
</div>`;

  // тут слушаем границу часа для смены фона
  if (min == 0 && sec == 0) {

  }
  setTimeout(showTime, 1000);

}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  // 'December 17, 1995 03:24:00'
  let today = new Date(`December 17, 1995 12:24:00`),
    hour = today.getHours();

  if (0 <= hour && hour < 6) {
    // Morning
    document.body.style.backgroundImage =
      "url('./assets/images/night/01.jpg')";
    greeting.textContent = 'Good Night, ';
  } else if (6 <= hour && hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('./assets/images/morning/01.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (12 <= hour && hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('./assets/images/day/01.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('./assets/images/evening/01.jpg')";
    greeting.textContent = 'Good Evening, ';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null || localStorage.getItem('name').trim() === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keydown') {
    // Make sure enter is pressed
    if (e.key === 'Enter') {
      textInputProcessing(name, 'name', 'Name', e);
      // {      //если не было ввода или он был их пробелов запускаем проверки
      //   if (e.target.innerText.trim() === '') {
      //     // если в хранилище пусто отдаем заглушку и сбрасываем фокус
      //     if (localStorage.getItem('name') === null) {
      //       name.innerText = '[Enter Name]';
      //       name.blur();
      //       return
      //     }
      //     // если в хранилище есть значение то отдаем его в поле
      //     name.innerText = localStorage.getItem('name');
      //   }
      //   // если ввод произошел => то пишем его в хранилише и оставляем его в поле => сбрасывае фокус
      //   localStorage.setItem('name', e.target.innerText);
      //   name.blur();
      // }
    }
  } else {
    // трим удаляет пробелы с краев строки или если в строке одни пробелы то возвращает пустую строку, проверка на ввод пустого значения
    textInputProcessing(name, 'name', 'Name', e);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus').trim() === '') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keydown') {
    // Make sure enter is pressed
    if (e.key === 'Enter') {
      textInputProcessing(focus, 'focus', 'Focus', e);
    }
  } else {
    textInputProcessing(focus, 'focus', 'Focus', e);
  }
}

function textInputProcessing(element, attribute, placeholder, evt) {

  if (evt.target.innerText.trim() === '') {
    if (localStorage.getItem(attribute) === null) {
      element.innerText = `[Enter ${placeholder}]`;
      element.blur();
      return
    }
    element.innerText = localStorage.getItem(attribute);
  }
  localStorage.setItem(attribute, evt.target.innerText);
  element.blur();
}

name.addEventListener('keydown', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keydown', setFocus);
focus.addEventListener('blur', setFocus);

// обработчики ловят фокус на вводе текста и очищают поле для ввода.
{
  name.addEventListener('focus', (evt) => {
    evt.target.textContent = '';
  })
  //
  focus.addEventListener('focus', (evt) => {
    evt.target.textContent = '';
  })
}

// Run
showTime();
setBgGreet();
getName();
getFocus();