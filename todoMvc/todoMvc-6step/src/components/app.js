/**
 * Created by zhangxinwang on 16/02/2017.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'

class App extends React.Component { //定义组件，继承父类
  constructor() {
    super()
    this.state = {
      todos: [],
      isAllChecked: false
    }
  }
  addTodo(item) {
    this.state.todos.push(item)
    this.setState({todos: this.state.todos});  //设置状态
  }
  // 改变任务状态，传递给TodoItem和Footer组件的方法
  changeTodoState(index, isDone, isChangeAll=false){   //初始化isChangeAll为false
    if(isChangeAll){     //全部操作
      this.setState({
        todos: this.state.todos.map((todo) => {
          todo.isDone = isDone;
          return todo;
        }),
        isAllChecked: isDone
      });
    }else{   //操作其中一个todo
      this.state.todos[index].isDone = isDone;
      this.allChecked();
    }
  }
  // 判断是否所有任务的状态都完成，同步底部的全选框
  allChecked() {
    let isAllChecked = false;
    if (this.state.todos.every(todo => todo.isDone)) {
      isAllChecked = true;
    }
    this.setState({   //改变状态，组件重绘
      todos: this.state.todos,
      isAllChecked: isAllChecked
    });
  }
  clearDone(){
    let todos = this.state.todos.filter(todo => !todo.isDone)
    this.setState({
      todos : todos
    })
  }
  deleteTodo(index) {
    this.state.todos.splice(index,1)
    this.setState({todos: this.state.todos})
  }
  render(){
    let info = {
      isAllChecked: this.state.isAllChecked,
      todoCount: this.state.todos.length || 0,
      todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
    }
    return (
      <div className="todo-wrapper">
        <TodoHeader addTodo={this.addTodo.bind(this)}/>
        <TodoMain todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)}/>
        <TodoFooter {...info} clearDone={this.clearDone.bind(this)} changeTodoState={this.changeTodoState.bind(this)}/>
      </div>
    )
  }
}


ReactDOM.render(<App/>,document.getElementById('app'))