// register the grid component
Vue.component("demo-grid", {
  template: "#grid-template",
  replace: true,
  props: {
    data: Array,
    columns: Array,
    filterKey: String,
  },
  // render(h){
  //   console.log('我调用render函数了');
  //   return h('div','--');
  // },
  data: function () {
    var sortOrders = {};
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: "",
      sortOrders: sortOrders,
    };
  },
  mounted() {
    console.log("表格组件mounted");
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var data = this.data;
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
          });
        });
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return data;
    },
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    },
  },
  mounted() {
    console.log("grid子组件mounted");
  },
  created() {
    console.log("grid子组件created");
  },
});
let testData = Vue.observable({ count: 0 });
// bootstrap the demo
var demo = new Vue({
  // el: '#demo',
  template: `
    <div v-if="showAll" style="display:none"><div>我应该是静态显示内容，不需要重复显示</div><span>{{testData.count}}</span><form id="search" >{{Search}}<input name="query" v-model="searchQuery"></form><demo-grid
         v-if="showGrid"
        :data="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery">
      </demo-grid><demo-grid
      v-if="showGrid"
     :data="gridData"
     :columns="gridColumns"
     :filter-key="searchQuery">
   </demo-grid>
    </div>
  `,
  name:'root',
  data(param) {
    console.log(param);
    return {
      Search: "目标",
      searchQuery: "",
      showGrid: true,
      showAll: true,
      gridColumns: ["name", "power"],
      gridData: [
        { name: "Chuck Norris", power: Infinity },
        { name: "Bruce Lee", power: 9000 },
        { name: "Jackie Chan", power: 7000 },
        Vue.observable({ name: "Jet Li", power: 8000 }),
      ],
      pageData: {
        test: "测试数据",
      },
    };
  },
  computed: {
    biggerSearch() {
      return this.Search + "12";
    },
  },
  mounted() {
    console.log("父组件mounted");
  },
  beforeCreate() {
    this.testData = testData;
  },
  created() {
    console.log("父组件created");
  },
  destroyed() {
    console.log("我将释放");
  },
});

demo.$mount("#demo");
let childrenGrid = demo.$children[0];

console.log([1232, 12] instanceof Array);
function newInstanceOf(leftValue, rightValue) {
  if (typeof leftValue !== "object" || typeof rightValue !== "function") {
    return false;
  }
  let temp = leftValue;
  do {
    if (temp.__proto__ === rightValue.prototype) {
      return true;
    }
    temp = temp.__proto__;
  } while (temp);
  return false;
}

const edges = [];
var minCostConnectPoints = function (points) {
  const dist = (x, y) => {
    return (
      Math.abs(points[x][0] - points[y][0]) +
      Math.abs(points[x][1] - points[y][1])
    );
  };

  const n = points.length;
  const dsu = new DisjointSetUnion(n);

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push([dist(i, j), i, j]);
    }
  }
  edges.sort((a, b) => a[0] - b[0]);

  let ret = 0,
    num = 1;
  for (const [length, x, y] of edges) {
    if (dsu.unionSet(x, y)) {
      ret += length;
      num += 1;
      if (num === n) {
        break;
      }
    }
  }
  return ret;
};
var findCriticalAndPseudoCriticalEdges = function (n, edges) {
  const m = edges.length;
  for (const [i, edge] of edges.entries()) {
    edge.push(i);
  }
  edges.sort((a, b) => a[2] - b[2]);

  // 计算 value
  const uf_std = new UnionFind(n);
  let value = 0;
  for (let i = 0; i < m; i++) {
    if (uf_std.unite(edges[i][0], edges[i][1])) {
      value += edges[i][2];
    }
  }

  const ans = [[], []];

  for (let i = 0; i < m; i++) {
    // 判断是否是关键边
    let uf = new UnionFind(n);
    let v = 0;
    for (let j = 0; j < m; j++) {
      if (i !== j && uf.unite(edges[j][0], edges[j][1])) {
        v += edges[j][2];
      }
    }
    if (uf.setCount !== 1 || (uf.setCount === 1 && v > value)) {
      ans[0].push(edges[i][3]);
      continue;
    }

    // 判断是否是伪关键边
    uf = new UnionFind(n);
    uf.unite(edges[i][0], edges[i][1]);
    v = edges[i][2];
    for (let j = 0; j < m; j++) {
      if (i !== j && uf.unite(edges[j][0], edges[j][1])) {
        v += edges[j][2];
      }
    }
    if (v === value) {
      ans[1].push(edges[i][3]);
    }
  }
  return ans;
};

