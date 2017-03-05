#React如何双向绑定
[todoMvc-2step源码](https://github.com/Zegendary/react-demo/tree/master/todoMvc/todoMvc-2step) 
 [todoMvc-2step演示](https://zegendary.github.io/react-demo/todoMvc/todoMvc-2step/)
上一章主要说了下react+webpack的环境搭建，这一章主要讲一下如何双向绑定。对vue和angular略有了解的都知道，这两个框架都是支持双向绑定的，而react是单向绑定的，知乎有一篇关于单向绑定和双向绑定可以拓展一下：[单向数据绑定和双向数据绑定的优缺点，适合什么场景？](https://www.zhihu.com/question/49964363)

##下面分析如何具体实现
进入我们的`app.js`文件，在之前我们搭建环境的时候已经安装了react相关的依赖以及babel编译工具，所以我们可以直接在这里使用`ES6`、`JSX`语法。
####1.引入react核心内容

    import React from 'react'
    import ReactDOM from 'react-dom'
其中，react.js 是 React 的核心库，react-dom.js 是提供与 DOM 相关的功能。

####2.生成组件
先介绍react三个比较重要的知识点：
1）ReactDOM.render()
ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。举个例子：
        
    ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
    );
上面代码将一个 h1 标题，插入 example 节点。
2）JSX 语法
HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 [JSX 的语法](http://facebook.github.io/react/docs/displaying-data.html#jsx-syntax)，它允许 HTML 与 JavaScript 的混写，上面的`<h1>Hello, world!</h1>`，就是使用了jsx语法。
3）组件
React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类。举个🌰：
    
    #es5写法
     var HelloMessage = React.createClass({
      render: function() {
        return <h1>Hello React</h1>;
      }
    });
    #es6写法
    Class HelloMessage extends React.Component {
      render() {
        return <h1>Hello, React</hr>;
      }
    }
当然，这里的`HelloMessage`我们也可以当做HTML标签用`ReactDOM.render()`渲染出来。

`app.js`:

    class App extends React.Component { //定义组件，继承父类
      constructor() {//constructor 是和 class 一起用来创建和初始化对象的特殊方法。
        super()//在装载组件(mounting)之前调用会React组件的构造函数。当实现React.Component子类的构造函数时，应该在任何其他语句之前调用super(props)
        this.state = {//设置初始状态
          todos: []
        }
      }
      // 绑定键盘回车事件，添加新任务
      handlerKeyUp(e) {
        if(e.keyCode == 13) {
          let value = e.target.value;
          if(!value) return false;
          let newTodoItem = {
            text: value,
            isDone: false
          };
          e.target.value = '';
          this.state.todos.push(newTodoItem)
          this.setState({todos: this.state.todos});  //修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。
        }
      }
      render(){
        return (
          <div className="todo-input">
            <input type="text" placeholder="请输入待办事项" onKeyUp={this.handlerKeyUp.bind(this)}/>
            <ul>
              {this.state.todos.map((todo,index) => {{
                return (
                    <li key={index}>{todo.text}</li>//Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity
                )
              }})}
            </ul>
          </div>
        )
      }
    }
    ReactDOM.render(<App/>,document.getElementById('app'))

####3.测试
运行

    $ webpack
然后打开`index.html`，如果可以在input输入，按下回车可以在下方生成list![成功画面](http://upload-images.jianshu.io/upload_images/1826203-978e6e74113bb79d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

那么恭喜你，双向绑定功能圆满完成！

[React+webpack从0到1开发一个todoMvc（一）](http://www.jianshu.com/p/aa02a10c5b69) 
[React+webpack从0到1开发一个todoMvc（三）](http://www.jianshu.com/p/80e54fc179e4) 
[React+webpack从0到1开发一个todoMvc（四）](http://www.jianshu.com/p/4b3b2f3146e2) 
[React+webpack从0到1开发一个todoMvc（五）](http://www.jianshu.com/p/86b83192917d)