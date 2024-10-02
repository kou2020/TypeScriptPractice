//引入一个path包
const path = require("path");
//引入一个HTML插件包
const HtmlWebpackPlugin = require("html-webpack-plugin");
//引入clean-webpack-plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  //指定mode
  mode: "development",
  //指定入口文件
  entry: "./src/index.ts",
  //指定打包文所在目录
  output: {
    //指定打包文件的路径
    path: path.resolve(__dirname, "dist"),
    //打包文件的文件名
    filename: "bundle.js",
    environment: {
      arrowFunction: false, // 关闭webpack的箭头函数，可选
      const: false,
    },
  },
  //指定webpack打包的时候使用的module
  module: {
    //指定要加载的规则
    rules: [
      {
        //test指定的是规则生效的文件
        test: /\.ts$/,
        //要使用的loader
        use: [
          //配置babel
          {
            //指定加载器
            loader: "babel-loader",
            //设置babel
            options: {
              //设置预定义的环境
              presets: [
                [
                  //指定环境插件
                  "@babel/preset-env",
                  //配置信息
                  {
                    //要兼容的目标浏览器
                    targets: {
                      ie: "10",
                    },
                    //指定corejs的版本
                    corejs: "3",
                    //使用corejs的方式"usage"表示按需求加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        //要排除的文件
        exclude: /node_modules/,
      },
      //设置less文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          //引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },
  //配置webpack插件
  plugins: [
    new HtmlWebpackPlugin({
      // title: "TS测试",
      //使用自定义的html模板
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
  //用来设置引入模块
  resolve: {
    extensions: [".ts", ".js"],
  },
};
