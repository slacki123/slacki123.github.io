var StateConfig = /*#__PURE__*/function () {
    "use strict";
  
    function StateConfig() {
      this.config = [];
      this.initChangeListeners();
    }
  
    var _proto = StateConfig.prototype;
  
    _proto.initChangeListeners = function initChangeListeners() {
      var _this = this;
  
      window.onchange = function (event) {
        // observe any value changes
        // const config = new StateConfig(audioComponents);
        console.log('changes made, adding config');
  
        _this.updateConfig();
  
        _this.saveConfigToLocalStorage();
      };
  
      var observer = new MutationObserver(function (event) {
        // Observe any DOM element changes
        console.log('mutation observed, adding config');
  
        _this.updateConfig();
  
        _this.saveConfigToLocalStorage();
      });
      observer.observe(document.getElementById('audioPanelsDiv'), {
        attrubutes: true,
        childList: true
      });
    };
  
    _proto.saveConfigToLocalStorage = function saveConfigToLocalStorage(config) {
      var url = window.location.href;
      localStorage.setItem(url + '_app_config', JSON.stringify(this.config));
      console.log(this.config);
    };
  
    _proto.updateConfig = function updateConfig() {
      this.config = [];
  
      for (var i = 0; i < audioComponents.length; i++) {
        var divName = audioComponents[i].divName;
        var timePickerValue = audioComponents[i].timepicker.value;
        var delayBetweenSounds = audioComponents[i].delayTickBox.checked;
        var maxDelay = audioComponents[i].delayTickBox.checked === true ? audioComponents[i].delaySettings.maxDelayInput.value : null;
        var randomDelay = maxDelay ? audioComponents[i].delaySettings.randomDelaySwitch.checked : null;
        var soundTracks = audioComponents[i].soundTracks;
        var isCustom = audioComponents[i].isCustom;
        var maxVolumeFactorLocal = audioComponents[i].maxVolumeFactorLocal;
        this.config[i] = {
          'divName': divName,
          'timePickerValue': timePickerValue,
          'delayBetweenSounds': delayBetweenSounds,
          'maxDelay': maxDelay,
          'randomDelay': randomDelay,
          'soundTracks': soundTracks,
          'isCustom': isCustom,
          'maxVolumeFactorLocal': maxVolumeFactorLocal
        };
      }
    };
  
    return StateConfig;
  }();