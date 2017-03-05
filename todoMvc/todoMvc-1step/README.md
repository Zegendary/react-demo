### 如何用webpack搭建react+stylus项目
学习必要条件：略懂`node.js`，略懂`ES6`，然后你的电脑**必须**安装有较新版本[node](https://nodejs.org/en/download/)，没有的同学赶紧安装。
好了，废话不多说，直接开始。

第一部分源码：[todoMvc-1step](https://github.com/Zegendary/react-demo/tree/master/todoMvc/todoMvc-1step)
#[webpack](https://webpack.github.io/docs/what-is-webpack.html)的配置
1. 介绍：[Webpack](https://github.com/webpack/webpack) 是当下最热门的前端资源模块化管理和打包工具。详细见官网
2. 安装：

        $ npm install webpack -g
   
   此时 Webpack 已经安装到了全局环境下，可以通过命令行 webpack -h 试试。

    但通常我们会将 Webpack 以及相关依赖以这种方式安装，如下：
        
        # 进入项目目录
        # 确定已经有 package.json，没有就通过 npm init 创建
        # 安装 webpack 依赖
        $ npm install webpack --save-dev
        # 安装react.js依赖（i是install的简写，-S是--save的简写）
        $ npm i react react-dom -S
  
   剩余的依赖组件参照我源码中的package.json的依赖添加就好。最终，我们得到的package.json应该如下图：
![package.age](http://upload-images.jianshu.io/upload_images/1826203-43b19e9bb8aa4c8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
确保红框中的内容一样即可。

3. 配置

    现在我们已经安装好了依赖，下面我们需要先把项目的目录建好：
       
        .
        ├── node_modules  #  npm install 安装的东西都跑着里面来了
        ├── src  
            ├── components
                ├── app.js  # react组件
            ├── styles
                ├── main.styl  # stylus文件（类似于sass）
            ├── entry.js  #  入口js文件
        ├── index.html  # 入口页面
        ├── package.json  #  项目描述文件（内有相关依赖）
        └── webpack.config.js # webpack配置文件
        
    然后我们在webpack.config.js中添加配置：
    
        module.exports = {
          entry: [
            "./src/entry.js"
          ],
          output: {
            path: './out/',
            filename: "bundle.js"
          },
          module: {
            loaders: [
              { test: /\.js[x]?$/, loader: "babel-loader?presets[]=es2015&presets[]=react", include: /src/},
              { test: /\.css$/, loader: "style!css"},
              { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader"},
              { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
            ]
          }
        }
        
    配置文件将我们的入口文件`entry.js`打包输出到 `./out/bundle.js`，我们直接在页面`index.html`中引入`bundle.js`就好了
    
        <script src="./out/bundle.js"></script>
        
    不懂得话可以参考webpack的文档：[webpack-usage](https://webpack.github.io/docs/usage.html) 和 [webpack-loader](https://webpack.github.io/docs/using-loaders.html)

    关于`/src`目录下的文件内容可以直接到源码中查看。
然后就可以小试牛刀啦，在终端中输入：

        $ webpack
        
    然后我们看到我们的目录下多了个`./out/bundle.js`文件，然后我们在浏览器打开目录下的index.html文件可以看到内容并alert('success')
![todoMvc-step1](http://upload-images.jianshu.io/upload_images/1826203-1ae2afe159ba5f1e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

    那么恭喜你，第一步圆满完成！
  
  [React+webpack从0到1开发一个todoMvc（二）](http://www.jianshu.com/p/ed01cf27b23d) 
  [React+webpack从0到1开发一个todoMvc（三）](http://www.jianshu.com/p/80e54fc179e4)  
  [React+webpack从0到1开发一个todoMvc（四）](http://www.jianshu.com/p/4b3b2f3146e2)  
  [React+webpack从0到1开发一个todoMvc（五）](http://www.jianshu.com/p/86b83192917d) 