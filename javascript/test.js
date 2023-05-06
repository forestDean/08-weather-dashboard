// Timestamp in seconds
var unixTimestamp = 1683396000;

/* Create a new JavaScript Date object based on Unix timestamp.
Multiplied it by 1000 to convert it into milliseconds & create Date object */
var date = new Date(unixTimestamp * 1000);


// Generate date string
console.log(date.toLocaleDateString("en-US"));   // Prints: 5/6/2022
console.log(date.toLocaleDateString("en-GB"));   // Prints: 06/05/2022
console.log(date.toLocaleDateString("default")); // Prints: 5/6/2022

// Generate time string
console.log(date.toLocaleTimeString("en-US"));   // Prints: 1:10:34 PM
console.log(date.toLocaleTimeString("it-IT"));   // Prints: 13:10:34
console.log(date.toLocaleTimeString("default")); // Prints: 1:10:34 PM