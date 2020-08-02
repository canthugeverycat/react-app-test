/**
 * Removes duplicates in a primitive one-dimensional array
 *
 * @param {Array} array Flat array made of primitive types
 *
 * @return {Array} New array with no duplicate values
 */
export default function removeDuplicates(array) {
    return [...new Set(array)];
}