class Timepicker {
    globalSetTimeout;

    constructor(timePickerElement) {
        this.timePickerElement = timePickerElement;
        $(function () {
            $('#' + this.timePickerElement).timepicker({
                'minTime': new Date(),
                'showDuration': true,
                'step': 10,
                'timeFormat': 'H:i',
                'noneOption': [
                    {
                        'label': 'Never Stop',
                        'className': 'neverStop',
                        'value': ''
                    }
                ]
            });
        });
        
    }

    updateTimePickerDropdown() {
        $('#' + this.timePickerElement).timepicker('option', 'minTime', new Date());
    }

    setStopPlayingTime(myAudio, textElement) {
        clearTimeout(this.globalSetTimeout);
        console.log('interval cleared');
        const stopPlayingAtTime = $('#' + this.timePickerElement).val();
        console.log('Stop playing at: ' + stopPlayingAtTime);
        if (stopPlayingAtTime == '') {
            return;
        }
        const hours = parseInt(stopPlayingAtTime.split(':')[0]);
        const minutes = parseInt(stopPlayingAtTime.split(':')[1]);
        const timeNowMillis = new Date().getTime();
        const stopAtMillis = new Date().setHours(hours, minutes);
        const nowTillStopDifference = stopAtMillis - timeNowMillis;
        const nowTillStopDifferencePlusOne = new Date().setHours(hours + 24, minutes) - timeNowMillis;
        const timeDifference = nowTillStopDifference < 0 ? nowTillStopDifferencePlusOne : nowTillStopDifference;
        console.log('timeDifference', timeDifference);
        const stopInMilliseconds =  timeDifference;
        this.globalSetTimeout = setTimeout(() => { stopAudio(myAudio, textElement) }, stopInMilliseconds);
        console.log('The ' + myAudio.id+ ' recording will stop playing in this many hours: ', stopInMilliseconds/(1000*60*60));
    
    }

}

const birdsTimepicker = document.getElementById('birdsDuration');
let birdsTimepickerObject = new Timepicker('birdsDuration')
birdsTimepicker.onclick = function() {
    birdsTimepickerObject.updateTimePickerDropdown();
}
birdsTimepicker.onchange = function() {
    birdsTimepickerObject.setStopPlayingTime(birdsAudio, birdsText);
    birdsTimepickerObject = new Timepicker('birdsDuration');
}

const voiceTimepicker = document.getElementById('voiceDuration');
let voiceTimepickerObject = new Timepicker('voiceDuration')
voiceTimepicker.onclick = function() {
    voiceTimepickerObject.updateTimePickerDropdown();
}
voiceTimepicker.onchange = function() {
    voiceTimepickerObject.setStopPlayingTime(voiceAudio, voiceText);
    voiceTimepickerObject = new Timepicker('voiceDuration')
}