var album = document.getElementById("album");

// Students must use JavaScript to create arrays, modify them (using only the following methods:
// join, push, reverse, sort, concat and unshift), and output lists to the DOM.
// Songs array
var songs = ["Diamonds", "Let Love Win", "Transformed", "God Is On The Move", "Dear Younger Me", "Evidence", "Made New", "Tase The Feeling", "You Are I am", "I Can Only Image"];

// Artist array
var artist = ["Hawk Nelson", "Carrollton", "Shonlock", "7eventh Time Down", "MercyMe", "Citizen Way", "Lincoln Brewster", "Conrad Sewell", "Mariah Carey", "Kallie Leggett"];

// Albums array
var albums = ["muse Sick-N-Hour Mess Age", "B-Day", "Who Will Cut Our Hair When We're Gone?", "Miss E...", "Big Willie Style", "Chocolate Factory",
 "The Spaghetti Incident", "Me, I Am Mariah", "Kisses On The Bottom", "Allow Us To Be Frank"];

// Clear the id album
album.innerHTML = "";

// 1. Each student must add one song to the beginning and the end of the array.
// add to last position of the array
// songs.push("The Logical Song > by Justin Leggett on the album Breakfast in Murfreesboro");

// add to the front of the array
// songs.unshift("The Logical Song > by Katie Leggett on the album Breakfast in Murfreesboro");

// 2. Loop over the array and remove any words or characters that obviously don't belong.
for(var i = 0; i < songs.length; i++) {
    songs[i] = songs[i].replace(/[* @ ( ) !]/g," ");

// 3. Students must find and replace the > character in each item with a - character.
    songs[i] = songs[i].replace(/>/g,"-");

    displaySong(album, songs[i] + " - by " + artist[i] + " on the album " + albums[i] );
}

function displaySong(outputField, song) {
    var styledSong = '<h3>' + song + '</h3>';
    outputField.innerHTML += styledSong;
}

function addSongToArrayandDisplay(songName, artistName, albumName) {
    songs.push(songName + " - by " + artistName + " on the album " + albumName);
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
















