// Movie API Titles URL: https://omdbapi.com/?s=deadpool&page=1&apikey=c23741a3 
// Movie API Details URL: https://omdbapi.com/?i=tt5463162&apikey=c23741a3

var movieSearchBox = document.getElementById("movie-search-box");
var searchList = document.getElementById("search-list");
var resultGrid = document.getElementById("result-grid");
var searchTerm = movieSearchBox.value;
// URLs
var movieDetailsUrl = "https://omdbapi.com/i=tt5463162&apikey=c23741a3";

// Functions
function loadMovies(searchTerm){
    // URL for Movie Titles 
    var movieTitlesUrl = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=c23741a3`;

    fetch(movieTitlesUrl)
    .then(function(response){
        if(!response.ok){
            throw response.json();
        }
        return response.json();
    }).then(function(movieResults){
        console.log(movieResults);
        displayMovieList(movieResults.Search);
    }); 
}

function findMovies(){

    var searchTerm = movieSearchBox.value;

    if (searchTerm.length > 0){
        searchList.classList.remove("hide-search-list");
        loadMovies(searchTerm);
    } else {
        searchList.classList.add("hide-search-list");
    }
}

function displayMovieList(movies){
    // Empties string
    searchList.innerHTML = "";
    // Keeps search list limited to 10
    for(let i = 0; i < 10; i++){ 
        var movieListItem = document.createElement("div");
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add("search-list-item");
        if(movies[i].Poster != "N/A"){
            var moviePoster = movies[i].Poster;
        } else {
            // Download a "image not found" placeholder
            moviePoster = "#.jpg";
        }

            movieListItem.innerHTML = `
            <div class="search-item-thumbnail">
            <img src="${moviePoster}" />
            </div>
            <div class="search-item-info">
                <h3>${movies[i].Title}</h3>
                <p>${movies[i].Year}</p>
            </div>
            `;
            console.log(movieListItem);
            searchList.appendChild(movieListItem);
    }
}

// Call Functions
findMovies();
loadMovies("Black Panther");

// Event Listeners
movieSearchBox.addEventListener("keyup", findMovies);
movieSearchBox.addEventListener("keyup", loadMovies);
movieSearchBox.addEventListener("click", findMovies);