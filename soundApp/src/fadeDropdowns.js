const fadeTypeDropdown = document.getElementById('fadeDropdown');
const fadeDurationInput = document.getElementById('fadeDurationInput');

const fadeTypeDropdownVoice = document.getElementById('fadeDropdownVoice');
const fadeDurationInputVoice = document.getElementById('fadeDurationInputVoice');



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

// TODO: make this work in a sacalable
function setFadeEvents(fadeTypeDropdown, fadeDurationInput, type, duration) {
    fadeDurationInput.onchange = function() {
        localStorage.setItem(fadeDurationInput.id, fadeDurationInput.value);
    }
    
    fadeTypeDropdown.onchange = function () {
        localStorage.setItem(fadeTypeDropdown.id, fadeTypeDropdown.value);
    }
}

setDefaultValues();

window.onload = function () {
    getLocalStorageValues();
}