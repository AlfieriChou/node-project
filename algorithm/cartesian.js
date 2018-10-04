/***
 * 笛卡尔积
 * 采用for循环生成
 * */ 

function cartesian(setA, setB) {
  if(!setA || !setB || !setA.length || !setB.length) {
    return null
  }
  let product = []
  for (let i = 0; i < setA.length; ++i) {
    for (let j = 0; j < setB.length; ++j) {
      product.push([setA[i], setB[j]])
    }
  }
  return product
}

console.log(cartesian([1, 2, 3], ['a', 'b', 'c']))