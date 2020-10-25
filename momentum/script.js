// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  leftBtn = document.querySelector('.left-btn'),
  rightBtn = document.querySelector('.right-btn');

// Secondary functions
function getRandomInteger(a = 0, b = 1) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// объявляяем снаружи список картинок и наполняем в функции через замыкание
let imageList = [];

// генерируем список на старте
(function generateImageOfDay() {
  let imageNight = [];
  let imageMorning = [];
  let imageDay = [];
  let imageEvening = [];


  // генерация 6 уникальных картинок под время дня
  while (imageNight.length < 6) {
    let current = `night/${addZero(getRandomInteger(1,20))}.jpg`;
    if (imageNight.includes(current)) {
      continue;
    }
    imageNight.push(current)
  }

  while (imageMorning.length < 6) {
    let current = `morning/${addZero(getRandomInteger(1,20))}.jpg`;
    if (imageMorning.includes(current)) {
      continue;
    }
    imageMorning.push(current)
  }

  while (imageDay.length < 6) {
    let current = `day/${addZero(getRandomInteger(1,20))}.jpg`;
    if (imageDay.includes(current)) {
      continue;
    }
    imageDay.push(current)
  }

  while (imageEvening.length < 6) {
    let current = `evening/${addZero(getRandomInteger(1,20))}.jpg`;
    if (imageEvening.includes(current)) {
      continue;
    }
    imageEvening.push(current)
  }
  imageList = [...imageNight, ...imageMorning, ...imageDay, ...imageEvening]
})();

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
    setBgGreet();
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
  let today = new Date(),
    hour = today.getHours();

  if (0 <= hour && hour < 6) {
    // Night
    document.body.style.backgroundImage =
      `url('./assets/images/${imageList[hour]}')`;
    greeting.textContent = 'Good Night ';
  } else if (6 <= hour && hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      `url('./assets/images/${imageList[hour]}')`;
    greeting.textContent = 'Good Morning ';
  } else if (12 <= hour && hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      `url('./assets/images/${imageList[hour]}')`;
    greeting.textContent = 'Good Afternoon ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      `url('./assets/images/${imageList[hour]}')`;
    greeting.textContent = 'Good Evening ';
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

// обработчики пролистывания фоновых картинок
{
  let today = new Date();
  // получаем номер картинки на старте страницы
  let numberImage = today.getHours();
  // блокирующая переменная и функция для ее возврата по таймауту
  let lock = true;
  function resetLockBtn(elem) {
    elem.disabled = false;
  }

  leftBtn.addEventListener('click', () => {
    if (leftBtn.disabled === false) {
      leftBtn.disabled = true;
      numberImage--;
      if (numberImage === -1) {
        numberImage = 23;
      }
      document.body.style.backgroundImage =
        `url('./assets/images/${imageList[numberImage]}')`;
      setTimeout(resetLockBtn, 1000, leftBtn);
    }
  })

  rightBtn.addEventListener('click', () => {
    if (rightBtn.disabled === false) {
      rightBtn.disabled = true;
      numberImage++;
      if (numberImage === 24) {
        numberImage = 0;
      }
      document.body.style.backgroundImage =
        `url('./assets/images/${imageList[numberImage]}')`;
      setTimeout(resetLockBtn, 1000, rightBtn);
    }
  })
}




// Run
showTime();
setBgGreet();
getName();
getFocus();