const showBg = (tags) => {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=nature${tags}&client_id=73861cdf71d6b882af3a2077382d2a4c5b54a586b96db6ed530ac9640386e185`;
  fetch(url)
    .then(res => res.json())
    .then((data) => {
      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = data.urls.full;
      const body = document.getElementsByTagName('body')[0];
      body.style.backgroundImage = `url(${data.urls.full})`;
    });
};

export default showBg;
