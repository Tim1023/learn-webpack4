const path = require('path'); //node配置模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports={
  //入口配置（必须）
  entry:{
    index: './src/index.js',
    main: './src/main.js',
  },
  //出口配置（必须）
  output:{
    path: path.resolve(__dirname, 'dist'),//path必须为绝对路径
    filename: '[name].bundle.js'
  },
  //module模块,rules（非必须）
  module:{
    rules: [{
      test : /\.css$/, //正则匹配css文件
      //use: ['style-loader','css-loader']
      //loader: ['style-loader','css-loader']
      use: [
        {loader: "style-loader"},
        {loader: "css-loader"}
      ]
    }]
  },
  //plugins插件（非必须）
  plugins:[
    new webpack.HotModuleReplacementPlugin(), //热加载插件
    new CleanWebpackPlugin(['dist']), //每次编译清空dist
    new HtmlWebpackPlugin({
      filename : 'index.html', //生成的文件名称
      chunks : ['index'], //加入的js文件，若无此属性，则默认为所有js
      hash : true, //生成hash数值，避免产生缓存
      title : '实际标题', //html的title标签值
      template : './src/index.html' //模板文件路径
    }),
    new HtmlWebpackPlugin({
      filename : 'main.html',
      hash : true,
      title : '实际标题',
      template : './src/index.html'
    })
  ],
  //开发服务器（非必须）
  devServer:{
    //设置服务器的基本访问目录
    contentBase: path.resolve(__dirname,'dist'),
    //服务器地址，localhost
    host: 'localhost',
    //设置端口
    port: 8888,
    //自动打开页面
    open: true
  }
};