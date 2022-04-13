function solveInverseCaptchaA (nums) {
    let total = 0;

    const numArray = `${nums}`.split('').map(elem => +elem);

    for (let i = 1; i < numArray.length; i++) {
        if (numArray[i] === numArray[i - 1]) {
            total += numArray[i];
        }
    }

    if (numArray[0] === numArray[numArray.length - 1]) {
        total += numArray[0];
    }

    return total;
}

function solveInverseCaptchaB (nums) {
    let total = 0;

    const numArray = `${nums}`.split('').map(elem => +elem);

    const halfwayAround = numArray.length / 2;

    for (let i = 0; i < halfwayAround; i++) {
        if (numArray[i] === numArray[i + halfwayAround]) {
            total += numArray[i] * 2;
        }
    }

    return total;
}

module.exports = { solveInverseCaptchaA, solveInverseCaptchaB };