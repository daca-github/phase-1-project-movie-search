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
        
    }
})