// 并查集模板
class UnionFind {
  constructor(n) {
    this.parent = new Array(n).fill(0).map((element, index) => index);
    this.size = new Array(n).fill(1);
    // 当前连通分量数目
    this.setCount = n;
  }

  findset(x) {
    if (this.parent[x] === x) {
      return x;
    }
    this.parent[x] = this.findset(this.parent[x]);
    return this.parent[x];
  }

  unite(a, b) {
    let x = this.findset(a),
      y = this.findset(b);
    if (x === y) {
      return false;
    }
    if (this.size[x] < this.size[y]) {
      [x, y] = [y, x];
    }
    this.parent[y] = x;
    this.size[x] += this.size[y];
    this.setCount -= 1;
    return true;
  }

  connected(a, b) {
    const x = this.findset(a),
      y = this.findset(b);
    return x === y;
  }
}

console.log(
  findCriticalAndPseudoCriticalEdges(5, [
    [0, 1, 1],
    [1, 2, 1],
    [2, 3, 2],
    [0, 3, 2],
    [0, 4, 3],
    [3, 4, 3],
    [1, 4, 6],
  ])
);

// 对于非负整数 X 而言，X 的数组形式是每位数字按从左到右的顺序形成的数组。
// 例如，如果 X = 1231，那么其数组形式为 [1,2,3,1]。
// 给定非负整数 X 的数组形式 A，返回整数 X+K 的数组形式。
var addToArrayForm = function (A, K) {
  let size = A.length;
  const res = [];
  for (
    let index = size - 1;
    index >= 0 || K > 0;
    index--, K = Math.floor(K / 10)
  ) {
    if (index >= 0) {
      K += A[index];
    }
    res.push(K % 10);
  }
  return res.reverse();
};

/**
 *给你一个仅由大写英文字母组成的字符串，你可以将任意位置上的字符替换成另外的字符，
 *总共可最多替换 k 次。在执行上述操作后，找到包含重复字母的最长子串的长度。
 */
var characterReplacement = function (s, k) {
  let left = 0,
    right = 0;
  let eachCharConnectLength = new Array(26).fill(0);
  let res = 0,
    maxCount = 0;
  let standStart = "A".charCodeAt();
  while (right < s.length) {
    maxCount = Math.max(
      maxCount,
      ++eachCharConnectLength[s[right].charCodeAt() - standStart]
    );
    right++;
    if (maxCount + k < right - left) {
      eachCharConnectLength[s[left++].charCodeAt() - standStart]--;
    }

    res = Math.max(res, right - left);
  }
  return res;
};
// console.log(characterReplacement('ABAA',0));

// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
var lengthOfLongestSubstring = function (s) {
  let r = 0;
  let children = [];
  let res = 0;
  while (r < s.length) {
    let index = children.indexOf(s[r]);
    if (-1 != index) {
      res = Math.max(res, children.length);
      children.splice(0, index + 1);
    }
    children.push(s[r]);
    r++;
  }
  console.log(children);
  return Math.max(res, children.length);
};

// console.log( lengthOfLongestSubstring("abcdefghi"));

// 给定一个含有 n 个正整数的数组和一个正整数 s ，
//找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，
// 并返回其长度。如果不存在符合条件的子数组，返回 0。
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let r = 0,
    sum = 0,
    childArray = [],
    res = Number.MAX_SAFE_INTEGER;
  while (r < nums.length && res != 1) {
    sum += nums[r];
    childArray.push(nums[r]);
    if (sum >= target) {
      do {
        res = Math.min(res, childArray.length);
        sum -= childArray.shift(0);
      } while (sum >= target);
    }
    r++;
  }
  return childArray.length == nums.length ? 0 : res;
};

// console.log(minSubArrayLen(4,[]));

// 给你一个字符串 s 、一个字符串 t 。返回 s 中涵盖 t 所有字符的最小子串。
//如果 s 中不存在涵盖 t 所有字符的子串，则返回空字符串 ""
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let r = 0;
  let child = [];
  let tLength = t.length;
  let targetIndex = [];
  let res = [];
  while (r < s.length && res.length != t.length) {
    let element = s[r];
    let index = t.indexOf(element);
    if (-1 != index) {
      child.push(element);
      targetIndex.push(child.length - 1);
      t = t.replace(element, "");
    } else if (child.length) {
      child.push(element);
    }
    if (t.length == 0) {
      do {
        if (!res.length || child.length < res.length) {
          res = [].concat(...child);
        }
        if (tLength == res.length) {
          return res.join("");
        }
        t = child[0];
        let secondeIndex = targetIndex[1];
        child.splice(0, secondeIndex);
        targetIndex.shift();
        targetIndex.forEach((item, index, theArray) => {
          theArray.splice(index, 1, item - secondeIndex);
        });
        let index = child.indexOf(t);
        if (-1 == index) {
          break;
        } else if (0 !== index) {
          for (let i = 0; i < targetIndex.length - 1; i++) {
            if (index > targetIndex[i] && index < targetIndex[i + 1]) {
              targetIndex.splice(i + 1, 0, index);
              break;
            }
          }
        }
      } while (true);
    }
    r++;
  }
  console.log(res);
  return res.join("");
};
// console.log(minWindow("abaa","aa"));

