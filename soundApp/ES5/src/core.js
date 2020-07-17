var numOfCustomComponents = 0;
var audioComponents = [];
var url = window.location.href;
var originalConfig = localStorage.getItem(url + '_app_config');

if (originalConfig) {
  var config = JSON.parse(originalConfig);

  for (var i = 0; i < config.length; i++) {
    if (config[i].isCustom == true) {
      audioComponents.push(new CustomAudioComponent(config[i].divName, config[i]));
    } else {
      audioComponents.push(new AudioComponent(config[i].divName, config[i].soundTracks, config[i]));
    }
  }
}

var newConfig = new StateConfig();
var presetFactory = new presetAudioPanelFactory();
var slider = document.getElementById("masterVolume"); // Update the current slider value (each time you drag the slider handle)

slider.value = localStorage.getItem('masterVolume') || slider.value;

slider.oninput = function () {
  for (var _i = 0; _i < audioComponents.length; _i++) {
    var maxVolumeFactorLocal = audioComponents[_i].maxVolumeFactorLocal;
    var maxVolumeFactorMaster = this.value / 100;
    audioComponents[_i].maxVolumeFactorMaster = maxVolumeFactorMaster;
    audioComponents[_i].myAudio.volume = maxVolumeFactorMaster * maxVolumeFactorLocal;

    if (maxVolumeFactorMaster * maxVolumeFactorLocal % 2 === 0) {
      console.log(audioComponents[_i].divName + ": adjusted volume:", audioComponents[_i].myAudio.volume);
    }
  }

  localStorage.setItem('masterVolume', this.value);
};

var playEverythingButton = document.getElementById('playEverything');

playEverythingButton.onclick = function () {
  for (var i = 0; i < audioComponents.length; i++) {
    audioComponents[i].playAudio();
  }
};

var stopEverythingButton = document.getElementById("masterStopSounds");

stopEverythingButton.onclick = function () {
  for (var _i2 = 0; _i2 < audioComponents.length; _i2++) {
    audioComponents[_i2].stopAudio();
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
  localStorage.setItem(url + '_app_config', '');
  location.reload();
};