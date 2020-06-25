class SoundFade {
    increaseVolumeTimeout;
    decreaseVolumeTimeout;
    waitTillFadeTimeout;
    isEnded = false;
    increment = 0;
    fadeDuration = 2000;
    componentVolume = document.getElementById('componentVolume');
    componentVolume; //TODO: Need to implement first
    audio;
    numberOfIterations = 20;

    constructor(audio) {
        this.audio = audio;
        this.componentVolume = audio.volumeSlider;
    }

    async fadeBetweenSounds(audio) {
        const duration = audio.duration * 1000;
    
        if(duration < this.fadeDuration*2) {
            this.fadeDuration = duration/4;  
            return; // don't do fades for short clips
        }
        const waitTillFade = duration - this.fadeDuration*2;
        console.log('audio Duration', duration);
        console.log('wait till fade', waitTillFade)
        console.log('audio volume', audio.volume);
        let t0 = performance.now();
        await this.increaseVolume(audio, this.fadeDuration);
        let t1 = performance.now()
        console.log('time taken for increase', t1 - t0);
        console.log(this.fadeDuration);
        console.log('waiting for fade');
        
        await this.waitTillFade(waitTillFade);
        console.log('sleep done');
        
        await this.decreaseVolume(audio, this.fadeDuration);
    

    }

    async waitTillFade(ms) {
        return new Promise(resolve => {
           this.waitTillFadeTimeout = setTimeout(resolve, ms);
        });
    }

    async waitIncreaseVolume(ms) {
        return new Promise(resolve => {
            this.increaseVolumeTimeout = setTimeout(resolve, ms);
         });
    }

    async waitDecreaseVolume(ms) {
        return new Promise(resolve => {
            this.decreaseVolumeTimeout = setTimeout(resolve, ms);
         });
    }

    async decreaseVolume(element, fadeDuration) {
        if (element.volume != this.componentVolume.value/100) {
            console.warn('Volume is not equal to master volume');
            element.volume = this.componentVolume.value/100;
        }
        console.log('Decreasing volume');
        const fixedNumOfIterations = this.numberOfIterations;
        const incrementalValue = this.componentVolume.value/100 / fixedNumOfIterations;
        const numOfIterationsDec = element.volume / incrementalValue;
        let sleepTime = fadeDuration / fixedNumOfIterations;
        for (let i = numOfIterationsDec; i > 0; i--) {
            await this.waitDecreaseVolume(sleepTime);
            //element.volume = parseFloat(element.volume - incrementalValue).toPrecision(2);
            // const fadeType = document.getElementById('fadeDropdown').value;
            const fadeType = 'squareRoot';
            element.volume = this.modifyVolume(fadeType, i, numOfIterationsDec);
            console.log('volume', element.volume);
        }
    }
    
    async increaseVolume(element, fadeDuration) {
        if (element.volume != 0) {
            console.warn('Volume is not equal to 0, instead: ', element.volume);
            element.volume = 0;
        }
        console.log('Increasing volume');
        const fixedNumOfIterations = this.numberOfIterations;
        const incrementalValue = this.componentVolume.value/100 / fixedNumOfIterations;
        const numOfIterationsInc = fixedNumOfIterations - (element.volume / incrementalValue);
        console.log('num of iterations should be 20:', numOfIterationsInc);
        let sleepTime = fadeDuration / fixedNumOfIterations;
        for (let i = 0; i <= numOfIterationsInc; i++) {
            await this.waitIncreaseVolume(sleepTime);
            // element.volume = parseFloat(element.volume + incrementalValue).toPrecision(2);
            // const fadeType = document.getElementById('fadeDropdown').value;
            const fadeType = 'squareRoot';
            element.volume = this.modifyVolume(fadeType, i, numOfIterationsInc);
            console.log('volume', element.volume);
        }
        element.volume = this.componentVolume.value/100;
    }

    modifyVolume(modifier, currentIteration, totalIterations) {
        // calculate limits from 0 to max master volume, where totalIterations is a parameter
        if (modifier === 'linear') {
            const incrementalValue = this.componentVolume.value/100 / totalIterations; // when linear
            return parseFloat(currentIteration * incrementalValue).toPrecision(2);
        } else if (modifier === 'sinusoidal') {
            const incrementalValue = this.componentVolume.value/100 * 0.5 * Math.PI / totalIterations;
            return Math.sin(incrementalValue * currentIteration).toFixed(2);
        } else if (modifier === 'squareRoot') {
            const incrementalValue = this.componentVolume.value/100 / totalIterations;
            return Math.sqrt(incrementalValue * currentIteration).toFixed(2);
        } else {
            return this.componentVolume.value/100;
        }
    }

    
    reset() {
        this.resetSetTimeout();
        this.isEnded = true;
        this.audio.myAudio.volume = this.componentVolume.value/100; //TODO: this should not be master volume, but the volume of the current component
        console.log('audio volume changed', this.audio.myAudio.volume)
    }

    resetSetTimeout() {
        clearTimeout(this.waitTillFadeTimeout); 
        clearTimeout(this.increaseVolumeTimeout);
        clearTimeout(this.waitDecreaseVolumeTimeout);
        // When this is triggered, it breaks the reference to 'setTimeout', and the promise never resolves
        // this means the for loops using this.sleep() will stop continuing to execute
        // The unreferenced promises will eventually get garbage collected
    }
}