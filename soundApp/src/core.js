const text = document.getElementById('text');
const fadeTypeDropdown = document.getElementById('fadeDropdown');
const fadeDurationInput = document.getElementById('fadeDurationInput');

const birdsAudio = document.getElementById('birdsAudio');
const birdSounds = [
    'birdSounds/Birds 2.m4a',
    'birdSounds/Birds one cough and fly.m4a',
    'birdSounds/Birds talk at end.m4a',
    'birdSounds/Birds with airplane.m4a',
    'birdSounds/birds with kitchen sounds.m4a',
    'birdSounds/Birds with neighbours talking.m4a',
    'birdSounds/Birds with weird pigeon noise.m4a',
    'birdSounds/Birds from inside.m4a',
    'birdSounds/Birds and a crow.m4a',
    'birdSounds/Birds from inside 2.m4a',
    'birdSounds/Birds airplane 2.m4a',
    'birdSounds/Birds with clearing throat.m4a'
];

const voiceAudio = document.getElementById('voiceAudio');
const voiceSounds = [
    'voiceSounds/test.mp3'
]


setDefaultValues();

window.onload = function () {
    getLocalStorageValues();
}

// should iterate over all audios here
let audioEnded = false;
initAudioEvents(birdsAudio, birdSounds);
initAudioEvents(voiceAudio, voiceSounds);

fadeDurationInput.onchange = function() {
    localStorage.setItem('fadeDuration', fadeDurationInput.value);
}

fadeTypeDropdown.onchange = function () {
    localStorage.setItem('fadeDropdownValue', fadeTypeDropdown.value);
}

function setDefaultValues() {
    fadeTypeDropdown.value = 'squareRoot';
    fadeDurationInput.value = 2000;
}

function getLocalStorageValues() {
    const fadeTypeInStorage = localStorage.getItem('fadeDropdownValue');
    console.log('Fade type in storage: ', fadeTypeInStorage);
    if(fadeTypeInStorage) {
        fadeTypeDropdown.value = fadeTypeInStorage;
    }
    const fadeDurationInStorage = localStorage.getItem('fadeDuration')
    if(fadeDurationInStorage){
        fadeDurationInput.value = fadeDurationInStorage;
    }
}

async function playAudio(myAudio) {
    myAudio.play();
    const source = myAudio.getAttribute('src');
    text.innerHTML = 'Playing: ' + source;
}

function stopAudio(myAudio) {
    myAudio.pause();
    myAudio.currentTime = 0;
    text.innerHTML = 'Audio Ended';
}

function initAudioEvents(myAudio, soundTracks) {
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
