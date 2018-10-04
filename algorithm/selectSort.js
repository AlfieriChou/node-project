/***
 * 选择排序
 * 
 * */ 

function selectSort(arr) {
  if (arr.length < 2) return arr
  let temp
  for (let i = 0; i < arr.length; ++i) {
    let min = i
    for (let j = i+1; j < arr.length; ++j) {
      if (arr[j] < arr[min]) min = j
    }
    temp = arr[i]
    arr[i] = arr[min]
    arr[min] = temp
  }
  return arr
}

const arr = [3, 5, 4, 6, 8, 2, 9, 7]
console.log('------->', selectSort(arr))