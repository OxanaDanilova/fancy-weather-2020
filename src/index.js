/* eslint-disable no-unused-vars */
import createDom from './createDom';
import showMap from './showMap';
import translateCity from './translateCity';
import showBg from './showBg';

/* eslint-disable no-undef */
/* eslint-disable no-shadow */

let definedTags;
let weatherUnits;
let lang;
let timerId;

const setTags = (tags) => {
  definedTags = tags;
};

const defineWeekDay = (curTime, lang, option) => {
  const weekArrBe = ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'];
  let date;
  if (curTime === '') {
    date = new Date();
  } else {
    date = new Date(curTime);
  }

  let weekDay;
  if (lang === 'be') {
    weekDay = weekArrBe[date.getDay()];
  } else {
    weekDay = date.toLocaleString(lang, option);
  }
  return weekDay;
};

const displayIcon = (icon) => {
  const skycons = new Skycons({ color: 'white' });
  skycons.add(document.getElementsByClassName('weather-icon')[0], icon);
  skycons.play();
};

const displayCurrentWeather = (temperature, descrip, apparentTemp, wind, humidity, icon) => {
  const temperDispl = document.getElementsByClassName('temp-now')[0];
  temperDispl.innerHTML = `${temperature}°`;
  const descripDispl = document.getElementsByClassName('general')[0];
  descripDispl.innerHTML = descrip;
  const appTempDispl = document.getElementsByClassName('apparent-temp')[0];
  appTempDispl.innerHTML = `${apparentTemp}°`;
  const windDispl = document.getElementsByClassName('wind')[0];
  windDispl.innerHTML = `${wind} m/s`;
  const humidityDispl = document.getElementsByClassName('humidity')[0];
  humidityDispl.innerHTML = `${humidity}%`;
  displayIcon(icon);
};

const displayDate = (dateValue) => {
  const dateNow = document.getElementsByClassName('date')[0];
  dateNow.innerHTML = dateValue;
};

const transformDate = (curTime, lang, timezone) => {
  const monthArrBe = ['Студзень', 'Люты', 'Сакавiк', 'Красавiк', 'Травень', 'Чэрвень', 'Лiпень', 'Жнiвень', 'Верасень', 'Кастрычнiк', 'Лiстапад', 'Снежань'];
  let date;
  if (curTime === '' || curTime === undefined) {
    date = new Date();
  } else {
    date = new Date(curTime);
  }
  const locTime = new Intl.DateTimeFormat(lang, {
    hour: 'numeric', minute: 'numeric', hour12: false, timeZone: timezone,
  }).format(date);
  let month;
  const weekDay = defineWeekDay(curTime, lang, { weekday: 'short' });
  const day = date.getDate();
  let dateValue;
  const options = { weekday: 'short', month: 'long', day: 'numeric' };
  if (lang === 'be') {
    month = monthArrBe[date.getMonth()];
    dateValue = `${weekDay} ${day} ${month} ${locTime}`;
  } else {
    month = date.toLocaleString(lang, { month: 'long' });
    dateValue = `${date.toLocaleString(lang, options)} ${locTime}`;
  }
  displayDate(dateValue);
};

const runClock = (lang, timezone) => {
  timerId = setInterval(transformDate, 60000, '', lang, timezone);
};

const defineDate = (curTime, lang, timezone) => {
  transformDate(curTime, lang, timezone);
  runClock(lang, timezone);
};

const defineTags = (curTime, lang, timezone) => {
  const date = new Date(curTime);
  const hour = new Intl.DateTimeFormat(lang, {
    hour: 'numeric', hour12: false, timeZone: timezone,
  }).format(date);
  const month = date.getMonth();

  let season;
  switch (month) {
    case 0:
    case 1:
    case 11:
      season = 'winter';
      break;
    case 2:
    case 3:
    case 4:
      season = 'spring';
      break;
    case 5:
    case 6:
    case 7:
      season = 'summer';
      break;
    case 8:
    case 9:
    case 10:
      season = 'autumn';
      break;
    default:
      return month;
  }

  let partDay;
  if (hour > 6 && hour <= 12) {
    partDay = 'morning';
  }
  if (hour > 12 && hour <= 18) {
    partDay = 'day';
  }
  if (hour > 18 && hour <= 24) {
    partDay = 'evening';
  }
  if (hour <= 6) {
    partDay = 'night';
  }

  const tags = `,${season},${partDay}`;
  return tags;
};

