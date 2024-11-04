const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress  = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let isPlaying = false;

// Music 
const songs =[
    {
        name:'Brent',
        display:'Been Away',
        artist: 'Brent Faiyaz',
        image: 'away'
         
    },
    {
        name: 'Drake',
        display: 'Slime you Out',
        artist: 'Drake ft Sza',
        image: 'Drake'

    },
    {
        name: 'J cole',
        display: 'Port Antonio',
        artist: 'J cole',
        image: 'jcole'
    },
    {
        name: 'Jhene',
        display: 'The Worst',
        artist:'Jhene Aiko',
        image: 'jhene',
    }, 
    {
        name: 'Wizkid',
        display: 'Piece of my Heart',
        artist : 'Wizkid ft Brent Faiyaz',
        image: 'wizkid'
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


// Update Dom

function loadSong(song){
    title.textContent = song.display;
    artist.textContent= song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.image}.jpg`;
    
}

let songIndex = 0;

function prevSong(){
    songIndex--;
    if(songIndex < 0 ){
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
    
}

function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
    
}

// OnLoad- Select first Song
loadSong(songs[songIndex]);

// Update Progress Bar & Time
function updateProgressBar(e){
    
    if(isPlaying){
        const {duration,currentTime} = e.srcElement;

        // Update Progress Bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`; 

        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10 ){
            durationSeconds = `0${durationSeconds}`;
        }
        
        // Delay switching duration element to avoid Nan
        if(durationSeconds){
            durationEl.textContent= `${durationMinutes}:${durationSeconds}`;
        }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime/ 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10 ){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        
    }
}

// Set Progress Bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX/width) * duration; 
}


// Play and Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate',updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);