export default class ArrayUtils {
  static updateArray(array, item) {
    for (let i = 0, len = array.length; i < len; i++) {
      const temp = array[i];
      if (temp === item) {
        array.splice(i, 1);
        return;
      }
    }
    array.push(item);
    return array;
  }

  static clone(fromArr) {
    if (!fromArr) {
      return [];
    }
    const newArray = [];
    for (let i = 0, len = fromArr.length; i < len; i++) {
      newArray[i] = fromArr[i];
    }
    return newArray;
  }

  static isEqual(arr1, arr2) {
    if (!(arr1 && arr2)) {
      return false;
    }
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0, l = arr2.length; i < l; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  static remove(arr, item) {
    if (!arr) return;
    for (let i = 0, l = arr.length; i < l; i++) {
      if (item === arr[i]) arr.splice(i, 1);
    }
  }

  static checkExist(item, items) {
    for (let i = 0, len = items.length; i < len; i++) {
      const id = item.id ? item.id.toString() : item.fullName;
      if (id === items[i]) {
        return true;
      }
    }
    return false;
  }
}
