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
}