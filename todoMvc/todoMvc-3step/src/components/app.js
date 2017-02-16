/**
 * Created by zhangxinwang on 16/02/2017.
 */
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component { //定义组件，继承父类
  constructor() {
    super()
    this.state = {
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
      console.log(this.state.todos)
      this.setState({todos: this.state.todos});  //改变状态
    }
  }
  render(){
    return (
      <div className="todo-input">
        <input type="text" placeholder="请输入待办事项" onKeyUp={this.handlerKeyUp.bind(this)}/>
        <Item todos={this.state.todos}/>
      </div>
    )
  }
}
class Item extends React.Component {
  render(){
    return (
      <div>
        <ul>
          {this.props.todos.map((todo,index) => {{
            return (
                <li key={todo.text.toString()}>{todo.text}</li>//Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity
            )
          }})}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))