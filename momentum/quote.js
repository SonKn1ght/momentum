'use strict';

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn');
const wrapperQuote = document.querySelector('.wrapper-quote');

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();

  wrapperQuote.classList.remove('quote-visible');

  setTimeout(() => {
    wrapperQuote.classList.add('quote-visible')
    blockquote.textContent = data.quoteText;
    figcaption.textContent = data.quoteAuthor;
  }, 700);
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);