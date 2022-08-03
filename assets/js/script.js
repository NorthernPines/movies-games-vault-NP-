// Request Links 

// RawG
// https://api.rawg.io/api/platforms?key=YOUR_API_KEY 

// OMDB 
// https://www.omdbapi.com/?i=tt3896198&apikey=
// OMDB Posters
// https://img.omdbapi.com/?apikey=[yourkey]&

// Declare Variables 

const gameApiKey = "e74f1531c0f74b7db40ea409fea58784";
const movieApiKey = "c23741a3";

// TODO: Find parameter for users to search by title
// Fetch request for Games 
fetch("https://api.rawg.io/api/platforms?key=" + gameApiKey, {
    method: "GET"
}).then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
});


// Fetch request for Movies     
// TODO: Want to input user input for title after "t=" (Parameter for users to search by title)
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
    console.log(movie.Title);
    document.querySelector('#title').textContent = "Title: " + movie.Title;
    document.querySelector('#year').textContent = "Year: " + movie.Year;
    document.querySelector('#director').textContent = "Director: " + movie.Director;
    document.querySelector('#actors').textContent = "Actors: " + movie.Actors;
    document.querySelector('#imdbRating').textContent = "IMDB: " + movie.Ratings[0].Value;
    document.querySelector('#rtRating').textContent = "Rotten Tomatoes: " + movie.Ratings[1].Value;
    document.querySelector('#mcRating').textContent = "Metacritic: " + movie.Ratings[2].Value;


    var game = JSON.parse(window.localStorage.getItem('game'));

}

displayPreviousRecs();