const { solveInverseCaptchaA, solveInverseCaptchaB } = require('./inverse-captcha');
const puzzleInput = require('./puzzleInput');

describe('solveInverseCaptchaA', () => {
    it('returns a number', () => {
        expect(solveInverseCaptchaA(0)).toBe(0);
    });

    it('returns the addition of two identical numbers when they are passed as the only pair', () => {
        expect(solveInverseCaptchaA(11)).toBe(2);
    });

    it('returns 0 when passed two non-identical numbers', () => {
        expect(solveInverseCaptchaA(12)).toBe(0);
    });

    it('returns the addition of two pairs of identical numbers', () => {
        expect(solveInverseCaptchaA(1122)).toBe(3);
    });

    it('makes an extra addition if the start number is the same as the end number', () => {
        expect(solveInverseCaptchaA(1111)).toBe(4);
        expect(solveInverseCaptchaA(91212129)).toBe(9);
    });

    it('only accounts for single number pairs and ignores double-digit or higher pairs', () => {
        expect(solveInverseCaptchaA(3434989810210255)).toBe(5);
    });

    it('solves the advent of code puzzle input', () => {
        expect(solveInverseCaptchaA(puzzleInput)).toBe(1223);
    });
})

describe('solveInverseCaptchaB', () => {
    it('returns a number', () => {
        expect(solveInverseCaptchaB(0)).toBe(0);
    });

    it('returns the addition of two evenly-spaced numbers when passed a sequence of 4', () => {
        expect(solveInverseCaptchaB(1213)).toBe(2);
    });

    it('returns the addition of two pairs of numbers when they are passed as the only pairs', () => {
        expect(solveInverseCaptchaB(1212)).toBe(6);
    });

    it('returns 0 when passed four non-matching numbers', () => {
        expect(solveInverseCaptchaB(1221)).toBe(0);
    });

    it('returns an addition when some numbers match and others do not', () => {
        expect(solveInverseCaptchaB(1122)).toBe(0);
        expect(solveInverseCaptchaB(123425)).toBe(4);
        expect(solveInverseCaptchaB(123123)).toBe(12);
        expect(solveInverseCaptchaB(12131415)).toBe(4);
    });

    it('solves the advent of code puzzle input', () => {
        expect(solveInverseCaptchaB(puzzleInput)).toBe(1284);
    });
})