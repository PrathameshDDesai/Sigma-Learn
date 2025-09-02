// Array of numbers
let numbers = [2, 7, 11, 15, 3, 6, 8];

// Take input from user for target sum
let target = Number(prompt("Enter the target sum:"));

// Function to find pair that sums to target
function findPair(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [arr[i], arr[j]]; // Return the first pair found
            }
        }
    }
    return null;
}

let result = findPair(numbers, target);

if (result) {
    console.log(`Pair found: ${result[0]}, ${result[1]}`);
} else {
    console.log("No pair found");
}