const defineWeather = (coord, lang) => {
  clearInterval(timerId);
  let units;
  if (weatherUnits === 'cels') { units = 'si'; } else {
    units = 'us';
  }
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const url = `https://api.darksky.net/forecast/0857b0950865413a07a7de9a8d1eaca2/${coord}?lang=${lang}&units=${units}`;
  fetch(proxyUrl + url)
    .then(res => res.json())
    .then((data) => {
      const currentDay = data.currently;
      const curTime = currentDay.time * 1000;
      defineDate(curTime, lang, data.timezone);
      const temperature = Math.round(currentDay.temperature);
      const description = currentDay.summary;
      const apparentTemp = Math.round(currentDay.apparentTemperature);
      const wind = currentDay.windSpeed;
      const humidity = currentDay.humidity * 100;
      const { icon } = currentDay;
      displayCurrentWeather(temperature, description, apparentTemp, wind, humidity, icon);
      let tags = defineTags(curTime, lang, data.timezone);
      tags += `,${icon}`;
      showBg(tags);
      setTags(tags);
      for (let i = 0; i < 3; i += 1) {
        const nextDay = new Date(data.daily.data[i + 1].time * 1000);
        document.getElementsByClassName('day')[i].innerHTML = defineWeekDay(nextDay, lang, { weekday: 'long' });
        document.getElementsByClassName('day-temp')[i].innerHTML = `${Math.round(data.daily.data[i + 1].temperatureHigh)}°`;
        const skycons = new Skycons({ color: 'white' });
        skycons.add(document.getElementsByClassName('day-weather-icon')[i], icon);
        skycons.play();
      }
    })
    .catch(e => e);
};

const defineUserLocation = (lang) => {
  const url = 'https://ipinfo.io/json?token=14c5d902d0f54c';
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      const { city } = data;
      const { loc } = data;
      const latit = loc.split(',')[0];
      const longit = loc.split(',')[1];
      document.getElementsByClassName('ltd')[0].innerHTML = latit;
      document.getElementsByClassName('lng')[0].innerHTML = longit;
      showMap(longit, latit, lang);
      translateCity(lang, city);
      const latitude = document.getElementsByClassName('latitude')[0];
      latitude.innerHTML = `${Math.trunc(latit)}° ${60 * String(Number(latit)
        .toFixed(2)).split('.')[1]}`;
      const longitude = document.getElementsByClassName('longitude')[0];
      longitude.innerHTML = `${Math.trunc(longit)}° ${60 * String(Number(longit)
        .toFixed(2)).split('.')[1]}`;
      defineWeather(loc, lang);
    });
};


