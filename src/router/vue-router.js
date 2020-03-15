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
    createMap(routes) {
        return routes.reduce((memo, currect) => {
            memo[currect.path] = currect.component;
            return memo; //reduce 要返回当前项
        }, {})
    }
}

//使用vue.use就会调用install方法
//vue 是构造函数
VueRouter.install = (Vue) => {
    //每个组件都有  this.$router / this.$route  在每个组件beforeCreate之前加入属性
    Vue.mixin({
        beforeCreate() {
            console.log(111)
        },
    })
}
export default VueRouter