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
});