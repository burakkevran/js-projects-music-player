const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationText = document.getElementById('duration');
const currentTimeText = document.getElementById('current-time');

const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

const trackList = [
  {
    name:'jacinto-1',
    title:'Electric Chill Machine',
    artist:'Jacinto',
  },
  {
    name:'jacinto-2',
    title:'Seven Nation Army (Remix)',
    artist:'Jacinto',
  },
  {
    name:'jacinto-3',
    title:'Goodnight, Disco Queen',
    artist:'Jacinto',
  },
  {
    name:'metric-1',
    title:'Front Row (Remix)',
    artist:'Metric / Jacinto',
  },
];

let isPlaying = false;
let trackCounter = 0;

function playSong() {
  music.play();
  isPlaying = true;
  playButton.classList.replace('fa-play-circle', 'fa-pause-circle');
  playButton.setAttribute('title', 'Pause');
}

function pauseSong() {
  music.pause();
  isPlaying = false;
  playButton.classList.replace('fa-pause-circle', 'fa-play-circle');
  playButton.setAttribute('title', 'Play');
}

function prevSong() {
  trackCounter = (trackCounter -1 + trackList.length) % trackList.length;
  loadSong(trackList[trackCounter]);
  playSong();
}

function nextSong() {
  trackCounter = trackCounter = (trackCounter + 1 ) % trackList.length;
  loadSong(trackList[trackCounter]);
  playSong();
}

function setProgressBar(event) {
  let percentage = Math.floor(((event.offsetX) / event.srcElement.clientWidth) * 100);
  let actualTime = Math.floor( (percentage / 100) * music.duration);
  progress.style.width = `${percentage}%`;
  music.currentTime = actualTime;
}

function updateProgressBar(event) {

  if(isPlaying) {
    const {currentTime, duration} = event.target;
    durationText.textContent = returnMinSec(duration);
    currentTimeText.textContent = returnMinSec(currentTime);
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    if(progressPercent == 100) {
      setTimeout(nextSong, 1000);
    }
  }
}

function returnMinSec(value){
  let valueMinute = Math.floor(value / 60) || 0;
  let valueSecond = Math.floor(value % 60) || 0;
  return `${valueMinute}:${(valueSecond < 10) ? '0' : ''}${valueSecond}`;
}

playButton.addEventListener('click', () => ( isPlaying ? pauseSong() : playSong()));
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent =song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

loadSong(trackList[trackCounter]);