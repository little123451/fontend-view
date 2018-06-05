import Vue from 'vue/dist/vue';

let app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

let app2 = new Vue({
    el: '#app-2',
    data: {
        message: '页面加载于 ' + new Date().toLocaleString()
    }
});

let app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    },
    methods:{
        hide(){
            this.seen = false;
        }
    }
});

let app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [
            { text: '学习 JavaScript' },
            { text: '学习 Vue' },
            { text: '整个牛项目' }
        ]
    }
});

let app5 = new Vue({
    el: '#app-5',
    data: {
        message: "Hello Vue.js!"
    },
    methods:{
        reverseMessage(){
            this.message = this.message.split('').reverse().join('')
        }
    }
});

let app6 = new Vue({
    el: '#app-6',
    data: {
        message: "Hello Vue.js!"
    }
});

Vue.component('todo-item', {
    // todo-item 组件现在接受一个
    // "prop"，类似于一个自定义特性。
    // 这个 prop 名为 todo。
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});

let app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: [
            { id: 0, text: '蔬菜' },
            { id: 1, text: '奶酪' },
            { id: 2, text: '随便其它什么人吃的东西' }
        ]
    }
});

let app8 = new Vue({
    el: '#app-8',
    data:{
        src:''
    },
    methods:{
        setUpUrl(){
            this.src = 'https://cn.vuejs.org/images/lifecycle.png'
        },
        setOffUrl(){
            this.src = '';
        }
    },
    created(){
        console.log('组件创建完毕');
    },
    updated(){
        console.log('组件更新完毕');
    },
    mounted(){
        console.log('组件装载完毕');
    }
});

let app9 = new Vue({
    el: '#app-9',
    data: {
        msg: '数据绑定的消息',
        rawHtml: '<span style="color: red">This should be red.</span>'
    },
    methods: {
        change(){
            let now = new Date();
            this.msg = "现在的时间是" + now.toString();
        }
    }
})

let app10 = new Vue({
    el: '#app-10',
    data: {
        div_a: '原始信息',
        btn_a: '点击产生事件',
        div_b: '原始信息',
        btn_b: '点击产生事件',
        msg: '这是一个指向百度的超链接'
    },
    methods:{
        divAClick(){ this.div_a = 'DIV A 被点击'},
        divBClick(){ this.div_b = 'DIV B 被点击'},
        btnAClick(){ this.btn_a = 'BTN A 被点击'},
        btnBClick(){ this.btn_b = 'BTN B 被点击'},
        aClick(){ this.msg = 'a标签被点击' }
    }
});