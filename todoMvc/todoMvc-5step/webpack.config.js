module.exports = {
  entry: [
    "./src/entry.js" //入口文件
  ],
  output: {
    path: './out/',
    filename: "bundle.js" //输出文件
  },
  module: {
    loaders: [
      { test: /\.js[x]?$/, loader: "babel-loader?presets[]=es2015&presets[]=react", include: /src/},//支持es6
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.styl$/, loader: "style-loader!css-loader!stylus-loader"},//支持stylus
      { test: /\.(png|jpg)$/, loader: 'url?limit=8192'}
    ]
  }
};