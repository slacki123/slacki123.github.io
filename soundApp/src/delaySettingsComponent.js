class DelaySettings {
    // divName;
    // div;
    // targetDiv;
    // randomDelaySwitch;
    // delayTimeout;
    // maxDelay;
    // maxDelayInput;
    // randomChecked;

    resolveDelay = () => {};

    constructor(component) {
        this.divName = component.divName;
    }

    createDelaySettingsTemplate(divName) {
        const delaySettingsTemplate = 
        `
        <label class="randomTimeInput">
            Max Delay (seconds):<input type='number' min='0' value='0' id='${divName}MaxDelayTime' class="delayTimeInput">
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
        this.maxDelay = 0;
        this.resetDelay();
    }

    initDelayValues() {
        this.randomDelaySwitch = document.getElementById(`${this.divName}RandomDelaySwitch`);
        this.maxDelayInput = document.getElementById(`${this.divName}MaxDelayTime`)
        this.maxDelayInput.oninput = () => {
            this.maxDelay = this.maxDelayInput.value;
        }
        this.randomDelaySwitch.onclick = () => {
            this.maxDelay = this.maxDelayInput.value;
            if(this.randomDelaySwitch.checked == true) {
                this.randomChecked = true;
                //TODO: Potentially add another component to specify 'minimum' delay time
            } else {
                this.randomChecked = false;
            }
        }
    }

    async setDelay(){
        if(this.randomChecked == true) {
            this.maxDelay = (Math.random()*this.maxDelayInput.value);
            console.log(`Random delayed enabled for ${this.divName}, maxDelay is ${this.maxDelay} sec`);
        }
        console.log(`Delay for ${this.divName}, maxDelay is ${this.maxDelay} sec`);
        await this.delay(this.maxDelay*1000);
    }

    resetDelay() {
        clearTimeout(this.delayTimeout);
        this.resolveDelay();
    }

    async delay(ms) {
        return new Promise(resolve => {
           this.delayTimeout = setTimeout(resolve, ms);
           this.resolveDelay = resolve; // testing this extra resolve. Mabye will fix premature stop playing time issue
        });
    }



}