[todoMvc-5step源码](https://github.com/Zegendary/react-demo/tree/master/todoMvc/todoMvc-5step)  
[todoMvc-5step演示](https://zegendary.github.io/react-demo/todoMvc/todoMvc-5step/)

这一章主要将上一章已经成型的TodoMvc增加【注册】、【登陆】、【数据储存】的功能，这里我们把数据保存到[leancloud](https://leancloud.cn/)。

### 1.创建 LeanCloud 账户
你需要去 [https://leancloud.cn](https://leancloud.cn/) 创建一个账户。
创建成功后，你需要验证你的邮箱，否则无法创建应用。

### 2.创建TodoMVC应用
如下图操作：
![创建应用](http://upload-images.jianshu.io/upload_images/1826203-dbbd7861bc7d7143.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
创建成功后就放在那里，因为接下来我们要按照 LeanCloud 的「[JavaScript SDK 文档](https://leancloud.cn/docs/sdk_setup-js.html)」来开发登录、注册功能。

### 3.准备HTML页面
登陆和注册的页面同样也以组件的形式单独抽离出来，样式如图：

![登录注册](http://upload-images.jianshu.io/upload_images/1826203-6e7b77b53efa371c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
组件`Login.js`代码如下：

    import React from 'react'
    import { Form, Icon, Input, Button } from 'antd';
    
    const FormItem = Form.Item;
    
    const Login = Form.create()(React.createClass({
      handleSubmit(e) {  // 提交操作
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.props.loginOrSignUp(values)
          }
        });
      },
      render() {
        const { getFieldDecorator } = this.props.form;
        let text = this.props.value == 1 ?'注册':'登陆' // 判断“登陆”或者注册功能
        return (
            <Form onSubmit={this.handleSubmit} className="login-form"> // antdUI的表单
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }], // 必须填写项
                })(
                    <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  {text}
                </Button>
              </FormItem>
            </Form>
        );
      },
    }));
    export default Login
在`app.js`中做判断，如果**已登录**，则显示ToDo应用界面，否则显示登陆界面：

    render(){
      if (!this.state.currentUser){ // 判断是否已经登录
        const RadioGroup = Radio.Group;
        return (
            <div className="form-wrapper">
              <h1 className="todo-title">React-Todos</h1>
              <RadioGroup className="radio-wrapper" onChange={this.onChange.bind(this)} value={this.state.value}>
                <Radio value={1}>注册</Radio>
                <Radio value={2}>登入</Radio>
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

### 4.注册&登陆
1.安装 LeanCloud SDK

[https://leancloud.cn/docs/sdk_setup-js.html](https://leancloud.cn/docs/sdk_setup-js.html)
    
    $ npm install leancloud-storage --save
2.初始化

[https://leancloud.cn/docs/sdk_setup-js.html#初始化](https://leancloud.cn/docs/sdk_setup-js.html#%E5%88%9D%E5%A7%8B%E5%8C%96)
`app.js`:

    import AV from 'leancloud-storage'
    
    const appId = 'XXXXXXXXXXXXXXXXXXXXXX' //这里的appId就是刚才我们创建的应用的Id，每个人都不一样
    const appKey = 'XXXXXXXXXXXXXXXXXXX';
    AV.init({ appId, appKey });
3.写入注册登陆的方法
我们先要通读一下 LeanCloud [关于注册的文档](https://leancloud.cn/docs/leanstorage_guide-js.html#%E7%94%A8%E6%88%B7%E5%90%8D%E5%92%8C%E5%AF%86%E7%A0%81%E6%B3%A8%E5%86%8C)，然后按照里面的demo去做修改。
`app.js`:

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
    
下面还需要去做【登出】、【保存Todo】等功能。这里我就不贴出来代码了，可以直接去github上面去看我的[app.js源码](https://github.com/Zegendary/react-demo/blob/master/todoMvc/todoMvc-5step/src/components/app.js)。
至此，我们React+Webpack+Antd 的一个TodoMVC就开发完毕了。希望能帮助小伙伴。

[React+webpack从0到1开发一个todoMvc（一）](http://www.jianshu.com/p/aa02a10c5b69)
[React+webpack从0到1开发一个todoMvc（二）](http://www.jianshu.com/p/ed01cf27b23d)
[React+webpack从0到1开发一个todoMvc（三）](http://www.jianshu.com/p/80e54fc179e4)
[React+webpack从0到1开发一个todoMvc（四）](http://www.jianshu.com/p/4b3b2f3146e2) 