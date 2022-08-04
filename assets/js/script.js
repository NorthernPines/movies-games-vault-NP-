// Declare Variables for Form
var formEl = document.querySelector("#form");
var buttonEl = document.querySelector("#button");
var searchBarEl = document.querySelector("#search-input")
// Declare keys 

const gameApiKey = "e74f1531c0f74b7db40ea409fea58784";
const movieApiKey = "c23741a3";

// Creating genre vars for filtering
var genre1;
var genre2;
var genre3;
// Event listeners
formEl.addEventListener("submit", handleSearchFormSubmit);

//Functions

// initial fetch -> setGenres -> filterGenre x3 -> randomRecommendation

function recommendGame() {
    setGenres();
    filterGenre(genre1);
    filterGenre(genre2);
    filterGenre(genre3);
    randomRecommendation();
}
// https://api.rawg.io/api/games?genre=action&key=e74f1531c0f74b7db40ea409fea58784&page=2
// 'https://api.rawg.io/api/games?genre=' + genre + '&key=' + gameApiKey + '&page=' number'

function randomRecommendation() {
    let randomGenre = Math.floor(Math.random() * 3);
    let randomNum = Math.floor(Math.random() * 10) + 1;
    let genreArray = [genre1,genre2,genre3];
    fetchGameFromGenre(genreArray[randomGenre],randomNum);
}

function fetchGameFromGenre(genre,pageNumber) {
    fetch('https://api.rawg.io/api/games?genre=' + genre + '&key=' + gameApiKey + '&page=' + pageNumber)
    .then(function(response){
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    }).then(function(recommendation){
        console.log(recommendation);
        let gameTitle =  recommendation.results[0].slug;
        console.log(gameTitle);
        console.log('https://rawg.io/api/games?search=' + gameTitle + '&key=' + gameApiKey);
        fetch('https://rawg.io/api/games?search=' + gameTitle + '&key=' + gameApiKey)
    .then(function(response){
        if (!response.ok) {
            throw response.json();
        }
        return response.json();
    }).then(function(finalRec){
        console.log(finalRec);
    })
    })
}

function filterGenre(filteredGenre) {
    let gameGenres = [ 'Arcade' ,  'Educational' , 'Casual' , 'Board Games' , 'Educational' ,
     'Indie' ,  'RPG' , 'Puzzle' , 'Adventure' , 'Simulation' ,'Massively-Multiplayer' ,
      'Platformer' , 'Puzzle' ,  'Strategy' , 'Card' , 'Indie' , 'Sports' , 'Massively-Multiplayer' ,
       'Racing' , 'Shooter' , 'Shooter'];
    let movieGenres = ["Animation" , "Biography" , "Comedy" , "Crime" , "Documentary" ,
     "Drama" ,  "Fantasy" , "Film Noir" , "History"  ,  "Horror" , "Music" , "Musical" ,
      "Mystery" , "Romance" ,  "Sci-Fi" , "Short" , "Sport" , "Superhero" , "Thriller" ,
       "War" , "Western"];
    
    for (i = 0; i < gameGenres.length; i++) {
        if (filterGenre == movieGenres[i]) {
            filterGenre = gameGenres[i];
        }
    }
}

function setGenres() {
        let gameInfo = JSON.parse(window.localStorage.getItem('game'));
        genre1 = gameInfo.genres[0].name;
        genre2 = gameInfo.genres[1].name;
        genre3 = gameInfo.genres[2].name;
}

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




// Fetch request for Games 
fetch("https://rawg.io/api/games?search=" + "animal-crossing" + "&key=" + gameApiKey, {
    method: "GET"
}).then(function(response){
    return response.json();
}).then(function(data){
    window.localStorage.setItem('game', JSON.stringify(data.results[0]))
});


// Fetch request for Movies     
fetch("http://www.omdbapi.com/?t=deadpool&apikey=" + movieApiKey, {
    method: "GET"
}).then(function(response){
    return response.json();
}).then(function(data){
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

// displayPreviousRecs();
recommendGame();