async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; ++index) {
    await callback(array[index], index, array)
  }
}
asyncForEach([1, 2, 3], async (num) => {
  console.log(num)
})
console.log('Done')


const array = [12, 23, 21, 43, 24]
let result = []
const start = async () => {
  await asyncForEach(array, async (num) => {
    if (num > 23) {
      result.push(num)
    }
    console.log(num)
  })
  console.log('Done')
}
start()