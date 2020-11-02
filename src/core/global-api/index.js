/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  //给全局的Vue添加了一个config的
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  //全局注册set和del方法，以及nextTick方法
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  //添加响应式方法。如果这个是相应式的，那么他的相应式回调的函数在哪里？
  // 2.6 explicit observable API
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  //在Vue函数上直接添加options属性。并为这个属性添加component，directive,filter等属性。
  //这些Vue方法上的属性有啥用呢？ 它和Vue提供的全局函数Vue.component, Vue.directive,以及Vue.filter直接有什么关联）
  //他们直接的关联就是Vue.component, Vue.directive,以及Vue.filter注册的全局组件，指令，以及过滤器都会存储到Vue.options里面来
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  //一个很神奇的操作。看在weex中怎么使用。
  Vue.options._base = Vue

  //把对象的属性拷贝到所有的里面.注册了一个内置组件keep-alive
  extend(Vue.options.components, builtInComponents)

  //注册Vue.use() 方法用来注册插件
  initUse(Vue)
  //注册Vue.mixin() 实现混入
  initMixin(Vue)
  //注册 Vue.extend() 基于传入的options返回一个组件的构造函数
  initExtend(Vue)
  initAssetRegisters(Vue)
}
