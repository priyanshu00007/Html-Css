const API_KEY = 'Your_API_KEY';
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const moviesContainer = document.getElementById('movies-container');
const searchBar = document.getElementById('search-bar');

// Fetch and display popular movies on page load
fetchMovies(API_URL);

// Search functionality
searchBar.addEventListener('keyup', (e) => {
    const searchTerm = e.target.value;
    if (searchTerm && searchTerm !== '') {
        fetchMovies(SEARCH_API + searchTerm);
    } else {
        fetchMovies(API_URL);
    }
});

function fetchMovies(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function displayMovies(movies) {
    moviesContainer.innerHTML = ''; // Clear previous movies

    movies.forEach(movie => {
        const { title, poster_path, vote_average } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <h3>${title}</h3>
            <p>Rating: ${vote_average}</p>
        `;

        moviesContainer.appendChild(movieElement);
    });
}
