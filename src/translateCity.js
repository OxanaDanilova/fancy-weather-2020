const translateCity = (lang, cityName) => {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${cityName}&language=${lang}&key=70188fac5c6744ee8c1d10b133a413f3&pretty=1&no_annotations=1`;
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      const city = data.results[0].components.city
      || data.results[0].components.town
      || data.results[0].components.village
      || data.results[0].components.county
      || data.results[0].components.state;
      const { country } = data.results[0].components;
      const location = document.getElementsByClassName('location')[0];
      location.innerHTML = `${city}, ${country}`;
    })
    .catch(e => e);
};

export default translateCity;
