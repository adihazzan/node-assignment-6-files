// developers: sharbel jadoun, adi hazzan
const fs = require('fs');
const path = require('path');

// Define the input directory path
const dirPath = path.join(__dirname, 'input');
let result = []; // This is the array we are going to add the lines to from each file

// Arrays to store lines of all 3 files and their current pointer positions
let allFilesLines = [];
let filePointers = [0, 0, 0]; 

// Load the 3 files into memory
for (let fileIdx = 1; fileIdx <= 3; fileIdx++) {
    const filePath = path.join(dirPath, `a${fileIdx}.txt`);
    
    if (fs.existsSync(filePath)) {
        const textIn = fs.readFileSync(filePath, 'utf-8'); // Read the text from the files one by one
        let lines = textIn.split(/\r?\n/); // Split the text into lines 

        if (lines.length > 0 && lines[lines.length - 1] === '') {
            lines.pop(); // Clean the empty trailing line if it exists
        }
        allFilesLines.push(lines);
    } else {
        allFilesLines.push([]);
        console.log(`Warning: File a${fileIdx}.txt not found.`);
    }
}

let i = 1; // Number of lines to take from each file in the current round (increases each round: 1, 2, 3...)
let keepGoing = true;

// Main loop running the rounds until all files are fully read
while (keepGoing) {
    let linesTakenInThisRound = 0; // Tracks how many lines were successfully read in this round

    // Iterate through each of the 3 files in the current round
    for (let f = 0; f < 3; f++) {
        let lines = allFilesLines[f];
        let pointer = filePointers[f];
        let taken = 0;

        // Take up to 'i' lines from the current file starting from the current pointer
        while (taken < i && pointer < lines.length) {
            result.push(lines[pointer]);
            pointer++;
            taken++;
            linesTakenInThisRound++; // Increment lines taken count
        }

        // Update the pointer for this file
        filePointers[f] = pointer;
    }

    // If no lines were taken from any file in this round, it means all files are finished
    if (linesTakenInThisRound === 0) {
        keepGoing = false;
    }

    i++; // Increase the number of lines for the next round
}

// Create the output file (output.txt) in the main directory
const outputPath = path.join(__dirname, 'output.txt');
fs.writeFileSync(outputPath, result.join('\n'), 'utf-8'); 

console.log('Success');