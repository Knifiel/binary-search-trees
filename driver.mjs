import Tree from "./binaryTrees.mjs"
import makeArrayOfRandomNumbers from "./arrayRandom.mjs"
import randomNumber from "./randomNumber.mjs"
const arr = makeArrayOfRandomNumbers(20, 0, 100)
const tree = new Tree(arr)
let printArr
console.log(`Tree is balanced? ${tree.isBalanced()}`)
const printTraversals = () =>{
printArr = []
tree.levelOrder().forEach((node) => printArr.push(node.data))
console.log('levelOrder:' + printArr.toString())
printArr = []
tree.preOrder().forEach((node) => printArr.push(node.data))
console.log('preOrder:' + printArr.toString())
printArr = []
tree.inOrder().forEach((node) => printArr.push(node.data))
console.log('inOrder:' + printArr.toString())
printArr = []
tree.postOrder().forEach((node) => printArr.push(node.data))
console.log('postOrder:' + printArr.toString())
}
printTraversals()
console.log('Adding 10 random numbers')
for(let i=0;i<10;i++){
tree.insert(tree.root, randomNumber(100, 500))
}
console.log(`Tree is balanced? ${tree.isBalanced()}`)
console.log('Rebalancing tree')
tree.reBalance()
console.log(`Tree is balanced? ${tree.isBalanced()}`)
printTraversals()
