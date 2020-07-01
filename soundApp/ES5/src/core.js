var birdSounds = ['audio/birdSounds/Birds 2.m4a', 'audio/birdSounds/Birds one cough and fly.m4a', 'audio/birdSounds/Birds talk at end.m4a', 'audio/birdSounds/Birds with airplane.m4a', 'audio/birdSounds/birds with kitchen sounds.m4a', 'audio/birdSounds/Birds with neighbours talking.m4a', 'audio/birdSounds/Birds with weird pigeon noise.m4a', 'audio/birdSounds/Birds from inside.m4a', 'audio/birdSounds/Birds and a crow.m4a', 'audio/birdSounds/Birds from inside 2.m4a', 'audio/birdSounds/Birds airplane 2.m4a', 'audio/birdSounds/Birds with clearing throat.m4a'];
var bumpSounds = ['audio/bumpSounds/thud1.mp3',
    'audio/bumpSounds/thud2.mp3',
    'audio/bumpSounds/thud3.mp3',
    'audio/bumpSounds/thud4.mp3'];
var numOfCustomComponents = 0;
var audioComponents = [];
audioComponents.push(new CustomAudioComponent('custom'));
audioComponents.push(new AudioComponent('birds', birdSounds));
audioComponents.push(new AudioComponent('bump', bumpSounds));
var slider = document.getElementById("masterVolume"); // Update the current slider value (each time you drag the slider handle)

slider.value = localStorage.getItem('masterVolume') || slider.value;

slider.oninput = function () {
    for (var i = 0; i < audioComponents.length; i++) {
        var maxVolumeFactorLocal = audioComponents[i].maxVolumeFactorLocal;
        var maxVolumeFactorMaster = this.value / 100;
        audioComponents[i].maxVolumeFactorMaster = maxVolumeFactorMaster;
        audioComponents[i].myAudio.volume = maxVolumeFactorMaster * maxVolumeFactorLocal;

        if (maxVolumeFactorMaster * maxVolumeFactorLocal % 2 === 0) {
            console.log(audioComponents[i].divName + ": adjusted volume:", audioComponents[i].myAudio.volume);
        }
    }

    localStorage.setItem('masterVolume', this.value);
};

var stopEverythingButton = document.getElementById("masterStopSounds");

stopEverythingButton.onclick = function () {
    for (var i = 0; i < audioComponents.length; i++) {
        audioComponents[i].stopAudio();
    }
};

var addCustomButton = document.getElementById('newComponent');
addCustomButton.onclick = function () {
    numOfCustomComponents++;
    audioComponents.push(new CustomAudioComponent('custom' + numOfCustomComponents));
}