class DelaySettings {
    divName;
    div;
    targetDiv;
    randomDelaySwitch;
    delayTimeout;
    maxDelay;
    maxDelayInput;

    constructor(component) {
        this.divName = component.divName;
    }

    createDelaySettingsTemplate(divName) {
        const delaySettingsTemplate = 
        `
        <label class="randomTimeInput">
            Time delay (seconds):<input type='number' min='0' value='0' id='${divName}MaxDelayTime' class="delayTimeInput">
            <span>Random Delay</span> <input id='${divName}RandomDelaySwitch' type="checkbox"> 
            <span class="delay-slider round"></span>
        </label>
        `

        return delaySettingsTemplate;
    }

    show() {
        this.div = this.createDelaySettingsTemplate(this.divName);
        this.targetDiv = document.getElementById(`${this.divName}DelaySwitchSettings`); 
        this.targetDiv.insertAdjacentHTML('afterbegin', this.div);
        this.initDelayValues();
        console.log(this.targetDiv);
    }

    hide() {
        this.targetDiv.innerHTML = "";
    }

    initDelayValues() {
        this.randomDelaySwitch = document.getElementById(`${this.divName}RandomDelaySwitch`);
        this.maxDelayInput = document.getElementById(`${this.divName}MaxDelayTime`)
        this.maxDelayInput.oninput = () => {
            this.maxDelay = this.maxDelayInput.value;
        }
        this.randomDelaySwitch.onclick = () => {
            if(this.randomDelaySwitch.checked == false) { // counterintuitive, but when you first click before it ticks, it's actually false
                // display random
              console.log('checked true')
            } else {
              console.log('hide random');
            }
        }
    }

    async setDelay(){
        //if(this.component.checked == true){
            console.log('delay triggered');
            await this.delay(this.maxDelay*1000);
            console.log('delay ended')
        //}
    }

    resetDelay() {
        clearTimeout(this.delayTimeout);
    }

    async delay(ms) {
        return new Promise(resolve => {
           this.delayTimeout = setTimeout(resolve, ms);
        });
    }



}