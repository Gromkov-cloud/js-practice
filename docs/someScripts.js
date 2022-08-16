// function highAndLow(numbers){
//     const arr = numbers.split(/ /gi).map(el => +el)
//     const hight = Math.max(...arr)
//     const low = Math.min(...arr)
//     const result = `${hight} ${low}`
//     return result
//   }

//   // console.log(highAndLow("8 3 -5 42 -1 0 0 -9 4 7 4 -4"))

// // Disemvowel Trolls
// function disemvowel(str) {
//   return str.replace(/[aoeui]/gi,'')
// }

// //console.log(disemvowel("No offense but,,,\nYour writing is among the worst I've ever read"))

// // Isograms
// function isIsogram(str){
//   str = str.toLowerCase()
//   const strLength = str.length
//   if (strLength !== 0 ) {
//     for (let i = 0; i < strLength; i++) {
//       let currentLetter = str[i]
//       for (let n = 0; n < strLength; n++) {
//         if (i !== n && currentLetter == str[n]) {
//           return false
//         } else {
//           return true
//         }
//       }
//     }
//   } else return true
// }