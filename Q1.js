const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Q1.html'));
});

//(A) Function: findSummation
//default value is set to 1 
function findSummation(N = 1) {
    if (typeof N !== 'number' || N <= 0 || !Number.isInteger(N)) {
        return false;
    }
    let sum = 0;
    for (let i = 1; i <= N; i++) {
        sum += i;
    }
    return sum;
}
//(B) Function: uppercaseFirstandLast
function uppercaseFirstandLast(str) {
    if (typeof str !== 'string' || str.trim().length === 0) {
        return '';
    }
    return str.split(' ').map(word => {
        if (word.length === 1) {
            return word.toUpperCase();
        }
        return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
    }).join(' ');
}
// (C) Function: findAverageAndMedian
function findAverageAndMedian(arr) {
    if (!Array.isArray(arr) || arr.some(item => typeof item !== 'number')) {
        return { average: null, median: null };
    }

    const average = arr.reduce((a, b) => a + b, 0) / arr.length;

    arr.sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);
    const median = arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;

    return { average, median };
}
//(D) Function: find4Digits
function find4Digits(str) {
    if (typeof str !== 'string') {
        return false;
    }
    const fourDigitMatch = str.split(' ').find(num => /^\d{4}$/.test(num));
    return fourDigitMatch || false;
}

app.post('/findSummation', (req, res) => {
    const { number } = req.body;
    const result = findSummation(Number(number));
    res.send(`Summation: ${result}`);
});

app.post('/uppercaseFirstandLast', (req, res) => {
    const { text } = req.body;
    const result = uppercaseFirstandLast(text);
    res.send(`Modified String: ${result}`);
});

app.post('/findAverageAndMedian', (req, res) => {
    const { numbers } = req.body;

    if (typeof numbers !== 'string') {
        return res.status(400).send('Invalid input format. Expected a string of numbers.');
    }

    try {
        // Parsing the string into an array of numbers
        const numberArray = JSON.parse(numbers);

        if (!Array.isArray(numberArray) || numberArray.some(item => typeof item !== 'number' || isNaN(item))) {
            return res.status(400).send('Invalid input. Expected an array of numbers.');
        }

        const result = findAverageAndMedian(numberArray);

        res.send(`Average: ${result.average}, Median: ${result.median}`);
    } catch (e) {
        res.status(400).send('Error parsing input. Make sure it is a valid JSON array.');
    }
});



app.post('/find4Digits', (req, res) => {
    const { text } = req.body;
    const result = find4Digits(text);
    res.send(`First Four-Digit Number: ${result}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
