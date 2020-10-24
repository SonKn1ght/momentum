// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

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
    // Morning
    document.body.style.backgroundImage =
      "url('./assets/images/overlay.png'), url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Night, ';
  } else if (6 <= hour && hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg'), url('./assets/images/overlay.png')";
    greeting.textContent = 'Good Morning, ';
  } else if (12 <= hour && hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg'), url('./assets/images/overlay.png')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg'), url('./assets/images/overlay.png')";
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
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
    // трим удаляет пробелы с краев строки или если в строке одни пробелы то возвращает пустую строку, проверка на ввод пустого значения
    if (e.target.innerText.trim() === '') {
      name.textContent = '[Enter Name]';
    }
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
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
    if (e.target.innerText.trim() === '') {
      focus.textContent = '[Enter Focus]';
    }
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);


name.addEventListener('focus', (evt) => {
  if (evt.target.innerText === '[Enter Name]') {
    evt.target.textContent = '';
  }
})

focus.addEventListener('focus', (evt) => {
  if (evt.target.innerText === '[Enter Focus]') {
    evt.target.textContent = '';
  }
})

// Run
showTime();
setBgGreet();
getName();
getFocus();