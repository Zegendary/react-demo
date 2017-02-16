/**
 * Created by zhangxinwang on 16/02/2017.
 */
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
};