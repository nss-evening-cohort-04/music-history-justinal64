"use strict";
var $album = $("#album");
var songs = [];
var songs1 = [];
var counter = 0;
let uid = "";
let apiKeys = "";

let Auth = require("./Auth/FirebaseAuth");
let Credentials = require("./Credentials/Credentials");
let AddToDb = require("./Todo/Todo");
let User = require("./FBUser/User");

console.log("Auth", Auth);
console.log("Credentials", Credentials);
console.log("AddToDb", AddToDb);
console.log("user", User);

// Clear the id album
$album.html('');

function displaySong(outputField, song) {
    outputField.append('<h3>' + '<input type="button" class="delete" value="Delete"> ' + song + '</h3>');
}

function addSongToArrayandDisplay(songName, artistName, albumName) {
    displaySong($album, songName + " - by " + artistName + " on the album " + albumName);
}

function clearInputFields(songNameInput, artistName, albumName) {
    songNameInput.val("");
    artistName.val("");
    albumName.val("");
}

function postSong() {
    var $songNameInput = $('#songNameInput');
    var $artistName = $("#artistName");
    var $albumName = $("#albumName");
    addSongToArrayandDisplay($songNameInput.val(), $artistName.val(), $albumName.val());
    clearInputFields($songNameInput, $artistName, $albumName);
}

function showHidden(event) {
    event.preventDefault();
    var setVis = $("#setVisibility");
    var songName = $("#songName");
    var addMusicView = $("#addMusicView");
    // if visHidden is in className
    if(addMusicView.hasClass("visHidden")) {
        setVis.addClass("visHidden");
        songName.addClass("visHidden");
        addMusicView.removeClass("visHidden");
    } else {
        setVis.removeClass("visHidden");
        songName.removeClass("visHidden");
        addMusicView.addClass("visHidden");
        postSong();
    }
}

// When "Add Music" is clicked hide sidebar and song_name and make visible add_music_view
$("#addMusic").click(showHidden);


// When add is clicked add the song to the array of songs
$("#addSongButton").click(showHidden);

// When "Delete" button is clicked remove element from the dom
$("#album").click(function(e) {
    if(e.target.className === "delete") {
        e.target.parentNode.remove();
    }
});

// When "More" is clicked add additional songs
$("#more").click(function() {
    formatSongs(songs1);
});

// eventListeners for Login/Register Buttons
$('#login-button').on("click", function() {
    let user = {
        "email": $('#inputEmail').val(),
        "password": $('#inputPassword').val()
    };
    Auth.loginUser(user).then(function(loginResponse) {
        console.log("loginResponse", loginResponse);
        uid = loginResponse.uid;
        // createLogoutButton(); Need to work on userResponse
        $('#login-container').addClass("hide");
        $('.content').removeClass("hidden");
    });
});

// Register User
$('#registerButton').on("click", function() {
    let username = $('#inputUsername').val();
    let user = {
        "email": $('#inputEmail').val(),
        "password": $('#inputPassword').val()
    };

    Auth.registerUser(user).then(function(registerResponse) {
        console.log("register response", registerResponse);
        let uid = registerResponse;
        let newUser = {
            "username": username,
            "uid": registerResponse.uid
        };
        return User.addUser(Credentials.fbCreds(), newUser);
    }).then(function(addUserResponse) {

        return Auth.loginUser(user);
    }).then(function(loginResponse) {
        console.log("loginResponse", loginResponse);
        uid = loginResponse.uid;
        // createLogoutButton();
        // putTodoInDOM();
        $('#login-container').addClass("hide");
        $('.zip').removeClass("hidden");
    });
});

function createLogoutButton() {
    User.getUser(apiKeys, uid).then(function(userResponse) {
        $('#logout-container').html("");
        console.log("userResponse", userResponse);
        // let currentUsername = userResponse.username;
        // let logoutButton = `<button class="btn btn-danger" id="logoutButton">LOGOUT ${currentUsername}</button>`;
        // $('#logout-container').append(logoutButton);
    });
}

// Get firebase key
$(document).ready(function(){
    Credentials.credentials().then(function(keys){
        apiKeys = keys;
        firebase.initializeApp(apiKeys);
    });
});

function onError() {
    console.log("An error occurred while transferring");
}

function formatSongs(songsArray) {
    for(var i = 0; i < songsArray.songs.length; i++) {
        displaySong($album, songsArray.songs[i].title + " - by " + songsArray.songs[i].artist + " on the album " + songsArray.songs[i].album);
    }
}

$.ajax({
    url: "json/songs.json"
}).done(function (data) {songs = data; formatSongs(songs);});


$.ajax({
    url: "json/songs1.json"
}).done(function (data) {songs1 = data; });



