/***
 * 希尔排序
 * 分成arr.length/2数据
 * arr[i]和arr[i+arr.length/2]同一组（i<arr.length/2）
 * 同一组数据合并
 * */

function shellSort(arr){
  if (arr.length < 2) return arr
  let gapSize =  Math.floor(arr.length >>> 1)
  while(gapSize > 0){
    for(let i = gapSize; i < arr.length; i++) {
      let temp = arr[i]
      let j = i
      while(j >= gapSize && arr[j - gapSize] > temp) {
        arr[j] = arr[j - gapSize]
        j -= gapSize
      }
      arr[j] = temp
    }
    gapSize = Math.floor(gapSize >>> 1)
  }
  return arr
}
const arr = [3, 5, 4, 6, 8, 2, 9, 7]
console.log('------->', shellSort(arr))