class StateConfig {
    constructor() {
        this.config = [];
        this.initChangeListeners();
    }

    initChangeListeners() {
        window.onchange = (event) => { // observe any value changes
            // const config = new StateConfig(audioComponents);
            console.log('changes made, adding config');
            this.updateConfig();
            this.saveConfigToLocalStorage();
        }
        
        const observer = new MutationObserver((event) => { // Observe any DOM element changes
            console.log('mutation observed, adding config')
            this.updateConfig();
            this.saveConfigToLocalStorage();
        });
        
        observer.observe(document.getElementById('audioPanelsDiv'), {attrubutes: true, childList: true})
    }

    saveConfigToLocalStorage(config){
        const url = window.location.href;
        localStorage.setItem(url+'_app_config', JSON.stringify(this.config));
        console.log(this.config);
    }

    updateConfig() {
        this.config = [];
        for(let i = 0; i < audioComponents.length; i++) {
            const divName = audioComponents[i].divName;
            const timePickerValue = audioComponents[i].timepicker.value;
            const delayBetweenSounds = audioComponents[i].delayTickBox.checked;
            const maxDelay = audioComponents[i].delayTickBox.checked === true ? audioComponents[i].delaySettings.maxDelayInput.value : null;
            const randomDelay = maxDelay ? audioComponents[i].delaySettings.randomDelaySwitch.checked : null;
            const soundTracks = audioComponents[i].soundTracks;
            const isCustom = audioComponents[i].isCustom;
            const maxVolumeFactorLocal = audioComponents[i].maxVolumeFactorLocal;
            this.config[i] = {
                'divName': divName,
                'timePickerValue': timePickerValue,
                'delayBetweenSounds': delayBetweenSounds,
                'maxDelay': maxDelay,
                'randomDelay': randomDelay,
                'soundTracks': soundTracks,
                'isCustom': isCustom,
                'maxVolumeFactorLocal': maxVolumeFactorLocal
            }
        }
    }

}