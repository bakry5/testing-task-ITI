//Choose just 2 functions from bellow:


//problem 1
/**
 * Generate a random non-floating number within the range limits arguments.
 * @return {number} a random number in range of min and max (including min and max).
 * @param {number} min starting of the range
 * @param {number} max end of the range 
 * @example random(2,9) => a random number in range (2,3,4,...,9)
 */
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
// test cases:
/* 
    1-test that the return value is a number
    2-test if we pass 5,7 it will return a number >= 5 and <= 7
    3-test if we pass 3 it will return NaN
*/

//////////////////////////////////////////////////////////////////////////////////////////////
// problem 2
/**
 * Removes duplicate values from an array.
 * @param {Array<any>} arr - input array
 * @returns {Array<any>} - new array without duplicates
 * @example removeDuplicates([1,2,2,3]) => [1,2,3]
 */
function removeDuplicates(arr) {
  return [...new Set(arr)];
}


//test cases:
/* 
    1-test that the returned type is array
    2-test that returned array length is correct.
    3-test that array have unique elements
 */
////////////////////////////////////////////////////////////////////////////////

module.exports = { random, removeDuplicates };