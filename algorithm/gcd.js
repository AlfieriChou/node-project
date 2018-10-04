/***
 * 求两个整数的最大公约数 欧几里算法
 * a = 1071 b = 462
 * 1071 = 2 * 462 + 147
 * 462 = 3 * 147 + 21
 * 147 = 7 * 21 + 0
 * 所以最大公约数为21
 * */ 

const GCD = (a, b) => {
  if (b === 0) {
    return a
  }
  let max = a
  let min = b
  if (max < min) {
    max = b
    min = a
  }
  return GCD(min, max%min)
}

console.log('------->', GCD(1071, 462))