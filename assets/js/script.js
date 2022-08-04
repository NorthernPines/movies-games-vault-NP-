// Declare Variables for Form
var formEl = document.querySelector("#form");
var buttonEl = document.querySelector("#button");
var searchBarEl = document.querySelector("#search-input")

// Creating genre vars for filtering
var genre1;
var genre2;
var genre3;

//Functions

function filterGenre(filteredGenre) {
    let gameGenres = [ 'Arcade' ,  'Educational' , 'Casual' , 'Board Games' , 'Educational' ,
     'Indie' ,  'RPG' , 'Puzzle' , 'Adventure' , 'Simulation' ,'Massively-Multiplayer' ,
      'Platformer' , 'Puzzle' ,  'Strategy' , 'Card' , 'Indie' , 'Sports' , 'Massively-Multiplayer' ,
       'Racing' , 'Shooter' , 'Shooter'];
    let movieGenres = ["Animation" , "Biography" , "Comedy" , "Crime" , "Documentary" ,
     "Drama" ,  "Fantasy" , "Film Noir" , "History"  ,  "Horror" , "Music" , "Musical" ,
      "Mystery" , "Romance" ,  "Sci-Fi" , "Short" , "Sport" , "Superhero" , "Thriller" ,
       "War" , "Western"];
    if (choice === true){
        for (i = 0; i < gameGenres.length; i++) {
            if (filterGenre == movieGenres[i]) {
                filterGenre = gameGenres[i];
            }
        }
    } else {
        for (i = 0; i < movieGenres.length; i++) {
            if (filterGenre == gameGenres[i]) {
                filterGenre = movieGenres[i];
            }
        }
    }
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

// Event listeners
formEl.addEventListener("submit", handleSearchFormSubmit);

// Declare Variables 

const gameApiKey = "e74f1531c0f74b7db40ea409fea58784";
const movieApiKey = "c23741a3";


function storeLocal (storeMe, type) {
    
    if (type == 'game') {
        window.localStorage.setItem('game', JSON.stringify(storeMe.results[0]));
    } else {
        window.localStorage.setItem('movie', JSON.stringify(storeMe));
    }
    
}
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
    // getting last movie from local storage
    var movie = JSON.parse(window.localStorage.getItem('movie'));

    // displaying movie information of last saved movie 
    document.querySelector('#mTitle').textContent = "Title: " + movie.Title;
    document.querySelector('#mRelease').textContent = "Release: " + movie.Released;
    document.querySelector('#mDirector').textContent = "Director: " + movie.Director;
    document.querySelector('#mActors').textContent = "Actors: " + movie.Actors;
    document.querySelector('#mIMDbRating').textContent = "IMDB: " + movie.Ratings[0].Value;
    document.querySelector('#mRTRating').textContent = "Rotten Tomatoes: " + movie.Ratings[1].Value;
    document.querySelector('#mMCRating').textContent = "Metacritic: " + movie.Ratings[2].Value;
    document.querySelector('#mPlot').textContent = "Plot: " + movie.Plot;

    // setting the source of the poster to the link that was fetched with the movie
    var mPoster = movie.Poster;
    document.querySelector('#mPoster').setAttribute('src', mPoster);

    // getting last game from local storage
    var game = JSON.parse(window.localStorage.getItem('game'));

    // displaying game information of last saved game
    document.querySelector('#gTitle').textContent = "Title: " + game.name;
    document.querySelector('#gRelease').textContent = "Release: " + game.released;
    document.querySelector('#gESRB').textContent = "Age Rating: " + game.esrb_rating.name;
    document.querySelector('#gMCRating').textContent = "Metacritic: " + game.metacritic;
    document.querySelector('#gGenres').textContent = "Genres: " + game.genres[0].name + ", " + game.genres[1].name + ", " + game.genres[2].name;

    // setting the source of the poster to the link fetched with the game
    var gPoster = game.background_image;
    document.querySelector('#gPoster').setAttribute('src', gPoster)
}

displayPreviousRecs();