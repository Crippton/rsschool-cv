// DOM Elements
const time = document.getElementById('time'),
    date = document.getElementById('date'),
    dayOfweek = document.getElementById('dayOfWeek'),
    greeting = document.getElementById('greeting'),
    name = document.getElementById('name'),
    age = document.getElementById('age'),
    focus = document.getElementById('focus'),
    quote = document.getElementById('quote'),
    quote_author = document.getElementById('quote_author'),
    quoteUrl = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru',
    weather_icon = document.querySelector('.weather_icon'),
    weather_degree = document.querySelector('.weather_degree'),
    weather_city = document.querySelector('.weather_city'),
    weather_description = document.querySelector('.weather_description'),
    getInfo = document.querySelector('.getInfo'),
    main_wrapper = document.querySelector('.main_wrapper'),
    newBackgr = document.getElementById('newBackgr');

let backgrnds = [];
let timeOfDay = 'default';
let backgrndChanger = new Date().getHours();
let temp_wait = null;

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
    if (6 <= hour && hour < 12) {
        timeOfDay = 'morning';
    } else if (12 <= hour && hour < 18) {
        timeOfDay = 'day';
    } else if (18 <= hour && hour < 24) {
        timeOfDay = 'evening';
    } else {
        timeOfDay = 'night';
    }

    setTimeout(showTimeGreet, 1000);
    setGreetBgrnd();
    // getNameAge();
}
// Add Zeros
function addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}


function setGreetBgrnd() {
    let today = new Date(),
        hour = today.getHours();

    if (temp_wait === null) {
        temp_wait = hour;
        if (timeOfDay === 'morning') {
            greeting.textContent = (`С чудестным утром, ${name.textContent.trim()}`);
            document.body.style.backgroundImage = `url(${backgrnds[hour]})`;
        } else if (timeOfDay === 'day') {
            greeting.textContent = (`Хорошего дня, ${name.textContent.trim()}`);
            document.body.style.backgroundImage = `url(${backgrnds[hour]})`;
        } else if (timeOfDay === 'evening') {
            greeting.textContent = (`Добрый вечер, ${name.textContent.trim()}`);
            document.body.style.backgroundImage = `url(${backgrnds[hour]})`;
        } else {
            greeting.textContent = (`Доброй ночи, ${name.textContent.trim()}`);
            document.body.style.backgroundImage = `url(${backgrnds[hour]})`;
        }
    } else if (temp_wait < hour) {
        temp_wait = null;
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


async function getWeatherAPI() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${weather_city.textContent}&lang=ru&appid=b2ef945a1488bd848d7b2ca31e51f381&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weather_icon.classList.add(`owf-${data.weather[0].id}`);
    weather_degree.textContent = `${data.main.temp}°C`;
    weather_description.textContent = data.weather[0].description;
}


function getWeather() {
    if (localStorage.getItem('weather_city') === null) {
        weather_city.textContent = 'Введи город для получения погоды';
    } else {
        weather_city.textContent = localStorage.getItem('weather_city');
        getWeatherAPI();
    }
}

function setWeatherCity(e) {
    if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('weather_city', e.target.textContent);
        weather_city.blur();
        getWeatherAPI();
    } else if (e.which == '0') {
        weather_city.textContent = 'Введи город?';
    } else {
        localStorage.setItem('weather_city', e.target.textContent);
    }
}


function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = 'Как твоё имя?';
        main_wrapper.classList.add('content_hide');
        getInfo.classList.remove('content_hide');
    } else {
        name.textContent = localStorage.getItem('name');
        main_wrapper.classList.remove('content_hide');
        getInfo.classList.add('content_hide');
    }
}


function setName(e) {
    if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
        getName();
    } else if (e.which == '0') {
        localStorage.getItem('name', e.target.textContent);
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = 'Какая твоя цель на сегодня?';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setFocus(e) {
    if (e.which == 13 || e.keyCode == 13) {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
        getFocus();
    } else if (e.which == '0') {
        focus.textContent = localStorage.getItem('focus');
    }
}


function clearInputs() {
    name.addEventListener('click', () => {
        name.innerHTML = ' ';
    });
    weather_city.addEventListener('click', () => {
        weather_city.innerHTML = ' ';
    });
    focus.addEventListener('click', () => {
        focus.innerHTML = ' ';
    });
}

function nextImage() {

    backgrndChanger += 1;
    document.body.style.backgroundImage = `url(${backgrnds[backgrndChanger]})`;
    if (backgrndChanger === 23) {
        backgrndChanger = 0;
    }

}


function main() {
    getWeather();
    getFocus();
    getName();

    setTimeout(main, 5000);
}


//RUN!

document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', getWeatherAPI);
weather_city.addEventListener('keypress', setWeatherCity);
weather_city.addEventListener('blur', setWeatherCity);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
newBackgr.addEventListener('click', nextImage);

backgrndWholeDay();
showTimeGreet();
clearInputs();
main();