class AudioComponent {
    div;
    myAudio;
    text;
    audioEnded = false;
    playButton;
    stopButton;
    soundTracks;


    constructor (divName, soundTracks) {
        this.divName = divName;
        this.soundTracks = soundTracks || ['bla'];
        this.div = this.createDivTemplate(divName);
        const body = document.getElementsByTagName('body')[0];
        body.insertAdjacentHTML('afterbegin', this.div);
        this.myAudio = document.getElementById(divName+'Audio');
        this.text = document.getElementById(divName+'Text');
        this.initAudioEvents(this.myAudio, this.soundTracks, this.text);
        this.initButtons();
        this.initTimepicker();
    }

    createDivTemplate(divName) {
        const divTemplate = 
        `  
        <div id='${divName}Div'>
        <audio id='${divName}Audio' src='lets begin.m4a'></audio>
        <button class='btn btn-primary' id='${divName}soundButton' type='button'>Play ${divName} Sounds</button>
        <button class='btn btn-primary' id='${divName}stopSoundButton' type='button'>Stop ${divName} sounds</button>
    
        <div name='soundFadeDiv'>
            <label for='soundFade'>Sound fade:</label>
            <select id='fadeDropdown' name='soundFade'>
                <option value=null>No fade</option>
                <option value='linear'>Linear fade</option>
                <option value='squareRoot'>Square root fade</option>
                <option value='sinusoidal'>Sinusoidal fade</option>
            </select>
            <label for='fadeDurationInput'>Fade Duration (milliseconds):</label>
            <input type='number' id='fadeDurationInput' name='fadeDurationInput' min='0' max='10000'>
        </div>
    
        <div class='timePicker'>
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
            this.audioEnded = true; // just so the fade only works after at least one audio ended
            console.log('audio ended');
            const randomSound = this.soundTracks[Math.floor((Math.random() * this.soundTracks.length))];
            this.myAudio.setAttribute('src', randomSound);
            this.myAudio.play();
            console.log('Playing: ', randomSound);
            this.text.innerHTML = 'Playing: ' + randomSound;
        }
        
        this.myAudio.onloadeddata = async () => {
            console.log('data loaded');
            console.log('Not first audio', this.audioEnded);
        
            if (this.audioEnded === true) {
                const fadeDuration = fadeDurationInput.value || 2000;
                // fadeBetweenSounds(this.myAudio, fadeDuration);
            }
        }
    }

    initButtons() {
        this.playButton = document.getElementById(this.divName+'soundButton');
        this.stopButton = document.getElementById(this.divName+'stopSoundButton');
        this.playButton.onclick = () => this.playAudio();
        this.stopButton.onclick = () => this.stopAudio();
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

    playAudio() {
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