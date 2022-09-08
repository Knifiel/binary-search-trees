class Node{
    constructor(data){
        this.data = Number(data)
        this.left = null
        this.right = null
    }

    isLeaf(){
        if((!this.left)&&(!this.right)) return true;
        return false
    }
    hasOneChild(){
        if(((!this.left)&&(!!this.right))||((!!this.left)&&(!this.right))){
            return true
        }
        return false
    }
}

export default class Tree{
    constructor(array){
        this.root = this.buildTree(array)
    }
    
    buildTree(array, start=0, end=array.length-1){
        if(start > end){
        return null
        }
        const middle = Math.floor((start+end)/2)
        const root = new Node(array[middle])
        root.left = this.buildTree(array, start, middle-1)
        root.right = this.buildTree(array, middle+1, end)
        return root
    }

    insert(root, data){
        if (!root){
            root = new Node(data)
            return
        }
        if(data === root.data){
            return
        }
        if(data>root.data){
            if(!root.right){
                root.right = new Node(data)
                return
            }
            this.insert(root.right, data)
        }
        if(data<root.data){
            if(!root.left){
                root.left = new Node(data)
                return
            }
            this.insert(root.left, data)
        }
        return root
    }
    
    delete(root, data, prevNode = this.root, prevBranch = ""){
        if(root.isLeaf()&&(root.data!==data)){
            return
        }
        if((root.data === data)){
            if(root.isLeaf()){
                if(root === this.root){
                    this.root = null
                } else{
                prevNode[prevBranch] = null
                }
            }else if(root.hasOneChild()){
                if(root === this.root){
                    this.root = (!!root.left)?root.left:root.right
                } else {
                    prevNode[prevBranch] = (!!root.left)?root.left:root.right
                }
            }else{
                debugger    
                const nextBiggest = this.#findNextBiggest(root.right)
                const tempData = nextBiggest.data
                this.delete(root, nextBiggest.data, prevNode, prevBranch)
                root.data = tempData
            }
        }
        if(data>root.data){
            this.delete(root.right, data, root, 'right')
        }
        if(data<root.data){
            this.delete(root.left, data, root, 'left')            
        }
        return root
    }

    find(root, data){
        if((root.isLeaf())&&(root.data !== data)){
            return null
        }
        if(root.data === data){
            return root
        }
        if(data>root.data){
            return this.find(root.right, data)
        }
        if(data<root.data){
            return this.find(root.left, data)
        }
    }
//levelOrder traversal
//loop implementation
/*    
    levelOrder(f = false){
        const queue = []
        const visited = []
        queue.push(this.root)
        while(queue.length!==0){
            const node = queue.shift()
            if(!!f){
                f(node)
            } else {
                visited.push(node)
            }
            if(!!node.left){
                queue.push(node.left)
            }
            if(!!node.right){
                queue.push(node.right)
            }
        }
        if(!f){
            return visited
        }
    }
*/

// recursive implementation

    levelOrder(f=false, queue = [this.root], visited = []){
        if(queue.length===0){
            if(!f){
                return visited
            }
            return
        }
        const node = queue.shift()
        visited.push(node)
        if(!!node.left){
            queue.push(node.left)
        }
        if(!!node.right){
            queue.push(node.right)
        }
        if(f!==false){
            f(node)
        }
        return this.levelOrder(f,queue, visited)
    }

    //inOrder, preOrder, postOrder traversal
    inOrder = (f = false, root = this.root, visited = []) =>{
        if(!!root.left){
            this.inOrder(f, root.left, visited)
        }
        (!f)? visited.push(root) : f(root)
        if(!!root.right){
            this.inOrder(f, root.right, visited)
        }
        if(!f){return visited}
    }

    preOrder = (f = false, root = this.root, visited = []) =>{
        (!f)? visited.push(root) : f(root)
        if(!!root.left){
            this.preOrder(f, root.left, visited)
        }
        if(!!root.right){
            this.preOrder(f, root.right, visited)
        }
        if(!f){return visited}
    }
    postOrder = (f = false, root = this.root, visited = []) => {
        if(!!root.left){
            this.postOrder(f, root.left, visited)
        }
        if(!!root.right){
            this.postOrder(f, root.right, visited)
        }
        (!f)? visited.push(root) : f(root)
        if(!f){return visited}
    }

    height = (root, h=1) => {
        if(!root){
            return h-1
        }
            h++
            let left = this.height(root.left, h)
            let right = this.height(root.right, h)
        return (left>right)?left:right
    }

    depth = (node, root = this.root, h = 0) =>{
        if(!(node instanceof Node)){
            throw Error('depth function only accepts nodes')
        }
        if(root === node){
            return h
        }
        if(node.data<root.data){
            h++
            return this.depth(node, root.left, h)
        }
        if(node.data>root.data){
            h++
            return this.depth(node, root.right, h)
        }
    }
    
    isBalanced = (root=this.root) =>{
        if(!root){
            return true
        }
        let leftH = this.height(root.left)
        let rightH = this.height(root.right)
        if(Math.abs(leftH-rightH) > 1){
            return false
        }
        if(this.isBalanced(root.left)&&this.isBalanced(root.right)){
            return true
        }
        return false
    }
    
    reBalance = () => {
        const arr = this.inOrder()
        const buildArr = []
        arr.forEach((node) => {buildArr.push(node.data)})
        this.root = this.buildTree(buildArr)
        return this.root
    }

    #findNextBiggest = (root) => {
        if(root.left === null){
            return root
        }
        return this.#findNextBiggest(root.left)
    }
}