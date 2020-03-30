const createDom = () => {
  const markup = `
  <div class="control-panel">
  <div class="user-settings">
    <button class="change-bg">
      <svg width="15" height="20" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.0491975 10.7003C-0.0686153 9.64172 0.029562 8.61981 0.296604 7.67525C1.18413 4.53623 3.96844 2.22777 7.27112 2.18705V0.135087C7.27112 0.021089 7.40857 -0.0399815 7.49889 0.0292317L11.5713 3.13161C11.638 3.18454 11.638 3.29039 11.5713 3.33925L7.50282 6.44163C7.40857 6.51084 7.27505 6.44977 7.27505 6.33577V4.28788C5.10337 4.32452 3.24978 5.71285 2.45258 7.67525C2.15019 8.41624 1.99704 9.23458 2.04023 10.0936C2.09914 11.2743 2.52719 12.3614 3.20265 13.2408C3.56395 13.709 3.47755 14.393 3.01023 14.7472C2.56646 15.0851 1.94598 14.9915 1.60433 14.5436C0.767855 13.4607 0.210208 12.1415 0.0491975 10.7003ZM11.8069 6.7592C12.4863 7.63454 12.9144 8.72566 12.9693 9.90636C13.0125 10.7695 12.8554 11.5878 12.557 12.3247C11.7598 14.2871 9.9062 15.6796 7.73452 15.7121V13.6642C7.73452 13.5502 7.59707 13.4892 7.50675 13.5584L3.43435 16.6607C3.36759 16.7137 3.36759 16.8195 3.43435 16.8684L7.50282 19.9708C7.59707 20.04 7.73059 19.9789 7.73059 19.8649V17.8129C11.0333 17.7763 13.8215 15.4678 14.7051 12.3247C14.9721 11.3802 15.0664 10.3583 14.9525 9.29973C14.7954 7.85846 14.2378 6.53934 13.4013 5.45636C13.0557 5.00851 12.4392 4.91487 11.9954 5.25279C11.532 5.607 11.4456 6.29099 11.8069 6.7592Z" fill="white"/>
        </svg>

    </button>
    <select name="lang" class="language-panel">
          <option value="en">EN</option>
          <option value="ru">RU</option>
          <option value="be">BE</option>
      </select>
      <div class="temperature-wrapper">
      <button class="fareng">°F</button>
      <button class="cels clicked">°C</button>
    </div>
  </div>
  <div class="search-panel">
    <input type="search" name="input-search" class="input-search" id="" placeholder="Search city">
    <button class="search-btn">search</button>
  </div>
</div>
<div class="main-wrapper">
   <div class="weather-container">
    <p class="location">Minsk, Belarus</p>
    <p class="date">Mon 28 October 17:23</p>
    <div class="weather-now">
      <p class="temp-now">10°</p>
      <div class="weather-data">
        <canvas class="weather-icon" width="128" height="128"></canvas>
        <div class="weather-parameters">
          <p class="general">overcast</p>
          <p class="apparent-temp">7°</p>
          <p class="wind">2 m/s</p>
          <p class="humidity">83%</p>
        </div>
      </div>
    </div>
    <ul class="days-wrapper">
      <li>
        <p class="day">tuesday</p>
        <div class="day-weather-wrapper">
          <p class="day-temp">7°</p>
          <canvas class="day-weather-icon" width="128" height="128"></canvas>
        </div>
      </li>
          <li>
        <p class="day">wednesday</p>
        <div class="day-weather-wrapper">
          <p class="day-temp">6°</p>
          <canvas class="day-weather-icon" width="128" height="128"></canvas>
        </div>
      </li>
          <li>
        <p class="day">thursday</p>
        <div class="day-weather-wrapper">
          <p class="day-temp">3°</p>
          <canvas class="day-weather-icon" width="128" height="128"></canvas>
        </div>
      </li>

    </ul>
  </div>
  <div class="map-container">
    <div class="map" id="map">
    </div>
    <p class="latitude-lab">Latitude:</p><p class="latitude">53°54'</p><p class="ltd">53°54'</p>
    <p class="longitude-lab">Longitude:</p><p class="longitude">27°34'</p><p class="lng">27°34'</p>
  </div>
</div>
   `;
  document.body.innerHTML = markup;
};

export default createDom;
