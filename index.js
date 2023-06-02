// "https://www.omdbapi.com/?i=tt3896198&apikey=867f9b9b"

function renderMovies(movie) {
  return `<div class="movie">
  <figure class="poster__img--wrapper">
    <img src="${movie.Poster}" class="poster__img" alt="">
  </figure>
  <div class="book__title">
  <p class="movie__title">${movie.Title} <span class="movie__year">(${movie.Year})</span></p>
  </div>
</div>`;
}

let movieData = [];

async function onSearchChange(event) {
  const keyword = event.target.value;
  const movies = await fetch(
    `https://www.omdbapi.com/?i=tt3896198&apikey=867f9b9b&s=${keyword}`
  );
  movieData = await movies.json();
  const movieEl = document.querySelector(".movies");
  const featureHeader = document.querySelector(".feature__header--wrapper h1");
  movieEl.innerHTML = movieData.Search.map((movie) => renderMovies(movie)).join(
    ""
  );
  featureHeader.textContent = `Results for: ${keyword}`;
}

function filterMovies(event) {
  const filter = event.target.value;
  let sortedMovies = [...movieData.Search];

  if (filter === "OLD_TO_NEW") {
    sortedMovies.sort((a, b) => new Date(a.Year) - new Date(b.Year));
  } else if (filter === "NEW_TO_OLD") {
    sortedMovies.sort((a, b) => new Date(b.Year) - new Date(a.Year));
  }

  const movieEl = document.querySelector(".movies");
  movieEl.innerHTML = sortedMovies.map((movie) => renderMovies(movie)).join("");
}
