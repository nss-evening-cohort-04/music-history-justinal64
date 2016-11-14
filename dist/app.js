(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function loginUser(credentials){
    return new Promise((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
}

function credentialsCurrentUser(){
    return firebase.auth().currentUser;
}

function logoutUser(){
    firebase.auth().signOut();
}

function registerUser(credentials){
    console.log("credentials", credentials);
    return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((authData) =>{
          resolve(authData);
        })
        .catch((error)=>{
          reject(error);
        });
    });
}

let fbAuth = {
  registerUser, loginUser, logoutUser, credentialsCurrentUser
};

module.exports = fbAuth;

},{}],2:[function(require,module,exports){
'use strict';

function credentials() {
    return new Promise((resolve, reject) => {
        $.ajax({
            method: 'GET',
            url: `../../apiKeys.json`
        }).then((response)=>{
            resolve(response);
        }, (error)=>{
            reject(error);
        });
    });
}


let Credentials = {
  credentials
};

module.exports = Credentials;
},{}],3:[function(require,module,exports){
'use strict';

function addUser(apiKeys, newUser) {
    return new Promise((resolve, reject) => {
        console.log("apiKeys", apiKeys);
        $.ajax({
            method:  'POST',
            url:`${apiKeys.databaseURL}/users.json`,
            data: JSON.stringify(newUser),
            dataType: 'json'
        }).then((response) => {
            console.log("response from POST", response);
            resolve(response);
        }, (error) => {
            reject(error);
        });
    });
}

function getUser(apiKeys, uid) {
    return new Promise((resolve, reject) => {
        $.ajax({
        method:  'GET',
        url:`${apiKeys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
        }).then((response) => {
            let users = [];
            Object.keys(response).forEach(function(key){
                response[key].id = key;
                users.push(response[key]);
        });
            resolve(users[0]);
        }, (error) => {
            reject(error);
        });
    });
}

let user = {
  addUser, getUser
};

module.exports = user;
},{}],4:[function(require,module,exports){
'use strict';

function addTodo(apiKeys, newItem){
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'POST',
            url:`${apiKeys.databaseURL}/items.json`,
            data: JSON.stringify(newItem),
            dataType: 'json'
          }).then((response) => {
            resolve(response);
          }, (error) => {
            reject(error);
        });
    });
}

function deleteTodo(apiKeys, id){
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'DELETE',
            url:`${apiKeys.databaseURL}/items/${id}.json`
            }).then((response) => {
            resolve(response);
            }, (error) => {
            reject(error);
        });
    });
}

function editTodo(apiKeys, itemId, editedItem){
    return new Promise((resolve, reject) => {
    $.ajax({
        method:  'PUT',
        url:`${apiKeys.databaseURL}/items/${itemId}.json`,
        data: JSON.stringify(editedItem),
        dataType: 'json'
        }).then((response) => {
        resolve(response);
        }, (error) => {
            reject(error);
        });
    });
}

function getTodos(apiKeys){
    return new Promise((resolve, reject) => {
        $.ajax({
            method:  'GET',
            url:`${apiKeys.databaseURL}/items.json`
        }).then((response) => {
            let items = [];
            Object.keys(response).forEach(function(key){
            response[key].id = key;
            items.push(response[key]);
            });
            resolve(items);
        }, (error) => {
            reject(error);
        });
    });
}

let todo = {
  addTodo, deleteTodo, editTodo, getTodos
};

module.exports = todo;
},{}],5:[function(require,module,exports){
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




},{"./Auth/FirebaseAuth":1,"./Credentials/Credentials":2,"./FBUser/User":3,"./Todo/Todo":4}]},{},[5]);
