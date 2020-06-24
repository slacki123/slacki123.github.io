// should iterate over all audios here
let audioEnded = false;
initAudioEvents(birdsAudio, birdSounds, birdsText);
initAudioEvents(voiceAudio, voiceSounds, voiceText);

async function playAudio(myAudio, text) {
    myAudio.play();
    const source = myAudio.getAttribute('src');
    text.innerHTML = 'Playing: ' + source;
}

function stopAudio(myAudio, text) {
    myAudio.pause();
    myAudio.currentTime = 0;
    text.innerHTML = 'Audio Ended';
}

function initAudioEvents(myAudio, soundTracks, text) {
    myAudio.onended = function () {
        audioEnded = true; // just so the fade only works after at least one audio ended
        console.log('audio ended');
        const randomSound = soundTracks[Math.floor((Math.random() * soundTracks.length))];
        myAudio.setAttribute('src', randomSound);
        myAudio.play();
        console.log('Playing: ', randomSound);
        text.innerHTML = 'Playing: ' + randomSound;
    }
    
    myAudio.onloadeddata = async function () {
        console.log('data loaded');
        console.log('Not first audio', audioEnded);
    
        if (audioEnded === true) {
            const fadeDuration = fadeDurationInput.value || 2000;
            fadeBetweenSounds(myAudio, fadeDuration);
        }
    }
}
