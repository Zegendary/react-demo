[todoMvc-4step源码](https://github.com/Zegendary/react-demo/tree/master/todoMvc/todoMvc-4step)

[todoMvc-4step演示](https://zegendary.github.io/react-demo/todoMvc/todoMvc-4step/)

这一章主要以【删除】键为例讲一下如何使用以 [React](http://facebook.github.io/react/) 封装了一套 [Ant Design](https://ant.design/index-cn) 的组件库：

![Ant Design](http://upload-images.jianshu.io/upload_images/1826203-f3afc4ccb39696a9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### 1.安装

推荐使用 npm 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。
可以通过 npm 直接安装到项目中，使用 `import` 或 `require` 进行引用。
        
    $ npm install antd --save

### 2.加载

可以通过以下的写法来按需加载组件。

    import Button from 'antd/lib/button';
    import 'antd/lib/button/style'; // 或者 antd/lib/button/style/css 加载 css 文件

但我推荐使用更简便的写法：
首先需要安装[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 依赖

    $ npm install babel-plugin-import --save-dev
    
然后在我们的根目录下新建`.babelrc`：

    {
      "plugins": [["import", {"libraryName": "antd", "style": "css"}]] //import js and css modularly
    }
    
这时我们需要什么UI组件，即可如下这么写以达到按需加载`js`和`css`：

    import { Button } from 'antd';

### 3.使用

由于`Antd`组件已经油`React`封装好了，用法和原生html标签没差：

    <Button type="danger" size="small" onClick={this.handlerDelete.bind(this)}>删除</Button>

剩余的样式我们就可以对着[antd components](https://ant.design/components/button-cn/)的demo来开发。

[React+webpack从0到1开发一个todoMvc（一）](http://www.jianshu.com/p/aa02a10c5b69)
[React+webpack从0到1开发一个todoMvc（二）](http://www.jianshu.com/p/ed01cf27b23d)
[React+webpack从0到1开发一个todoMvc（三）](http://www.jianshu.com/p/80e54fc179e4) 
[React+webpack从0到1开发一个todoMvc（五）](http://www.jianshu.com/p/86b83192917d) 