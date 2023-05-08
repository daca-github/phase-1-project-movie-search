document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form")
    const searchInput = document.getElementById("search-input")
    const movieContainer = document.getElementById("movie-container")
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault()
        searchMovies(searchInput.value)
    })

    function searchMovies(searchTerm) {
        fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=4f389c01${searchTerm}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.response === "True") {
                displayMovies(data.Search)
            } else {
                moviesContainer.innerhtml = `<p> No Results for "${searchTerm}". </p>`
            }
        })
    }
    function displayMovies(movies) {
        const movieElements = movies.map((movie) => {
            return `
            <div class="movie">
                <h3>${movie.Title}</h3>
                <p>Year: ${movie.Year}</p>
            </div>
            `
        })
        
    }
})