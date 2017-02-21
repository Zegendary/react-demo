/**
 * Created by zhangxinwang on 16/02/2017.
 */
import React from 'react'
import ReactDOM from 'react-dom'

import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'
import Login from './Login'
import { Radio } from 'antd';
import AV from 'leancloud-storage'

const appId = 'VU2Q5GFPX9GzaOOQ0ka4pIOa-gzGzoHsz';
const appKey = 'lE8CkfPRCgSBApNu3zmKUGht';
AV.init({ appId, appKey });

class App extends React.Component { //定义组件，继承父类
  constructor() {
    super()
    this.state = {
      todos: [],
      todoId: null,
      isAllChecked: false,
      currentUser: null,
      value: 1,
    }
  }
  //添加todoitem
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
  //清除已经完成事件
  clearDone(){
    let todos = this.state.todos.filter(todo => !todo.isDone)
    this.setState({
      todos : todos
    })
  }
  //删除某个todoitem
  deleteTodo(index) {
    this.state.todos.splice(index,1)
    this.setState({todos: this.state.todos})
  }
  //修改登录或者注册
  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  }
  //登陆或者注册
  loginOrSignUp(values){
    //判断是登陆还是注册
    if (this.state.value === 1){
      let user = new AV.User();
      user.setUsername(values.userName);
      user.setPassword(values.password);
      user.signUp().then((loginedUser) => {
        this.state.currentUser = this.getCurrentUser()
        this.setState({currentUser: this.state.currentUser})
      }, function (error) {
        alert("注册失败")
      })
    } else if (this.state.value === 2){
      console.log("执行登陆")
      AV.User.logIn(values.userName, values.password).then((loginedUser) => {
        this.state.currentUser = this.getCurrentUser()
        this.setState({currentUser: this.state.currentUser})
        this.fetchTodos()
      }, function (error) {
        alert("登陆失败")
      });
    }
  }
  //获取当前用户
  getCurrentUser() {
    let current = AV.User.current()
    if (current){
      let {id, createdAt, attributes: {username}} = current
      return {id, username, createdAt}
    } else{
      return null
    }
  }
  //登出用户
  logout() {
    AV.User.logOut()
    this.state.currentUser = null
    window.location.reload()
  }
  //将todo储存到服务器上
  saveTodos() {
    let dataString = JSON.stringify(this.state.todos)
    var AVTodos = AV.Object.extend('AllTodos');
    var avTodos = new AVTodos();
    // 新建一个 ACL 实例
    var acl = new AV.ACL();
    acl.setReadAccess(AV.User.current(),true)
    acl.setWriteAccess(AV.User.current(),true)

    avTodos.setACL(acl) // 设置访问控制

    avTodos.set('content', dataString);
    avTodos.save().then((todo) => {
      this.state.todoId = todo.id
      this.setState({todoId:this.state.todoId})
      console.log('保存成功');
    }, function (error) {
      // 异常处理
      console.log('保存失败');
    });
  }
  //更新todo到服务器上
  updateTodos() {
    let dataString = JSON.stringify(this.state.todos)
    let avTodos = AV.Object.createWithoutData('AllTodos', this.state.todoId)
    avTodos.set('content', dataString)
    avTodos.save().then(()=>{
      console.log('更新成功')
    })
  }
  //判断应该更新或储存list到leanCloud
  saveOrUpdateTodos() {
    if(this.state.todoId){
      this.updateTodos()
    } else {
      this.saveTodos()
    }
  }
  componentWillMount() {
    this.state.currentUser = this.getCurrentUser()
    this.fetchTodos()
    this.setState({currentUser: this.state.currentUser})
  }
  fetchTodos() {
    if(this.state.currentUser){
      var query = new AV.Query('AllTodos');
      query.find()
          .then((todoList) => {
            let avAllTodos = todoList[0]// 因为理论上 AllTodos 只有一个，所以我们取结果的第一项
            let id = avAllTodos.id
            this.state.todos = JSON.parse(avAllTodos.attributes.content)
            this.state.todoId = id
            this.setState({todos:this.state.todos,todoId:this.state.todoId})
          }, function(error){
            console.error(error)
          })
    }
  }
  render(){
    if (!this.state.currentUser){
      const RadioGroup = Radio.Group;
      return (
        <div className="form-wrapper">
          <h1 className="todo-title">React-Todos</h1>
          <RadioGroup className="radio-wrapper" onChange={this.onChange.bind(this)} value={this.state.value}>
            <Radio value={1}>注册</Radio>
            <Radio value={2}>登陆</Radio>
          </RadioGroup>
          <Login loginOrSignUp={this.loginOrSignUp.bind(this)} value={this.state.value}/>
        </div>
      )
    } else {
      let info = {
        isAllChecked: this.state.isAllChecked,
        todoCount: this.state.todos.length || 0,
        todoDoneCount: (this.state.todos && this.state.todos.filter((todo) => todo.isDone)).length || 0
      }
      return (
        <div className="todo-wrapper">
          <TodoHeader addTodo={this.addTodo.bind(this)} currentUser={this.state.currentUser} logout={this.logout.bind(this)}/>
          <TodoMain todos={this.state.todos} changeTodoState={this.changeTodoState.bind(this)} deleteTodo={this.deleteTodo.bind(this)} saveOrUpdateTodos={this.saveOrUpdateTodos.bind(this)}/>
          <TodoFooter {...info} clearDone={this.clearDone.bind(this)} changeTodoState={this.changeTodoState.bind(this)}/>
        </div>
      )
    }
  }
}


ReactDOM.render(<App/>,document.getElementById('app'))