// // 1:右边界先移动找到一个满足题意的可以替换 k 个字符以后，所有字符都变成一样的当前看来最长的子串，直到右边界纳入一个字符以后，不能满足的时候停下；
// // 2:然后考虑左边界向右移动，左边界只须要向右移动一格以后，右边界就又可以开始向右移动了，继续尝试找到更长的目标子串；
// // 3:替换后的最长重复子串就产生在右边界、左边界交替向右移动的过程中。
// Class Solution {
//   characterReplacement(s,  k) {
//       let len = s.length();
//       if (len < 2) {
//           return len;
//       }

//       let char = [], charArray = s.toCharArray();
//       let left = 0;
//       let right = 0;

//       let res = 0;
//       let maxCount = 0;
//       let[] freq = new let[26];
//       // [left, right) 内最多替换 k 个字符可以得到只有一种字符的子串
//       while (right < len){
//           freq[charArray[right] - 'A']++;
//           // 在这里维护 maxCount，因为每一次右边界读入一个字符，字符频数增加，才会使得 maxCount 增加
//           maxCount = Math.max(maxCount, freq[charArray[right] - 'A']);
//           right++;

//           if (right - left > maxCount + k){
//               // 说明此时 k 不够用
//               // 把其它不是最多出现的字符替换以后，都不能填满这个滑动的窗口，这个时候须要考虑左边界向右移动
//               // 移出滑动窗口的时候，频数数组须要相应地做减法
//               freq[charArray[left] - 'A']--;
//               left++;
//           }
//           res = Math.max(res, right - left);
//       }
//       return res;
//   }
// }

Function.prototype.myCall = function (context) {
  const cxt = context || window;

  //当前被调用的方法定义在cxt.func上（为了能以对象调用的形式绑定this）
  cxt.func = this;

  //获取实参
  const args = Array.from(arguments).slice(1);

  //以对象调用的形式调用func，此时this指向cxt，也就是传入的需要绑定的this指向
  const res = arguments.length > 1 ? cxt.func(...args) : cxt.func();

  delete cxt.func;

  return res;
};

Function.prototype.myBind = function (context) {
  let cxt = context;
  let func = this;
  const args = Array.from(arguments).slice(1);
  return function () {
    cxt = cxt || this || window;
    cxt.func = func;
    const allArgs = args.concat(Array.from(arguments));
    return allArgs.length ? cxt.func(...allArgs) : cxt.func();
  };
};

function testFunction() {
  console.log(this.data);
  return 12;
}

let myObjet = {
  data: "哈哈哈",
};

let myBind = testFunction.myBind(myObjet);

function changeOrder(nums) {
  let l = 0,
    r = nums.length - 1;
  while (l < r) {
    if (nums[l] % 2 == 1) {
      l++;
      continue;
    }
    if (nums[r] % 2 == 0) {
      r--;
      continue;
    }
    [nums[l], nums[r]] = [nums[r], nums[l]];
  }
  return nums;
}
changeOrder([1, 2, 3, 4]);

var climbStairs = function (n) {
  let total = new Array(n).fill(0);
  total[0] = 1;
  total[1] = 2;
  for (let index = 2; index < n; index++) {
    total[index] = total[index - 2] + total[index - 1];
  }
  return total[n - 1];
};

var waysToStep = function (n) {
  let total = new Array(n).fill(0);
  total[0] = 1;
  total[1] = total[0] + 1;
  total[2] = 2 * total[1] + total[2] + 1;
  for (let index = 3; index < n; index++) {
    total[index] =
      (((total[index - 3] + total[index - 2]) % 1000000007) +
        total[index - 1]) %
      1000000007;
  }
  return total[n - 1];
};

var findShortestSubArray = function (nums) {
  let object1 = {};
  let maxObject;
  for (let index = 0; index < nums.length; index++) {
    if (!object1[nums[index]]) {
      object1[nums[index]] = {
        count: 1,
        start: index,
        end: index,
      };
    } else {
      object1[nums[index]].count++;
      object1[nums[index]].end = index;
    }
    if (!maxObject || maxObject.count < object1[nums[index]].count) {
      maxObject = object1[nums[index]];
    }
    if (
      maxObject.count == object1[nums[index]].count &&
      maxObject.end - maxObject.start >
        object1[nums[index]].end - object1[nums[index]].start
    ) {
      maxObject = object1[nums[index]];
    }
  }
  return maxObject && maxObject.end - maxObject.start + 1;
};

