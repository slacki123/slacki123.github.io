var SoundFade = /*#__PURE__*/function () {
    "use strict";
  
    // increaseVolumeTimeout;
    // decreaseVolumeTimeout;
    // waitTillFadeTimeout;
    // isEnded = false;
    // increment = 0;
    // fadeDuration = 2000;
    // audio;
    // numberOfIterations = 20;
    function SoundFade(audio) {
      this.isEnded = false;
      this.increment = 0;
      this.fadeDuration = 2000;
      this.numberOfIterations = 20;
      this.audio = audio;
      this.componentVolume = audio.volumeSlider; //this.getMaxVolume() = audio.maxVolumeFactorMaster*audio.maxVolumeFactorLocal;
    }
  
    var _proto = SoundFade.prototype;
  
    _proto.fadeBetweenSounds = async function fadeBetweenSounds(audio) {
      var duration = audio.duration * 1000;
  
      if (duration < this.fadeDuration * 3) { // originally was * 2
        this.fadeDuration = duration / 4;
        return; // don't do fades for short clips
      }
  
      console.log('audio Duration', duration);
      var t0 = performance.now();
      await this.increaseVolume(audio, this.fadeDuration);
      var t1 = performance.now();
      var actualIncreaseDuration = t1 - t0;
      console.log('actual time taken for increase', actualIncreaseDuration);
      var waitTillFade = duration - this.fadeDuration - actualIncreaseDuration;
      console.log('wait till fade', waitTillFade);
      await this.waitTillFade(waitTillFade);
      var d1 = performance.now();
      await this.decreaseVolume(audio, this.fadeDuration);
      var d2 = performance.now();
      console.log('actual time taken for decrease', d2 - d1);
      console.log('hardcoded fade was', this.fadeDuration);
    };
  
    _proto.getMaxVolume = function getMaxVolume() {
      return this.audio.maxVolumeFactorMaster * this.audio.maxVolumeFactorLocal;
    };
  
    _proto.waitTillFade = async function waitTillFade(ms) {
      var _this = this;
  
      return new Promise(function (resolve) {
        _this.waitTillFadeTimeout = setTimeout(resolve, ms);
      });
    };
  
    _proto.waitIncreaseVolume = async function waitIncreaseVolume(ms) {
      var _this2 = this;
  
      return new Promise(function (resolve) {
        _this2.increaseVolumeTimeout = setTimeout(resolve, ms);
      });
    };
  
    _proto.waitDecreaseVolume = async function waitDecreaseVolume(ms) {
      var _this3 = this;
  
      return new Promise(function (resolve) {
        _this3.decreaseVolumeTimeout = setTimeout(resolve, ms);
      });
    };
  
    _proto.decreaseVolume = async function decreaseVolume(element, fadeDuration) {
      if (element.volume != this.getMaxVolume()) {
        console.warn('Volume is not equal to master volume');
        element.volume = this.getMaxVolume();
      }
  
      console.log('Decreasing volume');
      var fixedNumOfIterations = this.numberOfIterations;
      var incrementalValue = this.getMaxVolume() / fixedNumOfIterations;
      var numOfIterationsDec = element.volume / incrementalValue;
      var sleepTime = fadeDuration / fixedNumOfIterations;
  
      for (var i = numOfIterationsDec; i > 0; i--) {
        await this.waitDecreaseVolume(sleepTime); //element.volume = parseFloat(element.volume - incrementalValue).toPrecision(2);
        // const fadeType = document.getElementById('fadeDropdown').value;
  
        var fadeType = 'squareRoot';
        element.volume = this.modifyVolume(fadeType, i, numOfIterationsDec);
        console.log('volume', element.volume);
      }
    };
  
    _proto.increaseVolume = async function increaseVolume(element, fadeDuration) {
      if (element.volume != 0) {
        console.warn('Volume is not equal to 0, instead: ', element.volume);
        element.volume = 0;
      }
  
      console.log('Increasing volume');
      var fixedNumOfIterations = this.numberOfIterations;
      var incrementalValue = this.getMaxVolume() / fixedNumOfIterations;
      var numOfIterationsInc = fixedNumOfIterations - element.volume / incrementalValue;
      console.log('num of iterations should be 20:', numOfIterationsInc);
      var sleepTime = fadeDuration / fixedNumOfIterations;
  
      for (var i = 0; i <= numOfIterationsInc; i++) {
        await this.waitIncreaseVolume(sleepTime); // element.volume = parseFloat(element.volume + incrementalValue).toPrecision(2);
        // const fadeType = document.getElementById('fadeDropdown').value;
  
        var fadeType = 'squareRoot';
        element.volume = this.modifyVolume(fadeType, i, numOfIterationsInc);
        console.log('volume', element.volume);
      }
  
      element.volume = this.getMaxVolume();
    };
  
    _proto.modifyVolume = function modifyVolume(modifier, currentIteration, totalIterations) {
      // calculate limits from 0 to max master volume, where totalIterations is a parameter
      if (modifier === 'linear') {
        var incrementalValue = this.getMaxVolume() / totalIterations; // when linear
  
        return parseFloat(currentIteration * incrementalValue).toPrecision(2);
      } else if (modifier === 'sinusoidal') {
        var _incrementalValue = this.getMaxVolume() * 0.5 * Math.PI / totalIterations;
  
        return Math.sin(_incrementalValue * currentIteration).toFixed(2);
      } else if (modifier === 'squareRoot') {
        var _incrementalValue2 = this.getMaxVolume() / totalIterations;
  
        return Math.sqrt(_incrementalValue2 * currentIteration).toFixed(2);
      } else {
        return this.getMaxVolume();
      }
    };
  
    _proto.reset = function reset() {
      this.resetSetTimeout();
      this.isEnded = true;
      this.audio.myAudio.volume = this.getMaxVolume(); //TODO: this should not be master volume, but the volume of the current component
  
      console.log('audio volume changed', this.audio.myAudio.volume);
    };
  
    _proto.resetSetTimeout = function resetSetTimeout() {
      clearTimeout(this.waitTillFadeTimeout);
      clearTimeout(this.increaseVolumeTimeout);
      clearTimeout(this.waitDecreaseVolumeTimeout); // When this is triggered, it breaks the reference to 'setTimeout', and the promise never resolves
      // this means the for loops using this.sleep() will stop continuing to execute
      // The unreferenced promises will eventually get garbage collected
    };
  
    return SoundFade;
  }();