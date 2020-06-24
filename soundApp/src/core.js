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

const voiceSounds = [
    'voiceSounds/test.mp3'
]

const audioComponents = [];
audioComponents.push(new AudioComponent('birds', birdSounds));
audioComponents.push(new AudioComponent('voice', voiceSounds));



var slider = document.getElementById("myRange");
var output = document.getElementById("sliderValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function () {
    output.innerHTML = this.value;
    for(let i = 0; i < audioComponents.length; i++){ 
        audioComponents[i].myAudio.volume = parseInt(this.value)/100;
    }
}
