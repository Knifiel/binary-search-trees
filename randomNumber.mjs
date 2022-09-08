 export default function randomNumber(min, max){
    if(min === max){
        return min
    }
    let i
    do{
        i = Math.floor(Math.random()*max)
    }while(i<min)
    return i
}