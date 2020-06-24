class Timepicker {
    globalSetTimeout;

    constructor(timePickerElement) {
        this.timePickerElement = timePickerElement;
        $(() => { //changing this from function() to () => changes the CSS layout
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

    setStopPlayingTime(audioComponent) {
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
        this.globalSetTimeout = setTimeout(() => { audioComponent.stopAudio() }, stopInMilliseconds);
        console.log('The ' + audioComponent.myAudio.id+ ' recording will stop playing in this many hours: ', stopInMilliseconds/(1000*60*60));
    
    }

}