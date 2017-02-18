/**
 * Created by zhangxinwang on 17/02/2017.
 */
import React from 'react'
import { Button,Checkbox } from 'antd'

class TodoItem extends React.Component {
  handlerChange() {
    let isDone = !this.props.isDone;
    this.props.changeTodoState(this.props.index, isDone);
  }
  handlerDelete() {
    this.props.deleteTodo(this.props.index)
  }
  render() {
    let className = this.props.isDone?'task-done':''
    return (
      <li>
        <Checkbox checked={this.props.isDone} onChange={this.handlerChange.bind(this)}/>
        <label>
          <span className={className}>{this.props.text}</span>
        </label>
        <Button type="danger" size="small" onClick={this.handlerDelete.bind(this)}>删除</Button>
      </li>
    )
  }
}

export default TodoItem