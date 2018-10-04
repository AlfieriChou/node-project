/***
 * 冒泡排序
 * 
 * */ 

function bubbleSort (arr) {
  if (arr.length < 2) return arr
  for (let i = 0; i < arr.length; ++i) {
    for (let j = 0; j < arr.length - 1 - i; ++j) {
      if (arr[j] > arr[j+1]) {
        let temp = arr[j+1]
        arr[j+1] = arr[j]
        arr[j] = temp
      }
    }
  }
  return arr
}

const arr = [3, 5, 4, 6, 8, 2, 9, 7]
console.log('------->', bubbleSort(arr))