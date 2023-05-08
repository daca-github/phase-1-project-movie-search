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

    function displayMovies(movies) {
        const movieElements = movies.map((movie) => {
            return `
                <div class="movie">
                    <h3>${movie.Title}</h3>
                    <img src"${movie.Poster}" alt= "${movie.Title} poster">
                    <p>Year: ${movie.Year}</p>
                </div>
            `;
        });
        moviesContainer.innerHTML = movieElements.join("");
    }
});
