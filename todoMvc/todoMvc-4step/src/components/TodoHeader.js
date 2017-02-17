/**
 * Created by zhangxinwang on 17/02/2017.
 */
import React from 'react'

class TodoHeader extends React.Component {
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
      this.props.addTodo(newTodoItem)
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
export default TodoHeader