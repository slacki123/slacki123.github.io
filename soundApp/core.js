const text = document.getElementById('text');
const myAudio = document.getElementById('myAudio');
const fadeTypeDropdown = document.getElementById('fadeDropdown');
const myAudioSounds = [
    'birdSounds/Birds.m4a',
    'birdSounds/Birds 2.m4a',
    'birdSounds/Birds one cough and fly.m4a',
    'birdSounds/Birds talk at end.m4a',
    'birdSounds/Birds with airplane.m4a',
    'birdSounds/birds with kitchen sounds.m4a',
    'birdSounds/Birds with neighbours talking.m4a',
    'birdSounds/Birds with weird pigeon noise.m4a'
];

async function playAudio() {
    myAudio.play();
    const source = myAudio.getAttribute('src');
    text.innerHTML = 'Playing: ' + source;
}

function stopAudio() {
    myAudio.pause();
    myAudio.currentTime = 0;
    text.innerHTML = 'Audio Ended';
}

window.onload = function () {
    const fadeTypeInStorage = localStorage.getItem('fadeDropdownValue');
    console.log('Fade type in storage: ', fadeTypeInStorage);
    if(fadeTypeInStorage) {
        fadeTypeDropdown.value = fadeTypeInStorage;
    }
}

let audioEnded = false;
myAudio.onended = function () {
    audioEnded = true; // just so the fade only works after at least one audio ended
    console.log('audio ended');
    const randomSound = myAudioSounds[Math.floor((Math.random() * myAudioSounds.length))];
    myAudio.setAttribute('src', randomSound);
    myAudio.play();
    console.log('Playing: ', randomSound);
    text.innerHTML = 'Playing: ' + randomSound;
}

myAudio.onloadeddata = async function () {
    console.log('data loaded');
    console.log('Not first audio', audioEnded);
    const fadeDropdownValue = fadeTypeDropdown.value;

    if (audioEnded === true && fadeDropdownValue && fadeDropdownValue != null) {
        localStorage.setItem('fadeDropdownValue', fadeDropdownValue);
        console.log('fade dropdown value: ', fadeDropdownValue)
        const fadeDuration = 2000;
        fadeBetweenSounds(myAudio, fadeDuration);
    }
}