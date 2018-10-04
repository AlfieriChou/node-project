/***
 * 快速排序
 * 
 * */ 

function quickSort (arr) {
  if (arr.length < 2) return arr
  let left = []
  let right = []
  const pivot = arr[0]
  for (let i = 1; i < arr.length; ++i) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i])
  }
  return quickSort(left).concat(pivot, quickSort(right))
}

const arr = [3, 5, 4, 6, 8, 2, 9, 7]
console.log('------->', quickSort(arr))