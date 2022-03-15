# Repose-Record Kata

## Solution Description

The solution in `repose-record.js` is designed to work in the following way:
- Get the (unordered) `puzzleInput` file contents, and order them chronologically
    - For the sort function, a reusable `epochify` function turns each entry's timestamp into a Unix time value
    - All timestamps in the data are from 1518. Since Unix times prior to 14 September 1752 can be unreliable, a placeholder year of 1970 has been used in the `epochify` function
- Once the data is sorted correctly, a single loop is used to build two reference objects:
    - One that tracks total minutes spent asleep per guard (calculated via Unix times with the `epochify` function)
    - One that counts the frequencies of individual minutes spent asleep per guard
- From the first reference object, the guard with the most sleep time is calculated
- From the second reference object, the guard with the highest frequency single minute is calculated
- A reusable function `mostFrequentMinuteFinder` is then used to find each of these guards' most-commonly-asleep minute value
- From these values, `solution1` and `solution2` are calculated.

### Sample reference objects
```js
const totalSleepPerGuard = {
    '#0001': 125000,
    '#1324': 250000,
    '#0731': 50000
}
```

```js
const minuteFreqTracker = {
    '#0001': {
        '01': 1,
        '02': 2,
        '03': 1
    },
    '#1324': {
        '15': 3,
        '16': 2,
        '31': 2,
        '59': 1
    },
    '#0371': {
        '46': 5
    }
}
```



### Notes
- The function has been written with a goal of minimising complexity. The `sort()` operation is the most expensive aspect of the function. Otherwise all operations are linear and minimise/reuse loops where possible.
- There are two reusable functions within this file. Since these are both <= 5 lines, and are very specific to the format of this kata, it did not seem worth extracting them to a `utils` file, only to require them back in.
- This solution is a refactor of a previous attempt. The first attempt worked but took slightly longer to execute, due to building the reference objects in 2 separate loops. It also used more helper variables than the final attempt uses.