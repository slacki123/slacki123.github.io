var Timepicker = /*#__PURE__*/function () {
    "use strict";
  
    // globalSetTimeout;
    // stopPlayingIn;
    function Timepicker(timePickerElement) {
      var _this = this;
  
      this.timePickerElement = timePickerElement;
      $(function () {
        //changing this from function() to () => changes the CSS layout, but it doesn't work
        $('#' + _this.timePickerElement).timepicker({
          'minTime': new Date(),
          'showDuration': true,
          'step': 10,
          'timeFormat': 'H:i',
          'noneOption': [{
            'label': 'Never Stop',
            'className': 'neverStop',
            'value': ''
          }]
        });
      });
    }
  
    var _proto = Timepicker.prototype;
  
    _proto.updateTimePickerDropdown = function updateTimePickerDropdown() {
      $('#' + this.timePickerElement).timepicker('option', 'minTime', new Date());
    };
  
    _proto.checkStopInTime = function checkStopInTime() {
      return this.stopPlayingIn;
    };
  
    _proto.setStopPlayingTime = function setStopPlayingTime(audioComponent) {
      clearTimeout(this.globalSetTimeout);
      console.log('interval cleared');
      var stopPlayingAtTime = $('#' + this.timePickerElement).val();
      console.log('Stop playing at: ' + stopPlayingAtTime);
  
      if (stopPlayingAtTime == '') {
        return;
      }
  
      var hours = parseInt(stopPlayingAtTime.split(':')[0]);
      var minutes = parseInt(stopPlayingAtTime.split(':')[1]);
      var timeNowMillis = new Date().getTime();
      var stopAtMillis = new Date().setHours(hours, minutes);
      var nowTillStopDifference = stopAtMillis - timeNowMillis;
      var nowTillStopDifferencePlusOne = new Date().setHours(hours + 24, minutes) - timeNowMillis;
      var timeDifference = nowTillStopDifference < 0 ? nowTillStopDifferencePlusOne : nowTillStopDifference;
      console.log('timeDifference', timeDifference);
      var stopInMilliseconds = timeDifference;
      this.stopPlayingIn = stopInMilliseconds;
      this.globalSetTimeout = setTimeout(function () {
        audioComponent.stopAudio();
      }, stopInMilliseconds);
      console.log('The ' + audioComponent.myAudio.id + ' recording will stop playing in this many hours: ', stopInMilliseconds / (1000 * 60 * 60));
    };
  
    return Timepicker;
  }();