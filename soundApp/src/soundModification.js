const masterVolume = document.getElementById('masterVolume');

async function fadeBetweenSounds(element, fadeDuration) {
    const waitTillFade = element.duration * 1000 - fadeDuration;
    await sleep(waitTillFade);
    const numberOfIterations = 20;
    console.log('element volume', element.volume);
    await decreaseVolume(element, numberOfIterations, fadeDuration);
    await increaseVolume(element, numberOfIterations, fadeDuration);

}

async function decreaseVolume(element, numberOfIterations, fadeDuration) {
    if (element.volume != parseInt(masterVolume.value)/100) {
        console.warn('Volume is not equal to master volume');
        element.volume = parseInt(masterVolume.value)/100;
    }
    console.log('Decreasing volume');
    const fixedNumOfIterations = numberOfIterations;
    const incrementalValue = parseInt(masterVolume.value)/100 / fixedNumOfIterations;
    const numOfIterationsDec = element.volume / incrementalValue;
    let sleepTime = fadeDuration / fixedNumOfIterations;
    for (let i = numOfIterationsDec; i > 0; i--) {
        await sleep(sleepTime);
        //element.volume = parseFloat(element.volume - incrementalValue).toPrecision(2);
        // const fadeType = document.getElementById('fadeDropdown').value;
        const fadeType = 'squareRoot';
        element.volume = modifyVolume(fadeType, i, numOfIterationsDec);
        console.log('volume', element.volume);
    }
}

async function increaseVolume(element, numberOfIterations, fadeDuration) {
    if (element.volume != 0) {
        console.warn('Volume is not equal to 0, instead: ', element.volume);
        element.volume = 0;
    }
    console.log('Increasing volume');
    const fixedNumOfIterations = numberOfIterations;
    const incrementalValue = parseInt(masterVolume.value)/100 / fixedNumOfIterations;
    const numOfIterationsInc = fixedNumOfIterations - (element.volume / incrementalValue);
    console.log('num of iterations should be 20:', numOfIterationsInc);
    let sleepTime = fadeDuration / fixedNumOfIterations;
    for (let i = 0; i <= numOfIterationsInc; i++) {
        await sleep(sleepTime);
        // element.volume = parseFloat(element.volume + incrementalValue).toPrecision(2);
        // const fadeType = document.getElementById('fadeDropdown').value;
        const fadeType = 'squareRoot';
        element.volume = modifyVolume(fadeType, i, numOfIterationsInc);
        console.log('volume', element.volume);
    }
    element.volume = parseInt(masterVolume.value)/100;
}

function modifyVolume(modifier, currentIteration, totalIterations) {
    // calculate limits from 0 to max master volume, where totalIterations is a parameter
    if (modifier === 'linear') {
        const incrementalValue = parseInt(masterVolume.value)/100 / totalIterations; // when linear
        return parseFloat(currentIteration * incrementalValue).toPrecision(2);
    } else if (modifier === 'sinusoidal') {
        const incrementalValue = parseInt(masterVolume.value)/100 * 0.5 * Math.PI / totalIterations;
        return Math.sin(incrementalValue * currentIteration).toFixed(2);
    } else if (modifier === 'squareRoot') {
        const incrementalValue = parseInt(masterVolume.value)/100 / totalIterations;
        return Math.sqrt(incrementalValue * currentIteration).toFixed(2);
    } else {
        return parseInt(masterVolume.value)/100;
    }
}