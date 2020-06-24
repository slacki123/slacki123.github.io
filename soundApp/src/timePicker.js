$(function () {
    $('#durationExample').timepicker({
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

function updateTimePickerDropdown() {
    $('#durationExample').timepicker('option', 'minTime', new Date());
}

let globalSetTimeout;
function setStopPlayingTime(myAudio) {
    clearTimeout(globalSetTimeout);
    console.log('interval cleared');
    const stopPlayingAtTime = $('#durationExample').val();
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
    globalSetTimeout = setTimeout(() => { stopAudio(myAudio) }, stopInMilliseconds);
    console.log('The recording will stop playing in this many hours: ', stopInMilliseconds/(1000*60*60));

}