/**
 * Created by zhangxinwang on 17/02/2017.
 */
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