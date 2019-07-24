// REQUIRE .ENV
require("dotenv").config();

// REQUEST
const request = require("request");

// AXIOS
const axios = require("axios");

// FS
const fs = require("fs");

// KEYS
var keys = require("./keys.js");

// SPOTIFY
const Spotify = require("node-spotify-api");

// MOMENT
const moment = require("moment");

// USER ARGUMENTS
const userCommand = process.argv[2];

// USER SEARCH
const userInput = process.argv.slice(3).join(" ");

const spotifyKeys = new Spotify({ 
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
});

//USE SWITCH TO EXECUTE CODE
function liriStart(userCommand, userInput) {
  switch (userCommand) {
    case "concert-this":
      getBandsInTown(userInput);
      break;
    case "spotify-this":
      getSpotify(userInput);
      break;
    case "movie-this":
      getOMDB(userInput);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    //default: console.log("I am lost");
    // break;
  }
}

// SEARCH BANDS IN TOWN

function getBandsInTown(artist) {
  let bandURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=T_battle";

  axios.get(bandURL).then(function(res) {
    console.log(res)
    console.log("Name of Artist: " + artist + "\n");
    console.log("Venue Name: " + res.data[0].venue.name + "\n");
    console.log(
      "Event Date: " + moment(res.data[0].datatime).format("MM-DD-YYYY") + "\n"
    );
  });
}

// SPOTIFY
function getSpotify(song) {
  spotifyKeys.search({ type: "track", query: song }, function(err, data) {
    if (err) {
      console.log("Error occurred: " + err);
    }
    console.log(data.tracks)
  });
}

//OMDB
function getOMDB(movie) {
  if (!movie) {
    movie = "Alladin";
  }
  let movieURL = "http://www.omdbapi.com/?t=" + movie + "&apikey=bd5033bd";

  axios.request(movieURL).then(function(res) {
    console.log("Movie Title: " + res.data.Title + "\n");
    console.log("Rating: " + res.data.imdbRating + "\n");
    console.log("Release Year: " + res.data.Year + "\n");
  });
}

liriStart(userCommand, userInput);
