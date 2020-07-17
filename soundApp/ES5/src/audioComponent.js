var AudioComponent = /*#__PURE__*/function () {
  "use strict";

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
  function AudioComponent(divName, soundTracks, settingsConfig) {
    this.audioStopped = false;
    this.maxVolumeFactorLocal = 1;
    this.maxVolumeFactorMaster = localStorage.getItem('masterVolume') / 100 || 1;
    this.divName = divName;
    this.soundTracks = soundTracks || ['bla'];
    this.div = this.createDivTemplate(divName);
    this.appendToBody();
    this.myAudio = document.getElementById(divName + 'Audio');
    this.text = document.getElementById(divName + 'Text');
    this.initAudioEvents();
    this.initButtons();
    this.initTimepicker();
    this.initVolumeSlider();
    this.initDelayTickbox();
    this.viewPlayList();
    this.soundFade = new SoundFade(this); // TODO: if I want to have local volumes as local storage:
    // this.maxVolumeFactorLocal = localStorage.getItem(divName + 'LocalVolume');

    this.configureLocalStorageSettings(settingsConfig);
  }

  var _proto = AudioComponent.prototype;

  _proto.configureLocalStorageSettings = function configureLocalStorageSettings(settingsConfig) {
    if (!settingsConfig) {
      return;
    }

    this.timepicker.value = settingsConfig.timePickerValue;
    this.timepickerObject.setStopPlayingTime(this);
    this.delayTickBox.checked = settingsConfig.delayBetweenSounds;

    if (this.delayTickBox.checked === true) {
      this.delaySettings.show();
      this.delaySettings.maxDelayInput.value = settingsConfig.maxDelay;
      this.delaySettings.maxDelay = settingsConfig.maxDelay;
      this.delaySettings.randomDelaySwitch.checked = settingsConfig.randomDelay;
      this.delaySettings.randomChecked = settingsConfig.randomDelay;
    }

    this.maxVolumeFactorLocal = settingsConfig.maxVolumeFactorLocal;
    this.volumeSlider.value = settingsConfig.maxVolumeFactorLocal * 100;
  };

  _proto.createDivTemplate = function createDivTemplate(divName) {
    var divTemplate = "  \n        <audio id='" + divName + "Audio' src=''></audio>\n        <button class='btn btn-primary' id='" + divName + "soundButton' type='button'>Play " + divName + " Sounds</button>\n        <button class='btn btn-primary' id='" + divName + "stopSoundButton' type='button'>Stop " + divName + " sounds</button>\n        <button class='btn btn-remove' id='" + divName + "RemoveButton' style='background:red;color:white;'> Delete</button>\n        \n        <div class=\"slidecontainer " + divName + "Slider\">\n            " + divName + " Volume <br>\n        <input type=\"range\" min=\"1\" max=\"100\" value=\"100\" class=\"slider\" id=\"" + divName + "Volume\">\n        </div>\n\n        <div class='" + divName + "DelaySwitch'>\n            <label class=\"delay-switch\">\n                Add delay between sounds <input id='" + divName + "DelaySwitch' type=\"checkbox\"> \n                <span class=\"delay-slider round\"></span>\n            </label>\n            <div id='" + divName + "DelaySwitchSettings'> \n            </div>\n        </div>\n    \n        <div class='timePicker' style='padding-top:1%'>\n            <p>\n                <label>Stop playing at:</label>\n    \n                <input  id='" + divName + "Duration' type='time' class='time' />\n            </p>\n        </div>\n        \n        <p id='" + divName + "Text'></p>\n        <p id='" + divName + "PlayList'></p>\n       ";
    return divTemplate;
  };

  _proto.initAudioEvents = function initAudioEvents() {
    var _this = this;

    this.myAudio.onended = async function () {
      _this.soundFade.reset();

      console.log('audio ended for: ', _this.divName);
      await _this.delaySettings.setDelay();
      if (_this.audioStopped == true) return;

      _this.playAudio();
    }; // TODO: Does the below need to exist, and can it just be in the playAudio method?


    this.myAudio.onplay = async function () {
      _this.myAudio.onloadeddata = function () {
        _this.soundFade.reset();

        _this.soundFade = new SoundFade(_this);
        console.log('data loaded for:', _this.divName);

        _this.soundFade.fadeBetweenSounds(_this.myAudio);
      };
    };
  };

  _proto.appendToBody = function appendToBody() {
    var newAudioPanelDiv = document.createElement('div');
    newAudioPanelDiv.setAttribute('id', this.divName + 'Div');
    newAudioPanelDiv.setAttribute('style', 'border-style: solid; padding: 1%; margin-bottom: 10px');
    newAudioPanelDiv.innerHTML = this.div;
    var audioPanelsDiv = document.getElementById('audioPanelsDiv');
    audioPanelsDiv.prepend(newAudioPanelDiv);
  };

  _proto.initButtons = function initButtons() {
    var _this2 = this;

    this.playButton = document.getElementById(this.divName + 'soundButton');
    this.stopButton = document.getElementById(this.divName + 'stopSoundButton');
    this.removeThisButton = document.getElementById(this.divName + 'RemoveButton');

    this.playButton.onclick = function () {
      return _this2.playAudio();
    };

    this.stopButton.onclick = function () {
      return _this2.stopAudio();
    };

    this.removeThisButton.onclick = function () {
      var thisDiv = document.getElementById(_this2.divName + 'Div');
      thisDiv.parentNode.removeChild(thisDiv);
      var index = audioComponents.indexOf(_this2);
      audioComponents.splice(index, 1);
      console.log("Removed audio component for " + _this2.divName + ", remaining components: ", audioComponents);
    };
  };

  _proto.initVolumeSlider = function initVolumeSlider() {
    var _this3 = this;

    this.volumeSlider = document.getElementById(this.divName + 'Volume');

    this.volumeSlider.oninput = function () {
      _this3.maxVolumeFactorLocal = _this3.volumeSlider.value / 100;
      _this3.myAudio.volume = _this3.maxVolumeFactorLocal * _this3.maxVolumeFactorMaster;

      if (_this3.maxVolumeFactorLocal * _this3.maxVolumeFactorMaster % 2 === 0) {
        console.log(_this3.divName + ": adjusted volume:", _this3.myAudio.volume);
      }
    };
  };

  _proto.initDelayTickbox = function initDelayTickbox() {
    var _this4 = this;

    this.delayTickBox = document.getElementById(this.divName + 'DelaySwitch');
    this.delaySettings = new DelaySettings(this);

    this.delayTickBox.onchange = function () {
      if (_this4.delayTickBox.checked == false) {
        // counterintuitive, but when you first click before it ticks, it's actually false
        _this4.delaySettings.hide();

        console.log('checked true');
      } else {
        _this4.delaySettings.show();
      }
    };
  };

  _proto.initTimepicker = function initTimepicker() {
    var _this5 = this;

    this.timepicker = document.getElementById(this.divName + 'Duration');
    this.timepickerObject = new Timepicker(this.divName + 'Duration');
    this.timepickerObject.setStopPlayingTime(this);

    this.timepicker.onclick = function () {
      return _this5.timepickerObject.updateTimePickerDropdown();
    };

    console.log('timePIckerr inited for ' + this.divName);

    this.timepicker.onchange = function () {
      console.log('set for ' + _this5.divName);

      _this5.timepickerObject.setStopPlayingTime(_this5);

      _this5.timepickerObject = new Timepicker(_this5.divName + 'Duration');
    };
  };

  _proto.viewPlayList = function viewPlayList() {
    this.playList = document.getElementById(this.divName + 'PlayList');
    this.playList.innerHTML = '<span style="color:white;font-weight:bolder">Play List: </span>';
    var audioList = '';

    for (var i = 0; i < this.soundTracks.length; i++) {
      var lastPartOfURL = this.soundTracks[i].split('/').length - 1;
      var title = this.soundTracks[i].split('/')[lastPartOfURL];

      if (i == 0) {
        audioList = title;
        continue;
      }

      audioList = audioList + ', ' + title;
    }

    this.playList.innerHTML = this.playList.innerHTML + ' ' + audioList;
  };

  _proto.playAudio = async function playAudio() {
    this.timepickerObject.setStopPlayingTime(this); // if(this.timepickerObject.checkStopInTime() === 0) {
    //     alert('The "Stop playing at" time is now. Change it or wait a minute');
    //     return;
    // }

    var randomSound = this.soundTracks[Math.floor(Math.random() * this.soundTracks.length)];
    this.myAudio.setAttribute('src', randomSound);
    this.myAudio.play();
    console.log(this.divName + ': Playing new sound:', randomSound);
    var source = this.myAudio.getAttribute('src');
    var lastPartOfURL = source.split('/').length - 1;
    var title = source.split('/')[lastPartOfURL];
    this.text.innerHTML = 'Playing: ' + title;
    this.audioStopped = false;
  };

  _proto.stopAudio = function stopAudio() {
    this.myAudio.pause();
    this.myAudio.currentTime = 0;
    this.text.innerHTML = 'Audio Ended';
    this.audioStopped = true;
    this.soundFade.reset();
    console.log('audio restarted for: ', this.divName);
    this.delaySettings.resetDelay();
  };

  return AudioComponent;
}();