let numOfCustomComponents = 0;
const audioComponents = [];
const url = window.location.href;
const originalConfig = localStorage.getItem(url+'_app_config');
if(originalConfig){
    const config = JSON.parse(originalConfig);
    for(let i = 0; i < config.length; i++) {
        if(config[i].isCustom == true) {
            audioComponents.push(new CustomAudioComponent(config[i].divName, config[i]))
        } else {
            audioComponents.push(new AudioComponent(config[i].divName, config[i].soundTracks, config[i]));
        }
    }
}

const newConfig = new StateConfig();
const presetFactory = new presetAudioPanelFactory();


const slider = document.getElementById("masterVolume");
// Update the current slider value (each time you drag the slider handle)
slider.value = localStorage.getItem('masterVolume') || slider.value;
slider.oninput = function() {
    for(let i = 0; i < audioComponents.length; i++){ 
        const maxVolumeFactorLocal = audioComponents[i].maxVolumeFactorLocal;
        const maxVolumeFactorMaster = this.value/100;
        audioComponents[i].maxVolumeFactorMaster = maxVolumeFactorMaster;
        audioComponents[i].myAudio.volume = maxVolumeFactorMaster*maxVolumeFactorLocal; 
        if(maxVolumeFactorMaster*maxVolumeFactorLocal % 2 === 0){
            console.log(`${audioComponents[i].divName}: adjusted volume:`, audioComponents[i].myAudio.volume);
        }
       
        
    }
    localStorage.setItem('masterVolume', this.value);
}

const stopEverythingButton = document.getElementById("masterStopSounds");
stopEverythingButton.onclick = () => {
    for(let i = 0; i < audioComponents.length; i++){ 
        audioComponents[i].stopAudio();
    }
}

const addCustomButton = document.getElementById('newComponent');
addCustomButton.onclick = () => {
    numOfCustomComponents++;
    audioComponents.push(new CustomAudioComponent('custom'+numOfCustomComponents));
}

const resetEverything = document.getElementById('resetEverything')
resetEverything.onclick = () => {
    const url = window.location.href;
    localStorage.setItem(url+'_app_config', '');
    location.reload();

}

