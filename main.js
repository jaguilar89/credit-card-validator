// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
function validateCred(array) {
  const isEven = (count) => count % 2 === 0; //checks if value of current 'count' is an even number.
  let newArray = [];
  let count = 1; //counter variable(starts at 1) that counts up as we iterate through the array with for loop.
  for (let i = array.length - 1; i >= 0; i--) { //iterates from right to left. After 1st number, every other number is doubled. Even 'count' values in the array are doubled, then pushed into newArray. Odd values are skipped and pushed directly to newArray.
  	if (isEven(count)) {  
    	let j = array[i] * 2;
      if (j > 9) j = j - 9;
      newArray.push(j);
      count++
    } else {
    	newArray.push(array[i]);
      count++
    }
  }
  console.log(array)
console.log(newArray)
console.log(arrayReducer(newArray))
  //if the sum of newArray modulo 10 is 0, the number is valid, otherwise it's invalid.
  return arrayReducer(newArray) % 10 === 0 ? 'Valid number' : 'Invalid number';
};

function validateCredStr(str) { //validates a credit card number in string form
  return validateCred(strToArray(str))
};

function strToArray(str) { //converts a string containing a number into an array of numbers
  let numArray = str.split('')
                    .map(num => parseInt(num));
  return numArray;
}

function findInvalidCards(nestedArray) {
  let newArray = [];
  nestedArray.forEach(arr => {
    if (validateCred(arr) === 'Invalid number') {
      newArray.push(arr);
    }
  })
  return newArray;
};

function invalidToValid(str) {
	if (validateCredStr(str) === 'Valid number') {
    return 'Number is already valid.'
  } else {
    let array = strToArray(str);
    let arrayTotal = arrayReducer(strToArray(str));
    let secondDigitOfTotal = parseInt(arrayTotal.toString()[1]);
    let checkDigit = array[array.length - 1];
    let newCheckDigit = checkDigit - secondDigitOfTotal;
    array.splice(array.length - 1, 1, newCheckDigit)
    return array
  }
}

function idInvalidCardCompanies(nestedArray) { //iterate through nested array of invalid card numbers(return value of findInvalidCards) to return a new array of companies who issued the cards, based on the first digit of the number.
  let newArray = []; //empty array which will hold the names of the companies
  nestedArray.forEach(arr => {
    switch (arr[0]) {
      case 3:
        newArray.push('Amex (American Express)')
        break;
      case 4:
        newArray.push('Visa')
        break;
      case 5:
        newArray.push('Mastercard')
        break;
      case 6:
        newArray.push('Discover')
        break;
      default:
        console.log('Company not found')
    }
  })
  return [...new Set(newArray)]; //Returns a new array with unique values, duplicates are removed.
};

function arrayReducer(array) { //helper function to sum up all values after running the validateCred function
  return array.reduce((a, b) => a + b);
};








