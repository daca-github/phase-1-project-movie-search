document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const moviesContainer = document.getElementById("movie-container");

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        searchMovies(searchInput.value);
    });

    function searchMovies(searchTerm) {
        fetch(`http://www.omdbapi.com/?apikey=4f389c01&s=${searchTerm}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.Response === "True") {
                    displayMovies(data.Search);
                } else {
                    moviesContainer.innerHTML = `<p>No Results for "${searchTerm}".</p>`;
                }
            });
    }

    function getValidImageSrc(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => resolve("https://via.placeholder.com/300x450?text=No+Image");
        });
    }
    async function displayMovies(movies) {
        const movieElements = await Promise.all(
            movies.map(async (movie) => {
                const poster = await getValidImageSrc(movie.Poster);
                return `
                    <div class="movie movie-card">
                        <h3>${movie.Title}</h3>
                        <img src="${poster}" alt="${movie.Title} poster">
                        <p>Year: ${movie.Year}</p>
                        <button class="view-details" data-imdbid="${movie.imdbID}">View Details</button>
                    </div>
                `;
            })
        );
        moviesContainer.innerHTML = movieElements.join("");
    }

    function handleDetailsButtonClick(event) {
        if (event.target.classList.contains("view-details")) {
            const imdbID = event.target.getAttribute("data-imdbid");
            fetchMovieDetails(imdbID);
        }
    }

    async function fetchMovieDetails(imdbID) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=4f389c01&i=${imdbID}`);
        const movie = await response.json();

        const detailsContainer = document.createElement("div")
        detailsContainer.innerHTML = `
        <h2>${movie.Title} (${movie.Year})</h2>
        <img src="${movie.Poster}" alt="${movie.Title} poster">
        <p>Genre: ${movie.Genre}</p>
        <p>Director: ${movie.Director}</p>
        <p>Actors: ${movie.Actors}</p>
        <p>Plot: ${movie.Plot}</p>
        <p>IMDB Rating: ${movie.imdbRating}/10</p>
        <p>Awards: ${movie.Awards}</p>
        <button id="go-home">Go Home</button>
        `
    moviesContainer.innerHTML = "";
    moviesContainer.appendChild(detailsContainer);
    
    document.getElementById("go-home").addEventListener("click", () =>{
        searchMovies(searchInput.value);
    });
    }
    
    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
    });
    
    moviesContainer.addEventListener("click", handleDetailsButtonClick);
});
