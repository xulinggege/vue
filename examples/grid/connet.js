// 有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。
// 省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。
// 给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。
// 返回矩阵中 省份 的数量。



// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
/**
 * 核心思想是永远期望在右侧找一个比自己高的节点，然后相对这个节点进行求值。对于比自己矮的节点
 * 进行保存。如果计算完了，还存在保存的节点，就将保存的节点反转，继续这样的操作。这就是一个递归操作
 * 好像不是一个最好的办法。
 */
var trap = function(height) {
    let i = 0; j = 1;
    let step = [];
    let sum = 0;
    while(j < height.length){
        if (height[i] < height[j]) {
            let stepSum = 0;
            step.forEach(item => {
                stepSum += item;
            });
            sum = sum + height[i] * (j -i -1) -stepSum;
            step = [];
            i = j;
            j = j+1;
        }else{
            step.push(height[j]);
            j++;
        }
    }
    if (step.length > 1) {
        step.reverse();
        step.push(height[i]);
        return sum + trap(step);
    }else{
        return sum;
    }
};

var findCriticalAndPseudoCriticalEdges = function(n, edges) {
    edges.sort((item1, item2) => {
        return item1[2] - item2[2];
    });
    let size 
    edges.forEach(item => {

    });
};

// [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
//并查集合模板
class UnionFind{
    constructor(n){
        this.parent = new Array(n).find(0).map((item,index)=>{
            return index;
        })
        this.size = new Array(n).fill(1);
        this.setCount = n;
    }
    find(x){
        let fx = this.parent[x];
        if (x == fx) {
            return x;
        }else{
            this.parent[x] = this.find(fx);
            return this.parent[x];
        }
    }
    union(x,y){
        if (this.find(x) == this.find(y)) {
           return false; 
        }else{
            f
        }
    }
}