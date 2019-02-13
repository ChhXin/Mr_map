const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    devtool: 'sourcemap',
    output: {
        path: path.join(__dirname, 'public/dist'), //输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它
        publicPath: '/dist/',
        filename: "[name].bundle.js"
    },
    //加载器
    module: {
        rules: [
            {//ES6、JSX处理
                test: /\.(js|jsx)$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "env",
                                "react",
                                "stage-0"
                            ],
                            plugins: [
                                ['import', [{ libraryName: "antd", style: 'css' }]],
                            ]
                        },
                    }
                ]
            },
            {//css处理
                test: /\.css$/,
                loader: "style-loader!css-loader?modules",
                exclude: /node_modules/,
            },
            {//antd样式处理
                test: /\.css$/,
                exclude: path.resolve(__dirname, "src"),
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            },
            {//less处理
                test: /\.less$/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader",
                    options: {
                        javascriptEnabled: true,
                    }
                }]
            },
            {//图像字体文件处理
                test: /\.(png|jpg|gif|ttf|eot|svg|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    name: '[path][name].[ext]&limit=200000'
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Mr_map',
            filename: "index.html",//输出html文件，打包时插入js,不用自己手动引入
            inject: 'body',  //js插入的位置，true/'head'/'body'/false
            hash: true
        }),
    ],
    devServer: {
        host: 'localhost', //默认localhost
        contentBase: path.resolve(__dirname, 'public'), //默认当前工程目录
        port: 3000, //默认3000
        inline: true, //可以监控js变化
        hot: true,//热替换
        historyApiFallback: {
            index: 'public/404.html',
            rewrites: [
                { from: /^\/map/, to: 'public/index.html' },
            ]
        },
        disableHostCheck: true,
        compress: true,
    },
};
