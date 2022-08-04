// Declare Variables for Form
var formEl = document.querySelector("#form");
var buttonEl = document.querySelector("#button");
var searchBarEl = document.querySelector("#search-input")

function handleSearchFormSubmit(event){
    event.preventDefault();

    var searchInputVal = document.querySelector("#search-input").value.trim();
    var formatInputVal = document.querySelector("#format-input").value;
    
    if(!searchInputVal){
        console.error("please input a valid movie or game")
        return;
    }

    var queryString = "./search-results.html?q=" + searchInputVal + "&format=" + formatInputVal;
    location.assign(queryString);
};

// Event listeners
formEl.addEventListener("submit", handleSearchFormSubmit);

// Declare Variables 

const gameApiKey = "e74f1531c0f74b7db40ea409fea58784";
const movieApiKey = "c23741a3";

// Fetch request for Games 
fetch("https://rawg.io/api/games?search=" + "animal-crossing" + "&key=" + gameApiKey, {
    method: "GET"
}).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data.results[0]);
    window.localStorage.setItem('game', JSON.stringify(data.results[0]))
});


// Fetch request for Movies     
fetch("http://www.omdbapi.com/?t=deadpool&apikey=" + movieApiKey, {
    method: "GET"
}).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
    window.localStorage.setItem('movie', JSON.stringify(data));
});

function displayPreviousRecs() {
    var movie = JSON.parse(window.localStorage.getItem('movie'));
    
    document.querySelector('#mTitle').textContent = "Title: " + movie.Title;
    document.querySelector('#mRelease').textContent = "Release: " + movie.Released;
    document.querySelector('#mDirector').textContent = "Director: " + movie.Director;
    document.querySelector('#mActors').textContent = "Actors: " + movie.Actors;
    document.querySelector('#mIMDbRating').textContent = "IMDB: " + movie.Ratings[0].Value;
    document.querySelector('#mRTRating').textContent = "Rotten Tomatoes: " + movie.Ratings[1].Value;
    document.querySelector('#mMCRating').textContent = "Metacritic: " + movie.Ratings[2].Value;
    document.querySelector('#mPlot').textContent = "Plot: " + movie.Plot;

    var mPoster = movie.Poster;
    document.querySelector('#mPoster').setAttribute('src', mPoster);

    var game = JSON.parse(window.localStorage.getItem('game'));

    document.querySelector('#gTitle').textContent = "Title: " + game.name;
    document.querySelector('#gRelease').textContent = "Release: " + game.released;
    document.querySelector('#gESRB').textContent = "Age Rating: " + game.esrb_rating.name;
    document.querySelector('#gMCRating').textContent = "Metacritic: " + game.metacritic;
    document.querySelector('#gGenres').textContent = "Genres: " + game.genres[0].name + ", " + game.genres[1].name + ", " + game.genres[2].name;

    var gPoster = game.background_image;
    document.querySelector('#gPoster').setAttribute('src', gPoster)
}

displayPreviousRecs();