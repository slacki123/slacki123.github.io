var DelaySettings = /*#__PURE__*/function () {
    "use strict";
  
    // divName;
    // div;
    // targetDiv;
    // randomDelaySwitch;
    // delayTimeout;
    // maxDelay;
    // maxDelayInput;
    // randomChecked;
    // resolveDelay = () => {};
    function DelaySettings(component) {
      this.divName = component.divName;
  
      this.resolveDelay = function () {};
    }
  
    var _proto = DelaySettings.prototype;
  
    _proto.createDelaySettingsTemplate = function createDelaySettingsTemplate(divName) {
      var delaySettingsTemplate = "\n        <label class=\"randomTimeInput\">\n            Max Delay (seconds):<input type='number' min='0' value='0' id='" + divName + "MaxDelayTime' class=\"delayTimeInput\">\n            <span>Random Delay</span> <input id='" + divName + "RandomDelaySwitch' type=\"checkbox\"> \n            <span class=\"delay-slider round\"></span>\n        </label>\n        ";
      return delaySettingsTemplate;
    };
  
    _proto.show = function show() {
      this.div = this.createDelaySettingsTemplate(this.divName);
      this.targetDiv = document.getElementById(this.divName + "DelaySwitchSettings");
      this.targetDiv.insertAdjacentHTML('afterbegin', this.div);
      this.initDelayValues();
      console.log(this.targetDiv);
    };
  
    _proto.hide = function hide() {
      this.targetDiv.innerHTML = "";
      this.maxDelay = 0;
      this.resetDelay();
    };
  
    _proto.initDelayValues = function initDelayValues() {
      var _this = this;
  
      this.randomDelaySwitch = document.getElementById(this.divName + "RandomDelaySwitch");
      this.maxDelayInput = document.getElementById(this.divName + "MaxDelayTime");
  
      this.maxDelayInput.oninput = function () {
        _this.maxDelay = _this.maxDelayInput.value;
      };
  
      this.randomDelaySwitch.onclick = function () {
        _this.maxDelay = _this.maxDelayInput.value;
  
        if (_this.randomDelaySwitch.checked == true) {
          _this.randomChecked = true; //TODO: Potentially add another component to specify 'minimum' delay time
        } else {
          _this.randomChecked = false;
        }
      };
    };
  
    _proto.setDelay = async function setDelay() {
      if (this.randomChecked == true) {
        this.maxDelay = Math.random() * this.maxDelayInput.value;
        console.log("Random delayed enabled for " + this.divName + ", maxDelay is " + this.maxDelay + " sec");
      }
  
      console.log("Delay for " + this.divName + ", maxDelay is " + this.maxDelay + " sec");
      await this.delay(this.maxDelay * 1000);
    };
  
    _proto.resetDelay = function resetDelay() {
      clearTimeout(this.delayTimeout);
      this.resolveDelay();
    };
  
    _proto.delay = async function delay(ms) {
      var _this2 = this;
  
      return new Promise(function (resolve) {
        _this2.delayTimeout = setTimeout(resolve, ms);
        _this2.resolveDelay = resolve; // testing this extra resolve. Mabye will fix premature stop playing time issue
      });
    };
  
    return DelaySettings;
  }();