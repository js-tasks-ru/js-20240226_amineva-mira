/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let count = 0;
  let resultStr = '';
  if (typeof size === 'undefined') {return string;}
  for (let i = 0; i <= string.length - 1; i++) {
    string[i] === string[i - 1] ? count++ : count = 1;
    if (count <= size) {
      resultStr += string[i];
    }
  }
  return resultStr;
}
