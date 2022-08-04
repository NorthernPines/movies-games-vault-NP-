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
    // Fetch URL
    // fetch(movieTitlesUrl)
    // .then((response) => response.json()) 
    // .then((data) => console.log(data));

    // fetch(movieTitlesUrl)
    // .then(function(response){
    //     if(!response.ok){
    //         throw response.json();
    //     }
    //     return response.json();
    // }).then(function(movieResults){
    //     console.log(movieResults);
    // }); 
    // if(DataTransfer.Response === "True"){
    //     displayMovieList(data.Search);
    // };

    fetch(movieTitlesUrl)
    .then(function (response){
        if (response.ok) {
            console.log(response);
            response.json()
            .then(function (data){
                console.log(data);
            })
        }
    })
    displayMovieList(data.Search);
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
    searchList.innerHTML = "";
    for(let i = 0; i < movies.length; i++){
        var movieListItem = document.createElement("div");
        console.log(movieListItem);
        movieListItem.dataset.id = movies[i].imdbID;
        movieListItem.classList.add("search-list-item");
        if(movies[i].Poster != "N/A"){
            var moviePoster = movies[i].Poster;
        } else {
            // Download a "image not found" placeholder
            moviePoster = "#.jpg";

            movieListItem.innerHTML = `
            <div class="search-item-thumbnail">
            <img src="${moviePoster}" />
            </div>
            <div class="search-item-info">
                <h3>${movies[i].Title}</h3>
                <p>${movies[i].Year}</p>
            </div>
            `;

            searchList.appendChild(movieListItem);
        }
    }
}

findMovies();
loadMovies("Black Panther");

movieSearchBox.addEventListener("keyup", findMovies);
movieSearchBox.addEventListener("keyup", loadMovies);
movieSearchBox.addEventListener("click", findMovies);