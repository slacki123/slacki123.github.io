class AudioComponent {
    // div;
    // myAudio;
    // text;
    // audioStopped = false;
    // playButton;
    // stopButton;
    // soundTracks; // Array
    // soundFade;
    // volumeSlider; // component
    // delayOnEnded;
    // maxVolumeFactorLocal = 1;
    // maxVolumeFactorMaster = localStorage.getItem('masterVolume')/100 || 1;
    // timepicker;
    // timepickerObject;
    // delayTickBox;
    // delaySettings;


    constructor (divName, soundTracks, settingsConfig) {
        this.audioStopped = false;
        this.maxVolumeFactorLocal = 1;
        this.maxVolumeFactorMaster = localStorage.getItem('masterVolume')/100 || 1;

        this.divName = divName;
        this.soundTracks = soundTracks || ['bla'];
        this.div = this.createDivTemplate(divName);
        this.appendToBody();
        this.myAudio = document.getElementById(divName+'Audio');
        this.text = document.getElementById(divName+'Text');
        this.initAudioEvents();
        this.initButtons();
        this.initTimepicker();
        this.initVolumeSlider();
        this.initDelayTickbox();
        this.viewPlayList();
        this.soundFade = new SoundFade(this);
        // TODO: if I want to have local volumes as local storage:
        // this.maxVolumeFactorLocal = localStorage.getItem(divName + 'LocalVolume');
        this.configureLocalStorageSettings(settingsConfig);

    }

    configureLocalStorageSettings(settingsConfig) {
        if(!settingsConfig){
            return;
        }
        this.timepicker.value = settingsConfig.timePickerValue;
        this.timepickerObject.setStopPlayingTime(this);

        this.delayTickBox.checked = settingsConfig.delayBetweenSounds;
        if(this.delayTickBox.checked === true) {
            this.delaySettings.show();
            this.delaySettings.maxDelayInput.value = settingsConfig.maxDelay;
            this.delaySettings.maxDelay = settingsConfig.maxDelay;
            this.delaySettings.randomDelaySwitch.checked = settingsConfig.randomDelay; 
            this.delaySettings.randomChecked = settingsConfig.randomDelay;
        }

        this.maxVolumeFactorLocal = settingsConfig.maxVolumeFactorLocal;
        this.volumeSlider.value = settingsConfig.maxVolumeFactorLocal*100;
    }

    createDivTemplate(divName) {
        const divTemplate = 
        `  
        <audio id='${divName}Audio' src=''></audio>
        <button class='btn btn-primary' id='${divName}soundButton' type='button'>Play ${divName} Sounds</button>
        <button class='btn btn-primary' id='${divName}stopSoundButton' type='button'>Stop ${divName} sounds</button>
        <button class='btn btn-remove' id='${divName}RemoveButton' style='background:red;color:white;'> Delete</button>
        
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
        <p id='${divName}PlayList'></p>
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
        
        // TODO: Does the below need to exist, and can it just be in the playAudio method?
        this.myAudio.onplay = async () => {
            this.myAudio.onloadeddata = () => {
                this.soundFade.reset();
                this.soundFade = new SoundFade(this);
                console.log('data loaded for:', this.divName);
                this.soundFade.fadeBetweenSounds(this.myAudio);
            }
        }
    }

    appendToBody() {
        const newAudioPanelDiv = document.createElement('div');
        newAudioPanelDiv.setAttribute('id', this.divName+'Div');
        newAudioPanelDiv.setAttribute('style', 'border-style: solid; padding: 1%; margin-bottom: 10px');
        newAudioPanelDiv.innerHTML = this.div;
        const audioPanelsDiv = document.getElementById('audioPanelsDiv');
        audioPanelsDiv.prepend(newAudioPanelDiv);
    }

    initButtons() {
        this.playButton = document.getElementById(this.divName+'soundButton');
        this.stopButton = document.getElementById(this.divName+'stopSoundButton');
        this.removeThisButton = document.getElementById(this.divName+'RemoveButton');
        this.playButton.onclick = () => this.playAudio();
        this.stopButton.onclick = () => this.stopAudio();
        this.removeThisButton.onclick = () => {
            const thisDiv = document.getElementById(this.divName+'Div');
            thisDiv.parentNode.removeChild(thisDiv);
            const index = audioComponents.indexOf(this);
            audioComponents.splice(index, 1);
            console.log(`Removed audio component for ${this.divName}, remaining components: `, audioComponents);

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
        this.delaySettings = new DelaySettings(this);
        this.delayTickBox.onchange = () => {
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
        this.timepickerObject = new Timepicker(this.divName + 'Duration');
        this.timepickerObject.setStopPlayingTime(this);
        this.timepicker.onclick = () => this.timepickerObject.updateTimePickerDropdown();
        console.log('timePIckerr inited for ' + this.divName);
        this.timepicker.onchange = () => {
            console.log('set for ' + this.divName);
            this.timepickerObject.setStopPlayingTime(this);
            this.timepickerObject = new Timepicker(this.divName + 'Duration');
        }
    }

    viewPlayList() {
        this.playList = document.getElementById(this.divName+'PlayList');
        this.playList.innerHTML = '<span style="color:white;font-weight:bolder">Play List: </span>';
        let audioList = '';
        for(let i = 0; i < this.soundTracks.length; i++){
            const lastPartOfURL = this.soundTracks[i].split('/').length - 1;
            const title = this.soundTracks[i].split('/')[lastPartOfURL];
            if(i == 0) {
                audioList = title;
                continue;
            }
            audioList = audioList + ', ' + title;
        }
        this.playList.innerHTML = this.playList.innerHTML + ' ' + audioList;
    }

    async playAudio() {
        this.timepickerObject.setStopPlayingTime(this);
        // if(this.timepickerObject.checkStopInTime() === 0) {
        //     alert('The "Stop playing at" time is now. Change it or wait a minute');
        //     return;
        // }
        const randomSound = this.soundTracks[Math.floor((Math.random() * this.soundTracks.length))];
        this.myAudio.setAttribute('src', randomSound);
        this.myAudio.play();
        console.log(this.divName + ': Playing new sound:', randomSound);
        const source = this.myAudio.getAttribute('src');
        const lastPartOfURL = source.split('/').length - 1;
        const title = source.split('/')[lastPartOfURL];
        this.text.innerHTML = 'Playing: ' + title;
        this.audioStopped = false;
    }

    stopAudio() {
        this.myAudio.pause();
        this.myAudio.currentTime = 0;
        this.text.innerHTML = 'Audio Ended';
        this.audioStopped = true;
        this.soundFade.reset();
        console.log('audio restarted for: ', this.divName);
        this.delaySettings.resetDelay();
    }

}