[todoMvc-3step源码](https://github.com/Zegendary/react-demo/tree/master/todoMvc/todoMvc-3step)

[todoMvc-3step演示](https://zegendary.github.io/react-demo/todoMvc/todoMvc-3step/)

上一张主要介绍了下React如何进行双向绑定以及如何生成一个组件，我们第三步的目标就是需要把之前做的内容抽象出更细的组件，这样便于解耦，各个组件各司其职，互不干扰。

先看下抽象后`src/components`下的目录

![组件目录](http://upload-images.jianshu.io/upload_images/1826203-779efaebcebaadb8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这是我们`app.js`修改过后的内容：

    import React from 'react'
    import ReactDOM from 'react-dom'
    import TodoHeader from './TodoHeader'  // 引入TodoHeader组件
    import TodoMain from './TodoMain'  // 引入TodoMain组件

    class App extends React.Component { // 定义组件，继承父类
      constructor() {
        super()
        this.state = {
          todos: []
        }
      }
      addTodo(item) { // 新增了添加todo事项的方法
        this.state.todos.push(item)
        this.setState({todos: this.state.todos});  //设置状态
      }
      render(){
        return (
          <div className="todo-wrapper">
            // 将原内容写在组件中并引入进行渲染
            // 把addTodo方法传递到TodoHeader组件中，bind(this)是为了把该React实例绑定到this上
            <TodoHeader addTodo={this.addTodo.bind(this)}/>
            // 把 state.todos 传入到TodoMain 中
            <TodoMain todos={this.state.todos}/>
          </div>
        )
      }
    }

    ReactDOM.render(<App/>,document.getElementById('app'))
    
`TodoHeader`:

    import React from 'react'

    class TodoHeader extends React.Component {
      // 绑定键盘回车事件，添加新任务
      handlerKeyUp(e) {
        if(e.keyCode == 13) { // enter键的 keyCode 为13
          let value = e.target.value;
          if(!value) return false;
          let newTodoItem = {
            text: value,
            isDone: false
          };
          e.target.value = '';
          this.props.addTodo(newTodoItem) // 通过 this.props 来调用父组件传递过来的addTodo方法
        }
      }
      render(){
        return (
            <div className="todo-header">
              <input onKeyUp={this.handlerKeyUp.bind(this)} type="text" placeholder="请输入你的任务名称，按回车键确认"/>
            </div>
        )
      }
    }
    export default TodoHeader // 将TodoHeader导出，否则父组件无法导入
`TodoMain`修改后内容:

    import React from 'react'
    import TodoItem from './TodoItem'

    class TodoMain extends React.Component {
      render(){
        if(this.props.todos.length == 0) {
          return (
            <div className="todo-empty">恭喜您，目前没有待办任务</div>
          )
        } else {
          return (
            <ul className="todo-main">
              {
                this.props.todos.map((todo,index) => {
                  //{...this.props} 用来传递TodoMain的todos属性和delete、change方法。
                  return <TodoItem text={todo.text} isDone={todo.isDone} index={index} {...this.props} key={index}/>
                })
              }
            </ul>
          )
        }
      }
    }
    export default TodoMain
`TodoItem`：

    import React from 'react'

    class TodoItem extends React.Component {
      render() {
        let className = this.props.isDone?'task-done':''
        return (
          <li>
            <label>
              <input type="checkbox"/>
              <span className={className}>{this.props.text}</span>
            </label>
          </li>
        )
      }
    }

    export default TodoItem
`TodoFoot`我们下章在做.

这一步时`webpack`先编译,然后打开index.html，如果页面像下图这样的[odoMvc-3step演示](https://zegendary.github.io/react-demo/todoMvc/todoMvc-3step/)，那就说明成功了。

![第三部截图](http://upload-images.jianshu.io/upload_images/1826203-80312f98bd0efa9a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

做到这里应该对react组件组件化的有个大概的了解了。新手们基本可以对着源码按照这种思路继续做下去。以完善【删除】、【清除已完成】、【未完成数量】等功能了，由于代码类似，故不做赘述了，不太清楚的地方可以参考源码。

[React+webpack从0到1开发一个todoMvc（一）](http://www.jianshu.com/p/aa02a10c5b69)
[React+webpack从0到1开发一个todoMvc（二）](http://www.jianshu.com/p/ed01cf27b23d) 
[React+webpack从0到1开发一个todoMvc（四）](http://www.jianshu.com/p/4b3b2f3146e2) 
[React+webpack从0到1开发一个todoMvc（五）](http://www.jianshu.com/p/86b83192917d) 