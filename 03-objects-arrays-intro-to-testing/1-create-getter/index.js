/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
    const arr=path.split('.')
    return function getter(obj) {
        let copyObj=obj
        for(let arrValue of arr) {
          if(copyObj?.hasOwnProperty(arrValue)) {
              copyObj=copyObj[arrValue]
          } else {
            return
          }
        }
        return copyObj
    }
}
