var album = document.getElementById("album");
var songs = {};
var songs1 = {};
var counter = 0;

// Clear the id album
album.innerHTML = "";

function displaySong(outputField, song) {
    outputField.innerHTML += '<h3>' + '<input type="button" class="delete" value="Delete"> ' + song + '</h3>';
}

function addSongToArrayandDisplay(songName, artistName, albumName) {
    displaySong(album, songName + " - by " + artistName + " on the album " + albumName);
}

function clearInputFields(songNameInput, artistName, albumName) {
    songNameInput.value = "";
    artistName.value = "";
    albumName.value = "";
}

function postSong() {
    var songNameInput = document.getElementById("songNameInput");
    var artistName = document.getElementById("artistName");
    var albumName = document.getElementById("albumName");
    addSongToArrayandDisplay(songNameInput.value, artistName.value, albumName.value);
    clearInputFields(songNameInput, artistName, albumName);
}


function showHidden(event) {
    event.preventDefault();
    var setVis = document.getElementById("setVisibility");
    var songName = document.getElementById("songName");
    var addMusicView = document.getElementById("addMusicView");
    // if visHidden is in className
    if(addMusicView.className.indexOf("visHidden") > -1) {
        setVis.classList.add("visHidden");
        songName.classList.add("visHidden");
        addMusicView.classList.remove("visHidden");
    } else {
        setVis.classList.remove("visHidden");
        songName.classList.remove("visHidden");
        addMusicView.classList.add("visHidden");
        postSong();
    }
}

// When "Add Music" is clicked hide sidebar and song_name and make visible add_music_view
document.getElementById("addMusic").addEventListener("click", showHidden)


// When add is clicked add the song to the array of songs
document.getElementById("addSongButton").addEventListener("click", showHidden)

// When "Delete" button is clicked remove element from the dom
document.getElementById("album").addEventListener("click", function(e) {
    if(e.target.className === "delete") {
        e.target.parentNode.remove();
    }
})

// When "More" is clicked add additional songs
document.getElementById("more").addEventListener("click", function() {
    formatSongs(songs1);
})

function onLoad() {
    // First time through songs is populated 2nd time through songs1 is populated
    if(counter === 1 ) {
        songs1 = JSON.parse(this.responseText);
    } else {
        songs = JSON.parse(this.responseText);
        formatSongs(songs);
        counter++;
    }
}

function onError() {
    console.log("An error occurred while transferring");
}

function formatSongs(songsArray) {
    for(var i = 0; i < songsArray.songs.length; i++) {
        displaySong(album, songsArray.songs[i].title + " - by " + songsArray.songs[i].artist + " on the album " + songsArray.songs[i].album);
    }
}

var songsRequest = new XMLHttpRequest();
songsRequest.addEventListener("load", onLoad);
songsRequest.addEventListener("error", onError)
songsRequest.open("GET", "json/songs.json")
songsRequest.send();

var songs1Request = new XMLHttpRequest();
songs1Request.addEventListener("load", onLoad);
songs1Request.addEventListener("error", onError)
songs1Request.open("GET", "json/songs1.json")
songs1Request.send();
