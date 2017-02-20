/**
 * Created by zhangxinwang on 17/02/2017.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Button,Checkbox } from 'antd'

class TodoItem extends React.Component {
  handlerChange() {
    let isDone = !this.props.isDone;
    this.props.changeTodoState(this.props.index, isDone);
  }
  handlerDelete() {
    this.props.deleteTodo(this.props.index)
  }
  handlerMouseIn () {
    ReactDOM.findDOMNode(this.refs.delButton).style.display = 'inline-block'
  }
  handlerMouseOut () {
    ReactDOM.findDOMNode(this.refs.delButton).style.display = 'none'
  }
  render() {
    let className = this.props.isDone?'task-done':''
    return (
      <li onMouseOver={this.handlerMouseIn.bind(this)} onMouseOut={this.handlerMouseOut.bind(this)}>
        <Checkbox checked={this.props.isDone} onChange={this.handlerChange.bind(this)}/>
        <span className="time">{this.props.time}</span>
        <span className={className+' task'}>{this.props.text}</span>
        <Button ref="delButton" type="danger" size="small" onClick={this.handlerDelete.bind(this)}>删除</Button>
      </li>
    )
  }
}

export default TodoItem