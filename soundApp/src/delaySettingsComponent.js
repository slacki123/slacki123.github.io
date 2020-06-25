class DelaySettings {
    divName;
    div;
    targetDiv;

    constructor(component) {
        this.divName = component.divName;
    }

    createDelaySettingsTemplate(divName) {
        const delaySettingsTemplate = 
        `
        <div>test</div>
        `

        return delaySettingsTemplate;
    }

    show() {
        this.div = this.createDelaySettingsTemplate(this.divName);
        this.targetDiv = document.getElementById(this.divName + 'DelaySwitchSettings'); 
        this.targetDiv.insertAdjacentHTML('afterbegin', this.div);
        console.log(this.targetDiv);
    }

    hide() {
        this.targetDiv.innerHTML = "";
    }

    

}