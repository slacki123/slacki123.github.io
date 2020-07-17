function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var CustomAudioComponent = /*#__PURE__*/function (_AudioComponent) {
  "use strict";

  _inheritsLoose(CustomAudioComponent, _AudioComponent);

  // fileUploadComponent;
  // audioUploadButton;
  // divName;
  // divHTML;
  function CustomAudioComponent(divName, settingsConfig) {
    var _this;

    var initialSoundTracks = []; // TODO: In the future would want to extract from data base or local storage;

    _this = _AudioComponent.call(this, divName, initialSoundTracks, settingsConfig) || this;
    _this.isCustom = true;
    _this.divName = divName;

    _this.generateAudioUploadTemplate(divName);

    _this.initAudioUpload();

    return _this;
  }

  var _proto = CustomAudioComponent.prototype;

  _proto.generateAudioUploadTemplate = function generateAudioUploadTemplate(divName) {
    var fileUploadTemplate = "\n        <div id='" + divName + "AudioUploadDiv'>\n            <span> UPLOAD YOUR OWN CUSTOM SOUNDS! </span> \n            <br>\n           <input type='file' id='" + divName + "AudioUpload' multiple accept='audio/*'>\n        </div>\n        ";
    this.divHTML = document.getElementById(divName + "Text"); //This is probably bad practice, because my html will always be inserted after this text tag

    this.divHTML.insertAdjacentHTML('afterend', fileUploadTemplate);
  };

  _proto.initAudioUpload = function initAudioUpload() {
    var _this2 = this;

    this.audioUploadButton = document.getElementById(this.divName + "AudioUpload");

    this.audioUploadButton.onchange = function (event) {
      var numberOfFiles = event.target.files.length;

      for (var i = 0; i < numberOfFiles; i++) {
        var file = event.target.files[i];
        var source = URL.createObjectURL(file);
        console.log('files', source);

        _this2.soundTracks.push(source);
      }

      _this2.viewPlayList(); // localStorage.setItem('customURLArray', JSON.stringify(urlArray)); // so that we could retrieve it later ;) // nah doesn't work
      // after reload new url ids are created anyway

    };
  };

  return CustomAudioComponent;
}(AudioComponent);