var longestOnes = function (A, K) {
  const n = A.length;
  let zeros = 0,
    ans = 0;
  for (let right = 0; right < n; right++) {
    if (0 == A[right]) {
      zeros++;
    }
    while (zeros > K) {
      if (A[left++] == 0) {
        zeros--;
      }
    }
    ans = Math.max(ans, right - let + 1);
  }
  return ans;
};

function getAllNum(str) {
  const regex = /[1-9]/g;
  str.match(regex).join("");
}

/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let max = 0;
  for (let i = 0; i < heights.length; i++) {
    for (let j = i; j < heights.length; j++) {
      max = Math.max(max, (j - i + 1) * Math.min(...heights.slice(i, j + 1)));
    }
  }
  return max;
};

// console.log(largestRectangleArea([2,1,5,6,2,3]));

Promise.resolve()
  .then(() => {
    console.log(0);
    // return Promise.resolve(4);
    return 4;
  })
  .then((res) => {
    console.log(res);
  });

Promise.resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })
  .then(() => {
    console.log(5);
  })
  .then(() => {
    console.log(6);
  });

function findMaxTimesArray(array, key) {}

function majorityElement(nums) {
  let x = 0,
    votes = 0;
  for (let num in nums) {
    if (votes == 0) x = num;
    votes += num == x ? 1 : -1;
  }
  return x;
}

function majorityElement2(nums) {
  let vote = 0,
    x;
  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    if (vote == 0) {
      x = element;
    }
    vote += x == element ? 1 : -1;
  }
  return x;
}

// 一个整型数组 nums 里除两个数字之外，其他数字都出现了两次。
//请写程序找出这两个只出现一次的数字。
// 要求时间复杂度是O(n)，空间复杂度是O(1)。

// 先对所有数字进行一次异或，得到两个出现一次的数字的异或值。
// 在异或结果中找到任意为 1 的位。
// 根据这一位对所有的数字进行分组。
// 在每个组内进行异或操作，得到两个数字。

function singleNumbers(nums) {
  let ret = 0;
  for (let n in nums) ret ^= n;
  let div = 1;
  while ((div & ret) == 0) div <<= 1;
  let a = 0,
    b = 0;
  for (let n in nums)
    if (div & n) a ^= n;
    else b ^= n;
  return { a, b };
}

// 找出数组中重复的数字。
// 在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。
// 数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。
// 请找出数组中任意一个重复的数字。

var findRepeatNumber = function (nums) {
  let keyMap = Object.create(null);
  for (let i = 0; i < nums.length; i++) {
    const element = nums[i];
    if (keyMap[element]) {
      return element;
    } else {
      keyMap[element] = 1;
    }
  }
};

// 给定一个数组 A[0,1,…,n-1]，请构建一个数组 B[0,1,…,n-1]，
//其中 B[i] 的值是数组 A 中除了下标 i 以外的元素的积,
// 即 B[i]=A[0]×A[1]×…×A[i-1]×A[i+1]×…×A[n-1]。不能使用除法。

// 初始化：数组 BB ，其中 B[0] = 1B[0]=1 ；辅助变量 tmp = 1tmp=1 ；
// 计算 B[i]B[i] 的 下三角 各元素的乘积，直接乘入 B[i]B[i] ；
// 计算 B[i]B[i] 的 上三角 各元素的乘积，记为 tmptmp ，并乘入 B[i]B[i] ；
// 返回 BB 。

var constructArr = function (a) {
  let BLeft = new Array(a.length);
  BLeft[0] = 1;
  for (let i = 1; i < a.length; i++) {
    BLeft[i] = BLeft[i - 1] * a[i - 1];
  }

  let BRight = new Array(a.length);
  BRight[a.length - 1] = 1;
  for (let i = a.length - 1; i >= 0; i--) {
    BRight[i] = BRight[i + 1] * a[i + 1];
  }
  let B = new Array(a.length);
  for (let i = 0; i < a.length; i++) {
    B[i] = BLeft[i] * BRight[i];
  }
  return B;
};

/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} K
 * @return {number}
 * n = 3, edges = [[0,1,100],[1,2,100],[0,2,500]]
 * src = 0, dst = 2, k = 1
 */
var findCheapestPrice = function (n, flights, src, dst, K) {};

