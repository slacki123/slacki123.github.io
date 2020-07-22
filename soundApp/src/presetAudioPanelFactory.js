class presetAudioPanelFactory {
    // The whole class needs to be rewritten to allow only adding one preset at a time....
    constructor() {
        this.presetBtnDiv = document.getElementById('presetButtons');
        this.initBumpPreset();
        this.initBirdsPreset();
        this.initCrowsClosedPreset();
        this.initCrowsOpenPreset();

    }

    initBumpPreset() {
        const componentName = 'bump';
        const bumpAudio = [
            'audio/bumpSounds/thud1.mp3',
            'audio/bumpSounds/thud2.mp3',
            'audio/bumpSounds/thud3.mp3',
            'audio/bumpSounds/thud4.mp3'
        ];
        this.initComponent(componentName, bumpAudio);
    }

    initBirdsPreset() {
        const componentName = 'birds';
        const birdsAudio = [
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
        this.initComponent(componentName, birdsAudio);
    }

    initCrowsOpenPreset() {
        const componentName = 'crows_open_window';
        const crowsAudio = [
            'audio/crowSounds/Crows OPEN WET1.mp3'
        ]
        this.initComponent(componentName, crowsAudio);

    }

    initCrowsClosedPreset() {
        const componentName = 'crows_closed_window';
        const crowsAudio = [
            'audio/crowSounds/Crows CLOSED.mp3'
        ]
        this.initComponent(componentName, crowsAudio);
    }

    initComponent(componentName, componentAudio) {
        const newButton = document.createElement('button');
        newButton.setAttribute('class', 'btn');
        newButton.setAttribute('id', componentName + 'Preset');
        newButton.innerText = `Add ${componentName} Preset`;
        this.presetBtnDiv.appendChild(newButton);
        newButton.onclick = () => {
            for(let i = 0; i < audioComponents.length; i++) {
                const existingComponentName = audioComponents[i].divName;
                const componentLastCharacter = existingComponentName[existingComponentName.length - 1];
                if(existingComponentName == componentName) {
                    componentName = componentName+'1';
                }
            }
            audioComponents.push(new AudioComponent(componentName, componentAudio));
            // push new config to localstorage
            // localStorage.setItem(window.href+'application_config', JSON.stringify(audioComponents));

        }
    }

}