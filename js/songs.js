var album = document.getElementById("album");
var songs = {};
var songs1 = {};

// Students must use JavaScript to create arrays, modify them (using only the following methods:
// join, push, reverse, sort, concat and unshift), and output lists to the DOM.
// Songs array
// var songs = ["Diamonds", "Let Love Win", "Transformed", "God Is On The Move", "Dear Younger Me", "Evidence", "Made New", "Tase The Feeling", "You Are I am", "I Can Only Image"];

// // Artist array
// var artist = ["Hawk Nelson", "Carrollton", "Shonlock", "7eventh Time Down", "MercyMe", "Citizen Way", "Lincoln Brewster", "Conrad Sewell", "Mariah Carey", "Kallie Leggett"];

// // Albums array
// var albums = ["muse Sick-N-Hour Mess Age", "B-Day", "Who Will Cut Our Hair When We're Gone?", "Miss E...", "Big Willie Style", "Chocolate Factory",
//  "The Spaghetti Incident", "Me, I Am Mariah", "Kisses On The Bottom", "Allow Us To Be Frank"];

// Clear the id album
album.innerHTML = "";

// // 2. Loop over the array and remove any words or characters that obviously don't belong.
// for(var i = 0; i < songs.length; i++) {
//     songs[i] = songs[i].replace(/[* @ ( ) !]/g," ");

// // 3. Students must find and replace the > character in each item with a - character.
//     songs[i] = songs[i].replace(/>/g,"-");

//     displaySong(album, songs[i] + " - by " + artist[i] + " on the album " + albums[i] );
// }

function displaySong(outputField, song) {
    var styledSong = '<h3>' + '<input type="button" class="delete" value="Delete"> ' + song + '</h3>';
    outputField.innerHTML += styledSong;
}

function addSongToArrayandDisplay(songName, artistName, albumName) {
    // songs.push(songName + " - by " + artistName + " on the album " + albumName);
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
document.getElementById("album").addEventListener("click", function(e) { //.getElementsByTagName("input")
    e.target.parentNode.remove();
})

// var x = document.getElementById("album").getElementsByTagName("input");
// console.log("x.length = ", x.length);
// console.log("x = ", x);
// document.getElementsByClassName("delete").forEach(function() {
//     console.log("test");
// });
// console.log(all.length);
// for(var i = 0; i < all.length; i++)
// {
//     alert(all[i].innerHTML);
// }
// When "More" is clicked add additional songs
document.getElementById("more").addEventListener("click", function() {
    // console.log(songs1);
    formatSongs(songs1);
})

function onLoad() {
    songs = JSON.parse(this.responseText);
    formatSongs(songs);
}

function onLoadOne() {
    songs1 = JSON.parse(this.responseText);
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
// fix before submitting
songs1Request.addEventListener("load", onLoadOne);
songs1Request.addEventListener("error", onError)
songs1Request.open("GET", "json/songs1.json")
songs1Request.send();













