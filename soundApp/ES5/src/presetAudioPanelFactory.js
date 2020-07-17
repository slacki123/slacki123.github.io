var presetAudioPanelFactory = /*#__PURE__*/function () {
  "use strict";

  function presetAudioPanelFactory() {
    this.presetBtnDiv = document.getElementById('presetButtons');
    this.initBumpPreset();
    this.initBirdsPreset();
    this.initCrowsPreset();
  }

  var _proto = presetAudioPanelFactory.prototype;

  _proto.initBumpPreset = function initBumpPreset() {
    var componentName = 'bump';
    var bumpAudio = ['audio/bumpSounds/thud1.mp3', 'audio/bumpSounds/thud2.mp3', 'audio/bumpSounds/thud3.mp3', 'audio/bumpSounds/thud4.mp3'];
    this.initComponent(componentName, bumpAudio);
  };

  _proto.initBirdsPreset = function initBirdsPreset() {
    var componentName = 'birds';
    var birdsAudio = ['audio/birdSounds/Birds 2.m4a', 'audio/birdSounds/Birds one cough and fly.m4a', 'audio/birdSounds/Birds talk at end.m4a', 'audio/birdSounds/Birds with airplane.m4a', 'audio/birdSounds/birds with kitchen sounds.m4a', 'audio/birdSounds/Birds with neighbours talking.m4a', 'audio/birdSounds/Birds with weird pigeon noise.m4a', 'audio/birdSounds/Birds from inside.m4a', 'audio/birdSounds/Birds and a crow.m4a', 'audio/birdSounds/Birds from inside 2.m4a', 'audio/birdSounds/Birds airplane 2.m4a', 'audio/birdSounds/Birds with clearing throat.m4a'];
    this.initComponent(componentName, birdsAudio);
  };

  _proto.initCrowsPreset = function initCrowsPreset() {
    var componentName = 'crows';
    var crowsAudio = ['audio/crowSounds/crows x4.mp3'];
    this.initComponent(componentName, crowsAudio);
  };

  _proto.initComponent = function initComponent(componentName, componentAudio) {
    var newButton = document.createElement('button');
    newButton.setAttribute('class', 'btn');
    newButton.setAttribute('id', componentName + 'Preset');
    newButton.innerText = "Add " + componentName + " Preset";
    this.presetBtnDiv.appendChild(newButton);

    newButton.onclick = function () {
      for (var i = 0; i < audioComponents.length; i++) {
        var existingComponentName = audioComponents[i].divName;
        var componentLastCharacter = existingComponentName[existingComponentName.length - 1];

        if (existingComponentName == componentName) {
          componentName = componentName + '1';
        }
      }

      audioComponents.push(new AudioComponent(componentName, componentAudio)); // push new config to localstorage
      // localStorage.setItem(window.href+'application_config', JSON.stringify(audioComponents));
    };
  };

  return presetAudioPanelFactory;
}();