/***
 * 斐波那契数列
 * 法一 采用while实现
 * 法二 采用递归实现
 * */ 

function fibonacciWhile(n) {
  let currentValue = 1
  let previousValue = 0
  if (n === 1) {
    return 1
  }
  let iterationsCounter = n - 1
  while (iterationsCounter) {
    currentValue += previousValue
    previousValue = currentValue - previousValue
    iterationsCounter -= 1
  }
  return currentValue
}

function fibonacci(n) {
  let result
  switch (n) {
    case 1:
      result = 1
      break
    case 2:
      result = 1
      break
    default:
      result = fibonacci(n-1) + fibonacci(n-2)
      break
  }
  return result
}

console.log('---5--->', fibonacci(5))
console.log('---6--->', fibonacci(6))
console.log('---7--->', fibonacci(7))