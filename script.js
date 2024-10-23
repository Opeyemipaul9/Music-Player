const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let isPlaying = false;

// Music 
const songs =[
    {
        name:'jacinto-1',
        display:'Electric Chill machine',
        artist: 'Jacinto Design'
         
    },
    {
        name: 'jacinto-2',
        display: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'

    },
    {
        name: 'jacinto-3',
        display: 'Goodnight, Disco Queen',
        artist: ' Jacinto Design'
    },
    {
        name: 'metric-1',
        display: 'Front Row (Remix)',
        artist:'Metric / Jacinto Design'
    } 

]

// Play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}


// Play and Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update Dom

function loadSong(song){
    title.textContent = song.display;
    artist.textContent= song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;

}

let songIndex = 0;

function prevSong(){
    songIndex--;
    if(songIndex < 0 ){
        songIndex = songs.length -1;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}


function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    console.log(songIndex);
    loadSong(songs[songIndex]);
    playSong();

}



// OnLoad- Seelect first Song


// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);