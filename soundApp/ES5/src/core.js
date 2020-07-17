var numOfCustomComponents = 0;
var audioComponents = [];
audioComponents.push(new CustomAudioComponent('custom'));
var presetFactory = new presetAudioPanelFactory();
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
};

var resetEverything = document.getElementById('resetEverything');

resetEverything.onclick = function () {
  var url = window.location.href;
  localStorage.setItem(url+'_app_config', '');
  location.reload(); // reset localstorage config
};