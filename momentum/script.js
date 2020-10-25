// DOM Elements
const time = document.getElementById('time'),
    date = document.getElementById('date'),
    dayOfweek = document.getElementById('dayOfWeek'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus');
quote = document.getElementById('quote');
quote_author = document.getElementById('quote_author');

options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};


// Show Time
function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds(),
        day = today.toLocaleDateString(undefined, options);
    // day = today.getDate(),
    // month = today.getMonth()+1,
    // year = today.getFullYear();
    time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
    date.innerHTML = `${day}`;
    // dayOfweek.innerHTML = `${dayOfWeek}`;

    setTimeout(showTime, 1000);
}
// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setGreet() {
    let today = new Date(),
        hour = today.getHours();

    if (6 <= hour < 12) {
        greeting.textContent = ('С чудестным утром,');
    } else if (12 <= hour < 18) {
        greeting.textContent = ('Добырый день,');
    } else if (18 <= hour < 24) {
        greeting.textContent('Добрый вечер, ');
    } else {
        greeting.textContent('Доброй ночи, ');
    }
}


//run

showTime();