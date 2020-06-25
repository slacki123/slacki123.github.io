class AudioComponent {
    div;
    myAudio;
    text;
    audioStopped = false;
    playButton;
    stopButton;
    soundTracks; // Array
    soundFade;
    volumeSlider; // component
    delayOnEnded;
    maxVolumeFactorLocal = 1;
    maxVolumeFactorMaster = localStorage.getItem('masterVolume')/100 || 1;
    timepicker;
    timepickerObject;
    delayTickBox;
    delaySettings;


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
        this.initDelayTickbox();
        this.soundFade = new SoundFade(this);
        this.delaySettings = new DelaySettings(this);
        // TODO: if I want to have local volumes as local storage:
        // this.maxVolumeFactorLocal = localStorage.getItem(divName + 'LocalVolume');
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

        <div class='${divName}DelaySwitch'>
            <label class="delay-switch">
                Add delay between sounds <input id='${divName}DelaySwitch' type="checkbox"> 
                <span class="delay-slider round"></span>
            </label>
            <div id='${divName}DelaySwitchSettings'> 
            </div>
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
        this.myAudio.onended = async () => {
            this.soundFade.reset();
            console.log('audio ended for: ', this.divName);
            await this.delaySettings.setDelay();
            if(this.audioStopped == true) return;
            this.playAudio();
            
            
        }

        this.myAudio.onpause = () => {
            this.soundFade.reset();
            console.log('audio restarted for: ', this.divName);
            this.delaySettings.resetDelay();
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
        this.stopButton.onclick = () => {
            this.stopAudio();
        }
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

    initDelayTickbox() {
        this.delayTickBox = document.getElementById(this.divName+'DelaySwitch');
        this.delayTickBox.onclick = () => {
            if(this.delayTickBox.checked == false) { // counterintuitive, but when you first click before it ticks, it's actually false
                this.delaySettings.hide();
            console.log('checked true')
            } else {
                this.delaySettings.show();
            }
        }
    }

    initTimepicker() {
        this.timepicker = document.getElementById(this.divName + 'Duration');
        this.timepickerObject = new Timepicker(this.divName + 'Duration')
        this.timepicker.onclick = () => this.timepickerObject.updateTimePickerDropdown();
        console.log('timePIckerr inited for ' + this.divName);
        this.timepicker.oninput = () => {
            console.log('set for ' + this.divName);
            this.timepickerObject.setStopPlayingTime(this);
            this.timepickerObject = new Timepicker(this.divName + 'Duration');
        }
    }

    async playAudio() {
        const randomSound = this.soundTracks[Math.floor((Math.random() * this.soundTracks.length))];
        this.myAudio.setAttribute('src', randomSound);
        this.myAudio.play();
        console.log(this.divName + ': Playing new sound:', randomSound);
        const source = this.myAudio.getAttribute('src');
        this.text.innerHTML = 'Playing: ' + source;
        this.audioStopped = false;
    }

    stopAudio() {
        this.myAudio.pause();
        this.myAudio.currentTime = 0;
        this.text.innerHTML = 'Audio Ended';
        this.audioStopped = true;
    }

}