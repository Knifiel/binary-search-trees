import randomNumber from "./randomNumber.mjs"
export default function makeArrayOfRandomNumbers(arrSize = 10, minRandom = 0, maxRandom = 50){
    const arr = randomFill(arrSize, minRandom, maxRandom)
    arr.sort((a, b) => a-b)
    return arr
}

function randomFill(arrSize=20, min=0, max=50){
    const set = new Set()
    while(set.size < arrSize){
        set.add(randomNumber(min, max))
    }
    const arr = [...set]
    return arr
}

