const { resolve } = require("path");

const man = {
    name:'jscoder',
    age:22
}
const proxy = new Proxy(man,{
    get(obj,target,recerver){
        if (target in obj) {
            return obj[target];
        }else{
            throw Error(`Property ${target} does not exist`);
        }
    }
})
// 
function red () {
    console.log('red') //3s
}
function green () {
    console.log('green') //1s
}
function yellow () {
    console.log('yellow') //2s
}

function waiteSecond(seconds, call){
    return new Promise((resolve)=>{
        call();
        setTimeout(resolve,seconds*1000);
    })
}

function cycle(){
    waiteSecond(3,red).then(()=>{
        return waiteSecond(1,green);
    }).then(()=>{
        return waiteSecond(2,yellow)
    }).then(()=>{
        cycle();
    })
}

// cycle();

//第三题
var User = {
    count:1,
    action:{
        getCount:function () {
            return this.count
        }
    }
}
var getCount = User.action.getCount;
setTimeout(() => {
   console.log("result 1",User.action.getCount())
})
console.log("result 2",getCount())

//第四题
// - 你觉得typescript和javascript有什么区别
// - typescript你都用过哪些类型
// - typescript中type和interface的区别
/**
 1- typescript是javascript的超集，它包含所有javascript所有的内容，同时又扩展了自己才有的type和interface
 。同时它也添加编写代码时候的编译时检查，使得类型使用错误在编码阶段就能被发现。
 2- 目前还没有实际使用typescript进行开发。有点尴尬
 3- type 可以声明基本类型别名，联合类型，元组等类型,type 语句中还可以使用 typeof 获取实例的 类型进行赋值,interface 能够声明合并
 */

 //第五题--对 async/await 的理解，分析内部原理
 /**
  async/await是异步函数中关键字。
  被async修饰的函数是返回的是一个Promise对象。
  await是一个修饰符，用于组成表达式，await表达式的运算结果取决它等的东西，await的永远期望得到是一个resolve状态的promise.
  如果不是resolve状态的promise。则会抛出异常。结束代码的运行。
  */

 /** 
  *async/await 如果右边方法执行出错该怎么办
  可以使用try catch 来包裹 await语句
  或者 await的语句直接进行进行catch操作 类似写法如下 await someFunction().catch(err=>{})。 
  */ 
//  function getProcessedData(url) {
//     return downloadData(url) // returns a promise
//       .catch(e => {
//         return downloadFallbackData(url)  // returns a promise
//       })
//       .then(v => {
//         return processDataInWorker(v)  // returns a promise
//       }) 
// }



//第六题 -- 防抖和节流
/**
 * 防抖--
 触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间。

* 节流 --
高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率
 */
function debounce(cb,seconds){
    let timeId = null;
    return function(){
        if (timeId) {
            clearTimeout(timeId);
            timeId = null;
        }
        let argument = arguments;
        timeId = setTimeout(()=>{
            cb.apply(this,argument);
        },seconds*1000);
    }
}

// function thorttle(cb,seconds){
//     let timeId = null;
//     return function(){
//         if (!timeId) {
//             timeId = setTimeout(()=>{
//                 cb();
//                 timeId = null;
//             },seconds);
//         }
//     }
// }
function letTest(){
    // console.log(a);
    let a = 12;
}
letTest()

/**
 * 观察者模式是具体目标调度。比如事件触发。dep就会主动调用观察者的方法。所以观察者模式下，发布者和订阅者是存在依赖关系的
 * 发布订阅者模式模式有统一的事件调度中心，因此发布者和订阅者不需要知道彼此的存在。
 */

 /**
  * 说一下event loop的执行过程？ promise定义时候传入的函数什么时候执行？
  */