const convertToCoord = (lang) => {
  const searchInput = document.getElementsByClassName('input-search')[0];
  const searchPar = searchInput.value;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${searchPar}&language=${lang}&key=70188fac5c6744ee8c1d10b133a413f3&pretty=1&no_annotations=1`;
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      const { lat } = data.results[0].geometry;
      const { lng } = data.results[0].geometry;
      const city = data.results[0].components.city
       || data.results[0].components.town
       || data.results[0].components.village
       || data.results[0].components.county
       || data.results[0].components.state;

      const { country } = data.results[0].components;
      document.getElementsByClassName('ltd')[0].innerHTML = lat;
      document.getElementsByClassName('lng')[0].innerHTML = lng;
      const loc = `${lat},${lng}`;
      showMap(lng, lat, lang);
      const location = document.getElementsByClassName('location')[0];
      location.innerHTML = `${city}, ${country}`;
      const latitude = document.getElementsByClassName('latitude')[0];
      latitude.innerHTML = `${Math.trunc(lat)}° ${60 * String(Number(lat)
        .toFixed(2)).split('.')[1]}`;
      const longitude = document.getElementsByClassName('longitude')[0];
      longitude.innerHTML = `${Math.trunc(lng)}° ${60 * String(Number(lng)
        .toFixed(2)).split('.')[1]}`;
      defineWeather(loc, lang);
    })
    .catch(e => e);
};

const setWeatherUnits = (units) => {
  weatherUnits = units;
};

const convertToCels = () => {
  const fareng = document.getElementsByClassName('fareng')[0];
  const cels = document.getElementsByClassName('cels')[0];
  if (cels.classList.contains('clicked') === false) {
    fareng.classList.remove('clicked');
    cels.classList.add('clicked');
    setWeatherUnits('cels');
    localStorage.setItem('savedUnits', 'cels');
    const tempNow = document.getElementsByClassName('temp-now')[0];
    const tempFar = tempNow.innerHTML.slice(0, tempNow.innerHTML.length - 1);
    const tempCel = Math.round((tempFar - 32) * 5 / 9);
    tempNow.innerHTML = `${tempCel}°`;

    const apparentTempNow = document.getElementsByClassName('apparent-temp')[0];
    const apparentTempFar = apparentTempNow.innerHTML
      .slice(0, apparentTempNow.innerHTML.length - 1);
    const apparentTempCel = Math.round((apparentTempFar - 32) * 5 / 9);
    apparentTempNow.innerHTML = `${apparentTempCel}°`;

    for (let i = 0; i < 3; i += 1) {
      const tempNextDay = document.getElementsByClassName('day-temp')[i];
      const tempNextFar = tempNextDay.innerHTML.slice(0, tempNextDay.innerHTML.length - 1);
      const tempNextCel = Math.round((tempNextFar - 32) * 5 / 9);
      tempNextDay.innerHTML = `${tempNextCel}°`;
    }
  }
};

const convertToFareng = () => {
  const fareng = document.getElementsByClassName('fareng')[0];
  const cels = document.getElementsByClassName('cels')[0];
  if (fareng.classList.contains('clicked') === false) {
    cels.classList.remove('clicked');
    fareng.classList.add('clicked');
    setWeatherUnits('fareng');
    localStorage.setItem('savedUnits', 'fareng');
    const tempNow = document.getElementsByClassName('temp-now')[0];
    const tempCel = tempNow.innerHTML.slice(0, tempNow.innerHTML.length - 1);
    const tempFar = Math.round((tempCel * 9 / 5) + 32);
    tempNow.innerHTML = `${tempFar}°`;

    const apparentTempNow = document.getElementsByClassName('apparent-temp')[0];
    const apparentTempCel = apparentTempNow.innerHTML
      .slice(0, apparentTempNow.innerHTML.length - 1);
    const apparentTempFar = Math.round((apparentTempCel * 9 / 5) + 32);
    apparentTempNow.innerHTML = `${apparentTempFar}°`;

    for (let i = 0; i < 3; i += 1) {
      const tempNextDay = document.getElementsByClassName('day-temp')[i];
      const tempNextCel = tempNextDay.innerHTML.slice(0, tempNextDay.innerHTML.length - 1);
      const tempNextFar = Math.round((tempNextCel * 9 / 5) + 32);
      tempNextDay.innerHTML = `${tempNextFar}°`;
    }
  }
};

const staticTransl = (lang) => {
  if (lang === 'ru') {
    document.getElementsByClassName('search-btn')[0].innerHTML = 'Поиск';
    document.getElementsByClassName('latitude-lab')[0].innerHTML = 'Широта:';
    document.getElementsByClassName('longitude-lab')[0].innerHTML = 'Долгота:';
    document.getElementsByClassName('input-search')[0].placeholder = 'Искать город';
  }
  if (lang === 'en') {
    document.getElementsByClassName('search-btn')[0].innerHTML = 'Search';
    document.getElementsByClassName('latitude-lab')[0].innerHTML = 'Latitude:';
    document.getElementsByClassName('longitude-lab')[0].innerHTML = 'Longitude:';
    document.getElementsByClassName('input-search')[0].placeholder = 'Search city';
  }
  if (lang === 'be') {
    document.getElementsByClassName('search-btn')[0].innerHTML = 'Пошук';
    document.getElementsByClassName('latitude-lab')[0].innerHTML = 'Шыраты:';
    document.getElementsByClassName('longitude-lab')[0].innerHTML = 'Даўгата:';
    document.getElementsByClassName('input-search')[0].placeholder = 'Пошук горада';
  }
};

const changeLang = (lang) => {
  staticTransl(lang);
  const lng = document.getElementsByClassName('lng')[0].innerHTML;
  const lat = document.getElementsByClassName('ltd')[0].innerHTML;
  const loc = `${lat},${lng}`;
  translateCity(lang, `${lat}+${lng}`);
  defineWeather(loc, lang);
};

const selectLang = () => {
  const langDispl = document.getElementsByClassName('language-panel')[0];
  lang = langDispl.value;
  localStorage.setItem('language', lang);
  changeLang(lang);
};

const app = () => {
  createDom();
  const langDispl = document.getElementsByClassName('language-panel')[0];

  if (localStorage.getItem('language')) {
    lang = localStorage.getItem('language');
    langDispl.value = localStorage.getItem('language');
  } else {
    lang = langDispl.value;
  }
  langDispl.addEventListener('change', selectLang);

  const cels = document.getElementsByClassName('cels')[0];
  const fareng = document.getElementsByClassName('fareng')[0];
  if (localStorage.getItem('savedUnits')) {
    weatherUnits = localStorage.getItem('savedUnits');
    document.getElementsByClassName('clicked')[0].classList.toggle('clicked');
    if (weatherUnits === 'cels') {
      weatherUnits = 'cels';
      cels.classList.add('clicked');
      setWeatherUnits('cels');
    }
    if (weatherUnits === 'fareng') {
      weatherUnits = 'fareng';
      fareng.classList.add('clicked');
      setWeatherUnits('fareng');
    }
  } else {
    weatherUnits = 'cels';
    cels.classList.add('clicked');
    setWeatherUnits('cels');
  }


  cels.addEventListener('click', convertToCels);
  fareng.addEventListener('click', convertToFareng);

  const searchBtn = document.getElementsByClassName('search-btn')[0];
  const search = () => {
    convertToCoord(lang);
  };
  searchBtn.addEventListener('click', search);

  const searchInput = document.getElementsByClassName('input-search')[0];
  searchInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      searchBtn.click();
    }
  });

  const Bg = document.getElementsByClassName('change-bg')[0];
  const refreshBG = () => {
    showBg(definedTags);
  };
  Bg.addEventListener('click', refreshBG);

  staticTransl(lang);
  defineUserLocation(lang);
};


app();
