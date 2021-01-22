
// register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  replace: true,
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  // render(h){
  //   console.log('我调用render函数了');
  //   return h('div','--');
  // },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  mounted(){
    console.log('表格组件mounted');
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  },
  mounted(){
    console.log('grid子组件mounted');
  },
  created(){
    console.log('grid子组件created');
  }
})
let testData = Vue.observable({count:0})
// bootstrap the demo
var demo = new Vue({
  // el: '#demo',
  template:`
    <div style="display:none">
      <span>{{testData.count}}</span>
      <form id="search">{{Search}}<input name="query" v-model="searchQuery"></form><demo-grid
         v-if="showGrid"
        :data="gridData"
        :columns="gridColumns"
        :filter-key="searchQuery">
      </demo-grid>
    </div>
  `,
  data: {
    Search:'目标',
    searchQuery: '',
    showGrid:true,
    gridColumns: ['name', 'power'],
    gridData: [
      { name: 'Chuck Norris', power: Infinity },
      { name: 'Bruce Lee', power: 9000 },
      { name: 'Jackie Chan', power: 7000 },
      { name: 'Jet Li', power: 8000 }
    ]
  },
  mounted(){
    console.log('父组件mounted');
  },
  beforeCreate(){
    this.testData = testData;
  },
  created(){
    console.log('父组件created');
  }
})
 
demo.$mount('#demo');
let childrenGrid = demo.$children[0];

console.log([1232,12] instanceof Array);
function newInstanceOf(leftValue, rightValue){
  if (typeof leftValue !== 'object' || typeof rightValue !== 'function') {
    return false
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
var minCostConnectPoints = function(points) {
  const dist = (x, y) => {
      return Math.abs(points[x][0] - points[y][0]) + Math.abs(points[x][1] - points[y][1]);
  }

  const n = points.length;
  const dsu = new DisjointSetUnion(n);
  

  for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
          edges.push([dist(i, j), i, j]);
      }
  }
  edges.sort((a, b) => a[0] - b[0]);

  let ret = 0, num = 1;
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
var findCriticalAndPseudoCriticalEdges = function(n, edges) {
  var findCriticalAndPseudoCriticalEdges = function(n, edges) {
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
  constructor (n) {
      this.parent = new Array(n).fill(0).map((element, index) => index);
      this.size = new Array(n).fill(1);
      // 当前连通分量数目
      this.setCount = n;
  }

  findset (x) {
      if (this.parent[x] === x) {
          return x;
      }
      this.parent[x] = this.findset(this.parent[x]);
      return this.parent[x];
  }

  unite (a, b) {
      let x = this.findset(a), y = this.findset(b);
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

  connected (a, b) {
      const x = this.findset(a), y = this.findset(b);
      return x === y;
  }
}
};

console.log(findCriticalAndPseudoCriticalEdges(5,[[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]])); 