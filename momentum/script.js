// DOM Elements
const time = document.getElementById('time'),
    date = document.getElementById('date'),
    dayOfweek = document.getElementById('dayOfWeek'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    focus = document.getElementById('focus'),
    quote = document.getElementById('quote'),
    quote_author = document.getElementById('quote_author'),
    quoteUrl = 'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru',
    weatherIcon = document.querySelector('.weather_icon'),
    temperature = document.querySelector('.weather_degree'),
    weatherDescription = document.querySelector('.weather_city');

let backgrnds = [];
let timeOfDay = 'default';

let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};


// Show Time
function showTimeGreet() {
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
    if (6 <= hour < 12) {
        timeOfDay = 'morning';
    } else if (12 <= hour < 18) {
        timeOfDay = 'day';
    } else if (18 <= hour < 24) {
        timeOfDay = 'evening';
    } else {
        timeOfDay = 'night';
    }

    setTimeout(showTimeGreet, 1000);
    setGreetBgrnd();
}
// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


function setGreetBgrnd() {
    let today = new Date(),
        hour = today.getHours(),
        temp_hour = null;
    if (temp_hour === null) {
        temp_hour = hour;
        if (timeOfDay = 'morning') {
            greeting.textContent = ('С чудестным утром,');
            document.body.style.backgroundImage = `url(${backgrnds[hour]})`;
        } else if (timeOfDay = 'day') {
            greeting.textContent = ('Хорошего дня,');
            document.body.style.backgroundImage = `url(${backgrnds[hour]})`;
        } else if (timeOfDay = 'evening') {
            greeting.textContent('Добрый вечер, ');
            document.body.style.backgroundImage = `url(${backgrnds[hour]})`;
        } else {
            greeting.textContent('Доброй ночи, ');
            document.body.style.backgroundImage = `url(${backgrnds[hour]})`;
        }
    } else if (temp_hour < hour) {
        temp_hour = null;
    }
}

function backgrndTimeOfDay(timeOfday) {
    let backgrounds = [];
    for (let index = 1; index <= 20; index++) {
        index = parseInt(index, 10) < 10 ? '0' + index : +index;
        backgrounds.push(`'../momentum/assets/images/${timeOfday}/${index}.jpg'`);
    }
    return backgrounds;
}

function backgrndWholeDay() {
    let morning = backgrndTimeOfDay('morning').sort(() => .5 - Math.random()).slice(0, 6);
    let day = backgrndTimeOfDay('day').sort(() => .5 - Math.random()).slice(0, 6);
    let evening = backgrndTimeOfDay('evening').sort(() => .5 - Math.random()).slice(0, 6);
    let night = backgrndTimeOfDay('night').sort(() => .5 - Math.random()).slice(0, 6);

    backgrnds = backgrnds.concat(night, morning, day, evening);
}


async function getQuote() {
    const res = await fetch(quoteUrl);
    const data = await res.json();
    quote.textContent = data.quoteText;
    quote_author.textContent = data.quoteAuthor;
}


function setBackground(hour) {

}

//run
backgrndWholeDay();
showTimeGreet();
document.addEventListener('DOMContentLoaded', getQuote);