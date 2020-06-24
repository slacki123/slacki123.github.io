const birdSounds = [
    'audio/birdSounds/Birds 2.m4a',
    'audio/birdSounds/Birds one cough and fly.m4a',
    'audio/birdSounds/Birds talk at end.m4a',
    'audio/birdSounds/Birds with airplane.m4a',
    'audio/birdSounds/birds with kitchen sounds.m4a',
    'audio/birdSounds/Birds with neighbours talking.m4a',
    'audio/birdSounds/Birds with weird pigeon noise.m4a',
    'audio/birdSounds/Birds from inside.m4a',
    'audio/birdSounds/Birds and a crow.m4a',
    'audio/birdSounds/Birds from inside 2.m4a',
    'audio/birdSounds/Birds airplane 2.m4a',
    'audio/birdSounds/Birds with clearing throat.m4a'
];

const bumpSounds = [
    'audio/bumpSounds/test.mp3'
]

const audioComponents = [];
audioComponents.push(new AudioComponent('birds', birdSounds));
audioComponents.push(new AudioComponent('bump', bumpSounds));



const slider = document.getElementById("myRange");
const output = document.getElementById("sliderValue");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
    output.innerHTML = this.value;
    for(let i = 0; i < audioComponents.length; i++){ 
        audioComponents[i].myAudio.volume = parseInt(this.value)/100;
    }
}
