function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var presetAudioPanelFactory = /*#__PURE__*/function () {
  "use strict";

  // The whole class needs to be rewritten to allow only adding one preset at a time....
  function presetAudioPanelFactory() {
    _classCallCheck(this, presetAudioPanelFactory);

    this.presetBtnDiv = document.getElementById('presetButtons');
    this.initBumpPreset();
    this.initBirdsPreset();
    this.initCrowsClosedPreset();
    this.initCrowsOpenPreset();
  }

  _createClass(presetAudioPanelFactory, [{
    key: "initBumpPreset",
    value: function initBumpPreset() {
      var componentName = 'bump';
      var bumpAudio = ['audio/bumpSounds/thud1.mp3', 'audio/bumpSounds/thud3.mp3', 'audio/bumpSounds/thud4.mp3'];
      this.initComponent(componentName, bumpAudio);
    }
  }, {
    key: "initBirdsPreset",
    value: function initBirdsPreset() {
      var componentName = 'birds';
      var birdsAudio = ['audio/birdSounds/Birds 2.m4a', 'audio/birdSounds/Birds one cough and fly.m4a', 'audio/birdSounds/Birds talk at end.m4a', 'audio/birdSounds/Birds with airplane.m4a', 'audio/birdSounds/birds with kitchen sounds.m4a', 'audio/birdSounds/Birds with neighbours talking.m4a', 'audio/birdSounds/Birds with weird pigeon noise.m4a', 'audio/birdSounds/Birds from inside.m4a', 'audio/birdSounds/Birds and a crow.m4a', 'audio/birdSounds/Birds from inside 2.m4a', 'audio/birdSounds/Birds airplane 2.m4a', 'audio/birdSounds/Birds with clearing throat.m4a'];
      this.initComponent(componentName, birdsAudio);
    }
  }, {
    key: "initCrowsOpenPreset",
    value: function initCrowsOpenPreset() {
      var componentName = 'crows-open-window';
      var crowsAudio = ['audio/crowSounds/Crows OPEN WET1.mp3'];
      this.initComponent(componentName, crowsAudio);
    }
  }, {
    key: "initCrowsClosedPreset",
    value: function initCrowsClosedPreset() {
      var componentName = 'crows-closed-window';
      var crowsAudio = ['audio/crowSounds/Crows CLOSED.mp3'];
      this.initComponent(componentName, crowsAudio);
    }
  }, {
    key: "initComponent",
    value: function initComponent(componentName, componentAudio) {
      var newButton = document.createElement('button');
      newButton.setAttribute('class', 'btn');
      newButton.setAttribute('id', componentName + 'Preset');
      newButton.innerText = "Add ".concat(componentName, " Preset");
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
    }
  }]);

  return presetAudioPanelFactory;
}();