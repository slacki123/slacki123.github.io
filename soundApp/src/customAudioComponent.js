class CustomAudioComponent extends AudioComponent {
    // fileUploadComponent;
    // audioUploadButton;
    // divName;
    // divHTML;

    constructor(divName, settingsConfig) {
        const initialSoundTracks = [] // In the future would want to extract from data base or local storage;
        super(divName, initialSoundTracks, settingsConfig);
        this.isCustom = true;
        this.divName = divName;
        this.generateAudioUploadTemplate(divName);
        this.initAudioUpload();
        

    }

    generateAudioUploadTemplate(divName) {
        const fileUploadTemplate = 
        `
        <div id='${divName}AudioUploadDiv'>
            <span> UPLOAD YOUR OWN CUSTOM SOUNDS! </span> 
            <br>
           <input type='file' id='${divName}AudioUpload' multiple accept='audio/*'>
        </div>
        `;
        this.divHTML = document.getElementById(`${divName}Text`); //This is probably bad practice, because my html will always be inserted after this text tag
        this.divHTML.insertAdjacentHTML('afterend', fileUploadTemplate);
    }

    initAudioUpload() {
        this.audioUploadButton = document.getElementById(`${this.divName}AudioUpload`);
        this.audioUploadButton.onchange = (event) => {
            const numberOfFiles = event.target.files.length;
            for(let i = 0; i < numberOfFiles; i++) {
                const file = event.target.files[i];
                const source = URL.createObjectURL(file);
                console.log('files', source);
                this.soundTracks.push(source);
            }
    
            // localStorage.setItem('customURLArray', JSON.stringify(urlArray)); // so that we could retrieve it later ;) // nah doesn't work
            // after reload new url ids are created anyway
    
        }
    }

    



}