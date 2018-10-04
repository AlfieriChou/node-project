/***
 * 字符串快速匹配算法 O(m+n)
 * rabin karp algorithm
 * 目前JavaScript文档中已经封装了match这个方法，所以，可以直接使用，也不用采用正则或者其他办法，这个算法只是为了了解字符串匹配算法
 * */ 
const PRIME = 97

function hashWord(word) {
  if (typeof word !== 'string') throw new Error('word mast be string')
  let hash = 0
  for(let i = 0; i < word.length; ++i) {
    hash += word[i].charCodeAt(0) * (PRIME ** i)
  }
  return hash
}

function reHashWord(prevHash, prevWord, newWord) {
  const newWordLastIndex = newWord.length - 1
  let newHash = prevHash - prevWord[0].charCodeAt(0)
  newHash /= PRIME
  newHash += newWord[newWordLastIndex].charCodeAt(0) * (PRIME ** newWordLastIndex)
  return newHash
}

function rabinKarp(text, word) {
  const wordHash = hashWord(word)
  let prevSegment = null
  let currentSegmentHash = null
  for (let i = 0; i <= text.length - word.length; ++i) {
    const currentSegment = text.substring(i, i + word.length)
    currentSegmentHash = currentSegmentHash === null ? hashWord(currentSegment) : reHashWord(currentSegmentHash, prevSegment, currentSegment)
    // if (currentSegmentHash === null) {
    //   currentSegmentHash = hashWord(currentSegment)
    // } else {
    //   currentSegmentHash = reHashWord(currentSegmentHash, prevSegment, currentSegment)
    // }
    prevSegment = currentSegment
    if (wordHash === currentSegmentHash) {
      let numberOfMatches = 0
      for (let j = 0; j < word.length; ++j) {
        if (word[j] === text[i + j]) {
          numberOfMatches += 1
        }
      }
      if (numberOfMatches === word.length) {
        return i
      }
    }
  }
  return -1
}

console.log('------->', rabinKarp('adsacs', 'acs'))

const str = 'adsacs'
str.match('acs') // ["acs", index: 3, input: "adsacs", groups: undefined]