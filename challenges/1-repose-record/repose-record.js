const fs = require('fs').promises;

async function reposeRecord (data) {

    // Get file contents and order chronologically
    const fileContents = await fs.readFile('./puzzleInput.txt', 'utf8');
    const recordsArray = fileContents.split(/\n/);
    const epochify = (entry) => {
        const numbersArray = entry.slice(6, 17).match(/\d+/g);
        numbersArray[0]--;
        const epoch = Date.UTC(1970, ...numbersArray);
        return epoch;
    };
    const sortedRecordsArray = recordsArray.sort((a, b) => {
        return epochify(a) - epochify(b);
    });


    // Build reference objects x2, for total sleep time & minute frequencies...
    const totalSleepPerGuard = {}; // { guardId: totalSleepTime }
    const minuteFreqTracker = {}; // { guardId: { mm: freq } }
    
    let currentGuard = '';
    let asleepTime = 0;
    let wakeTime = 0;
    
    for (let i = 0; i < sortedRecordsArray.length; i++) {
        if (sortedRecordsArray[i].endsWith('shift')) {
            currentGuard = sortedRecordsArray[i].match(/#\d+/g)[0];
            if (!minuteFreqTracker.hasOwnProperty(currentGuard)) minuteFreqTracker[currentGuard] = {};
        } else if (sortedRecordsArray[i].endsWith('asleep')) {
            asleepTime = epochify(sortedRecordsArray[i]);
            const startMinute = Number(sortedRecordsArray[i].slice(15, 17));
            const endMinute = Number(sortedRecordsArray[i + 1].slice(15, 17));
            for(let i = startMinute; i < endMinute; i++) {
                minuteFreqTracker[currentGuard][i] = minuteFreqTracker[currentGuard][i] + 1 || 1;
            };
        } else if (sortedRecordsArray[i].endsWith('wakes up')) {
            wakeTime = epochify(sortedRecordsArray[i]);
            const newMins = wakeTime - asleepTime;
            totalSleepPerGuard[currentGuard] = totalSleepPerGuard[currentGuard] + newMins || newMins;
            wakeTime = 0;
            asleepTime = 0;
        };
    };

    // Determine guard with most sleep time overall
    const highestSleepTime = Math.max(...Object.values(totalSleepPerGuard));
    const sleepiestGuard = Object.entries(totalSleepPerGuard).find(guard => guard[1] === highestSleepTime)[0];
    
    // Determine guard with most consistent sleep schedule
    let highestMinuteCount = 0;
    let mostConsistentlyAsleepGuard = '';

    for (const guard in minuteFreqTracker) {
        const thisGuardsPB = Math.max(...Object.values(minuteFreqTracker[guard]));
        if (thisGuardsPB > highestMinuteCount) {
            highestMinuteCount = thisGuardsPB;
            mostConsistentlyAsleepGuard = guard;
        };
    };

    // Reusable function to find a guard's most frequent minute of sleep-time
    const mostFrequentMinuteFinder = (guard) => {
        const highestCountFrequency = Math.max(...Object.values(minuteFreqTracker[guard]));
        const mostFrequentMinute = Object.entries(minuteFreqTracker[guard]).find(guard => guard[1] === highestCountFrequency)[0];
        return mostFrequentMinute;
    };
    
    const solution1 = sleepiestGuard.substring(1) * mostFrequentMinuteFinder(sleepiestGuard);
    const solution2 = mostConsistentlyAsleepGuard.substring(1) * mostFrequentMinuteFinder(mostConsistentlyAsleepGuard);

    console.log(`The sleepiest guard is ${sleepiestGuard} and the time they are most likely to be asleep is minute ${mostFrequentMinuteFinder(sleepiestGuard)}`);
    console.log(`The most consistently asleep guard is ${mostConsistentlyAsleepGuard} and the time they are most likely to be asleep is minute ${mostFrequentMinuteFinder(mostConsistentlyAsleepGuard)}`);
    console.log(`The answer to the challenge 1 is ${solution1}`);
    console.log(`The answer to the challenge 2 is ${solution2}`);

}

reposeRecord();