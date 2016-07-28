var songs = [];
var album = document.getElementById("album");

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";

// Clear the id album
album.innerHTML = "";

// 1. Each student must add one song to the beginning and the end of the array.
// add to last position of the array
songs.push("The Logical Song > by Justin Leggett on the album Breakfast in Murfreesboro");

// add to the front of the array
songs.unshift("The Logical Song > by Katie Leggett on the album Breakfast in Murfreesboro");

// 2. Loop over the array and remove any words or characters that obviously don't belong.
for(var i = 0; i < songs.length; i++) {
    songs[i] = songs[i].replace(/[* @ ( ) !]/g," ");

// 3. Students must find and replace the > character in each item with a - character.
    songs[i] = songs[i].replace(/>/g,"-");

// Add each song to the div 1 at a time
    var styledSong = songs.length[i] =  '<h3>' + songs[i]+ '</h3>';
    document.getElementById("album").innerHTML += styledSong;

}




















