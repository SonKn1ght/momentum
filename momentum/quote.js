'use strict';

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
const wrapperQuote = document.querySelector('.wrapper-quote');

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;

  // api виснет добавил заглушку на время отрабатывания промиса
  wrapperQuote.classList.remove('quote-visible');
  setTimeout(() => {
    wrapperQuote.classList.add('quote-visible')
    blockquote.textContent = 'Quote loading...';
    figcaption.textContent = '';
  }, 650);

    try {
      const res = await fetch(url);
      var data = await res.json();
    } catch(err) {
      setTimeout(() => {
        wrapperQuote.classList.remove('quote-visible');
        wrapperQuote.classList.add('quote-visible')
        blockquote.textContent = 'Something went wrong on the internet, please try again later';
        figcaption.textContent = '';
      }, 700);
      return;
    }


    wrapperQuote.classList.remove('quote-visible');

    setTimeout(() => {
      wrapperQuote.classList.add('quote-visible')
      blockquote.textContent = data.quoteText;
      figcaption.textContent = data.quoteAuthor;
    }, 705);


}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);