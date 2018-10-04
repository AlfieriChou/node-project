/***
 * 归并排序
 * 1. 先用二分法分割成最小单位 —— O(logn)
 * 2. 然后合并成数组的时候通过指针合并数组 —— O(n)
 * 3. 所以复杂度为O(nlogn) 是一个稳定的算法
 * */ 

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr
  }
  let mid = parseInt(arr.length >>> 1)
  let subLeft = mergeSort(arr.slice(0, mid))
  let subRight = mergeSort(arr.slice(mid))
  return merge(subLeft, subRight)
}
function merge(node1, node2) {
  let result = []
  while(node1.length > 0 && node2.length > 0) {
    result.push(node1[0] < node2[0] ? node1.shift() : node2.shift())
  }
  return result.concat(node1.length ? node1 : node2)
}

const arr = [3, 5, 4, 6, 8, 2, 9, 7]
console.log('------->', mergeSort(arr))