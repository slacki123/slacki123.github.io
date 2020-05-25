async function fadeBetweenSounds(element, fadeDuration) {
    const waitTillFade = element.duration * 1000 - fadeDuration;
    await sleep(waitTillFade);
    const numberOfIterations = 20;
    console.log('element volume', element.volume);
    await decreaseVolume(element, numberOfIterations, fadeDuration);
    await increaseVolume(element, numberOfIterations, fadeDuration);

}

async function decreaseVolume(element, numberOfIterations, fadeDuration) {
    if (element.volume != 1) {
        console.warn('Volume is not equal to 1');
        element.volume = 1;
    }
    console.log('Decreasing volume');
    const fixedNumOfIterations = numberOfIterations;
    const incrementalValue = 1 / fixedNumOfIterations;
    const numOfIterationsDec = element.volume / incrementalValue;
    let sleepTime = fadeDuration / fixedNumOfIterations;
    for (let i = numOfIterationsDec; i > 0; i--) {
        await sleep(sleepTime);
        //element.volume = parseFloat(element.volume - incrementalValue).toPrecision(2);
        const fadeType = localStorage.getItem('fadeDropdownValue') || document.getElementById('fadeDropdown').value;
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
    const incrementalValue = 1 / fixedNumOfIterations;
    const numOfIterationsInc = fixedNumOfIterations - (element.volume / incrementalValue);
    console.log('num of iterations should be 20:', numOfIterationsInc);
    let sleepTime = fadeDuration / fixedNumOfIterations;
    for (let i = 0; i < numOfIterationsInc; i++) {
        await sleep(sleepTime);
        // element.volume = parseFloat(element.volume + incrementalValue).toPrecision(2);
        const fadeType = localStorage.getItem('fadeDropdownValue') || document.getElementById('fadeDropdown').value;
        element.volume = modifyVolume(fadeType, i, numOfIterationsInc);
        console.log('volume', element.volume);
    }
    element.volume = 1;
}

function modifyVolume(modifier, currentIteration, totalIterations) {
    // calculate limits from 0 to 1, where totalIterations is a parameter
    if (modifier === 'linear') {
        const incrementalValue = 1 / totalIterations; // when linear
        return parseFloat(currentIteration * incrementalValue).toPrecision(2);
    } else if (modifier === 'sinusoidal') {
        const incrementalValue = 0.5 * Math.PI / totalIterations;
        return Math.sin(incrementalValue * currentIteration).toFixed(2);
    } else if (modifier === 'squareRoot') {
        const incrementalValue = 1 / totalIterations;
        return Math.sqrt(incrementalValue * currentIteration).toFixed(2);
    } else {
        return 1;
    }
}