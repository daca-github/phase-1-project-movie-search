document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form")
    const searchInput = document.getElementById("search-input")
    const movieContainer = document.getElementById("movie-container")
    searchForm.addEventListener("submit", (event) => {
        event.preventDefault()
        searchMovies(searchInput.value)
    })
})