class AudioComponent {
    div;
    myAudio;
    text;
    audioEnded = false;
    playButton;
    stopButton;
    soundTracks; // Array
    soundFade;
    volumeSlider; // component
    masterVolumeRef = document.getElementById('masterVolume');
    delayOnEnded;
    maxVolumeFactorLocal = 1;
    maxVolumeFactorMaster = 1;


    constructor (divName, soundTracks) {
        this.divName = divName;
        this.soundTracks = soundTracks || ['bla'];
        this.div = this.createDivTemplate(divName);
        const body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('afterbegin', this.div);
        this.myAudio = document.getElementById(divName+'Audio');
        this.text = document.getElementById(divName+'Text');
        this.initAudioEvents();
        this.initButtons();
        this.initTimepicker();
        this.initVolumeSlider();
        this.soundFade = new SoundFade(this);
    }

    createDivTemplate(divName) {
        const divTemplate = 
        `  
        <div id='${divName}Div'>
        <audio id='${divName}Audio' src='lets begin.m4a'></audio>
        <button class='btn btn-primary' id='${divName}soundButton' type='button'>Play ${divName} Sounds</button>
        <button class='btn btn-primary' id='${divName}stopSoundButton' type='button'>Stop ${divName} sounds</button>
        
        <div class="slidecontainer ${divName}Slider">
            ${divName} Volume <br>
        <input type="range" min="1" max="100" value="100" class="slider" id="${divName}Volume">
        </div>
    
        <div class='timePicker' style='padding-top:1%'>
            <p>
                <label>Stop playing at:</label>
    
                <input  id='${divName}Duration' type='time' class='time' />
            </p>
        </div>
        
        <p id='${divName}Text'></p>
    
       </div>
       `

       return divTemplate;
    }

    initAudioEvents() {
        this.myAudio.onended = () => {
            this.soundFade.reset();
            console.log('audio ended for: ', this.divName);
            const randomSound = this.soundTracks[Math.floor((Math.random() * this.soundTracks.length))];
            this.myAudio.setAttribute('src', randomSound);
            // TODO: Add a delay here, either random or not random. Options should be in the component

            this.myAudio.play();
            console.log(this.divName + ': Playing new sound:', randomSound);
            this.text.innerHTML = 'Playing: ' + randomSound;
        }

        this.myAudio.onpause = () => {
            this.soundFade.reset();
            console.log('audio restarted for: ', this.divName);
        }
        
        this.myAudio.onplay = async () => {
            this.myAudio.onloadeddata = () => {
                this.soundFade.reset();
                this.soundFade = new SoundFade(this);
                console.log('data loaded for:', this.divName);
                this.soundFade.fadeBetweenSounds(this.myAudio);
            }
        }
    }

    initButtons() {
        this.playButton = document.getElementById(this.divName+'soundButton');
        this.stopButton = document.getElementById(this.divName+'stopSoundButton');
        this.playButton.onclick = () => this.playAudio();
        this.stopButton.onclick = () => this.stopAudio();
    }

    initVolumeSlider() {
        this.volumeSlider = document.getElementById(this.divName+'Volume');
        this.volumeSlider.oninput = () => {
            this.maxVolumeFactorLocal = this.volumeSlider.value/100;
            this.myAudio.volume = this.maxVolumeFactorLocal*this.maxVolumeFactorMaster;
            if(this.maxVolumeFactorLocal*this.maxVolumeFactorMaster % 2 === 0){
                console.log(`${this.divName}: adjusted volume:`, this.myAudio.volume);
            }            
        }
    }

    initTimepicker() {
        const timepicker = document.getElementById(this.divName + 'Duration');
        let timepickerObject = new Timepicker(this.divName + 'Duration')
        timepicker.onclick = () => timepickerObject.updateTimePickerDropdown();
        
        timepicker.oninput = () => {
            timepickerObject.setStopPlayingTime(this);
            timepickerObject = new Timepicker(this.divName + 'Duration');
        }
    }

    async playAudio() {
        this.myAudio.play();
        const source = this.myAudio.getAttribute('src');
        this.text.innerHTML = 'Playing: ' + source;
    }

    stopAudio() {
        this.myAudio.pause();
        this.myAudio.currentTime = 0;
        this.text.innerHTML = 'Audio Ended';
    }

}