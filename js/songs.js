var $album = $("#album");
var songs = [];
var songs1 = [];
var counter = 0;

// Clear the id album
$album.html('');

function displaySong(outputField, song) {
    outputField.append('<h3>' + '<input type="button" class="delete" value="Delete"> ' + song + '</h3>');
}

function addSongToArrayandDisplay(songName, artistName, albumName) {
    displaySong($album, songName + " - by " + artistName + " on the album " + albumName);
}

function clearInputFields(songNameInput, artistName, albumName) {
    songNameInput.value = "";
    artistName.value = "";
    albumName.value = "";
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
})

// When "More" is clicked add additional songs
$("#more").click(function() {
    formatSongs(songs1);
})

function onLoad() {
    // First time through songs is populated, 2nd time through songs1 is populated
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
        displaySong($album, songsArray.songs[i].title + " - by " + songsArray.songs[i].artist + " on the album " + songsArray.songs[i].album);
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
// $(document).ready(function() {
// $.ajax({
//         url: "json/songs.json",
//         success: function(data) {
//             console.log("songs array", data);
//             songs.push(this);
//         }
//     });

// $.ajax({
//         url: "json/songs1.json",
//         success: function(data) {
//             console.log("songs1 array", data);
//             songs1.push(this);
//         }
//     });

// console.log("songs array = ", songs);
// console.log("songs1 array = ", songs1);
// });


