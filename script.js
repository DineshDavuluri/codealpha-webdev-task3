const playButton = document.getElementById('play-btn');
const audioPlayer = document.getElementById('audio-player');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

let songs = [
  { title: "Song 1", artist: "Artist 1", src: "music/song1.mp3", cover: "images/cover1.jpg", color: "violet" },
  { title: "Song 2", artist: "Artist 2", src: "music/song2.mp3", cover: "images/cover2.jpg", color: "indigo" },
  { title: "Song 3", artist: "Artist 3", src: "music/song3.mp3", cover: "images/cover3.jpg", color: "blue" }
];

let currentSongIndex = 0;

// Initialize first song details
updateSongDetails();

// Event listeners for play/pause functionality
playButton.addEventListener('click', togglePlayPause);

// Event listeners for the progress bar
audioPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('input', changeProgress);

// Event listeners for volume control
volumeBar.addEventListener('input', changeVolume);

// Event listeners for next and previous buttons
nextButton.addEventListener('click', nextSong);
prevButton.addEventListener('click', prevSong);

function togglePlayPause() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playButton.innerHTML = '&#10074;&#10074;'; // Pause icon
  } else {
    audioPlayer.pause();
    playButton.innerHTML = '&#9654;'; // Play icon
  }
}

function updateProgress() {
  const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.value = progress;
}

function changeProgress() {
  const newTime = (progressBar.value / 100) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
}

function changeVolume() {
  audioPlayer.volume = volumeBar.value / 100;
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongDetails();
  audioPlayer.src = songs[currentSongIndex].src;
  audioPlayer.play();
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongDetails();
  audioPlayer.src = songs[currentSongIndex].src;
  audioPlayer.play();
}

function updateSongDetails() {
  const song = songs[currentSongIndex];
  document.getElementById('song-title').innerText = song.title;
  document.getElementById('artist-name').innerText = song.artist;
  document.querySelector('.album-cover').src = song.cover;
  audioPlayer.src = song.src;

  // Change background color for the current song
  document.body.style.backgroundColor = song.color;
}
