class HistoryRoute {
    constructor() {
        this.currect = null
    }
}
class VueRouter {
    constructor(options) { //newVueRouter传过来的对象
        this.mode = options.mode || 'hash';
        this.routes = options.routes || []; //routers是路由表
        //你传递的路由表是数组 先把他格式化成对象形式 定义一个方法
        this.routesMap = this.createMap(this.routes)
        // console.log(this.routesMap)
        //路由要存放当前的状态  需要状态
        // this.history = {currect:null}  这个可以创建一个类有currect属性
        this.history = new HistoryRoute();
        this.init(); //初始化
    }
    init() {
        if (this.mode === 'hash') {
            //先判断用户打开时有没有hash，没有就跳转到#/
            location.hash ? '' : location.hash = '/';
            //监听用户页面加载完成时取hash值放到当前的类的状态上
            window.addEventListener('load', () => {
                //slice 是不需要#号
                this.history.currect = location.hash.slice(1);
            })
            //当hash路径变化是就在取值放到当前的类的状态上
            window.addEventListener('hashchange', () => {
                this.history.currect = location.hash.slice(1);
            })
        } else { // history模式
            location.pathname ? '' : location.pathname = '/';
            window.addEventListener('load', () => {
                this.history.currect = location.pathname;
            })
            window.addEventListener('popstate', () => {
                this.history.currect = location.pathname;
            })
        }
    }
    go() {

    }
    back() {

    }
    push() {

    }
    createMap(routes) {
        return routes.reduce((memo, currect) => {
            memo[currect.path] = currect.component;
            return memo; //reduce 要返回当前项
        }, {})
    }
}

//使用vue.use就会调用install方法
//vue 是构造函数
//在所有组件中获取同一个路由的实例
VueRouter.install = (Vue) => {
    //每个组件都有  this.$router / this.$route  在每个组件beforeCreate之前加入属性
    Vue.mixin({
        beforeCreate() { //混合方法
            if (this.$options && this.$options.router) { //这个就是根组件
                this._root = this; //把当前实例挂载在_root上
                this._router = this.$options.router; //把 router实力挂载到_router上
                //深度监控 如果history中currect属性变化也会刷新视图
                //this.xxx = this._router.history  状态一边就重新渲染
                Vue.util.defineReactive(this, 'xxx', this._router.history) 
            } else {
                this._root = this.$parent._root;
                this._router = this.$parent._router;
            }
            Object.defineProperty(this, '$router', {
                get() {
                    return this._router
                }
            })
            Object.defineProperty(this, '$route', {
                get() {
                    return {
                        currect: this._router.history.currect
                    }
                }
            })
        },
    })
    //全局注册组件
    Vue.component('router-link', {
        props:{
            to:String,
            tag:String
        },
        render(h) {
            //判断是否是hash模式
            let mode = this._self._router.mode;
        return <a href={mode === 'hash'?`#${this.to}`:this.to}>{this.$slots.default}</a>
        },
    })
    Vue.component('router-view', { //根据状态找到路由表进行渲染
        render(h) {
            //当状态一边再执行一遍获取state
            let state = this._self._router.history.currect; //状态
            let currect = this._self._router.routesMap; //路由表
            console.log(state)
            return h(currect[state]);
        },
    })
}
export default VueRouter