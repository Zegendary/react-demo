/**
 * Created by zhangxinwang on 16/02/2017.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'

class App extends React.Component { //定义组件，继承父类
  constructor() {
    super()
    this.state = {
      todos: []
    }
  }
  addTodo(item) {
    this.state.todos.push(item)
    this.setState({todos: this.state.todos});  //设置状态
  }
  render(){
    return (
      <div className="todo-wrapper">
        <TodoHeader addTodo={this.addTodo.bind(this)}/>
        <TodoMain todos={this.state.todos}/>
      </div>
    )
  }
}


ReactDOM.render(<App/>,document.getElementById('app'))