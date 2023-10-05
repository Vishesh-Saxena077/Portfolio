const audio = document.getElementById('backgroundAudio');
const playPauseIcon = document.getElementById('playPauseIcon');

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseIcon.classList.remove('uil-play');
        playPauseIcon.classList.add('uil-pause');
    } else {
        playPauseIcon.classList.remove('uil-pause');
        playPauseIcon.classList.add('uil-play');
        stopAudio();
    }
}

function stopAudio() {
    // Gradually decrease volume over 3 seconds (3000 milliseconds)
    const fadeOutDuration = 3000;
    const fadeOutInterval = 10;
    const initialVolume = audio.volume;

    const intervalId = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume -= (initialVolume / (fadeOutDuration / fadeOutInterval));
        } else {
            audio.pause();
            audio.volume = initialVolume; // Reset volume to initial value
            clearInterval(intervalId);
        }
    }, fadeOutInterval);
}

// Add event listener to handle audio playback state changes
audio.addEventListener('play', function() {
    playPauseIcon.classList.remove('uil-play');
    playPauseIcon.classList.add('uil-pause');
});

audio.addEventListener('pause', function() {
    playPauseIcon.classList.remove('uil-pause');
    playPauseIcon.classList.add('uil-play');
});

// Add event listener to handle the end of audio and loop it
audio.addEventListener('ended', function() {
    audio.currentTime = 0; // Reset the audio to the beginning
    audio.play(); // Start playing again (loop)
});