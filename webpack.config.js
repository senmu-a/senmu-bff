const path = require('path');  // 引入 Node.js 路径模块，用于处理文件路径
// const TerserPlugin = require('terser-webpack-plugin');  // 压缩 JS 代码的插件

// 定义 Lambda 层依赖包列表，这些包将不会被打包到构建产物中
// 而是从 Lambda 层中引用，减小打包体积
const layerDependencies = [
  'awilix',
  'awilix-koa',
  'co',
  'koa',
  'koa-router',
  'koa-static',
  'koa-swig',
  'log4js',
  'module-alias',
  'serverless-http'
];

module.exports = {
  entry: {
    lambda: './lambda.ts',  // 入口文件设置，名称为 lambda，路径为 ./lambda.ts
  },
  target: 'node',    // 目标环境为 Node.js !!!
  mode: 'development',  // 构建模式为开发模式
  
  // 设置外部依赖，这些依赖不会被打包
  externals: [
    ({ request }, callback) => {
      // 如果是 Lambda 层中的依赖，标记为 commonjs 外部模块
      if (layerDependencies.includes(request)) {
        return callback(null, `commonjs ${request}`);
      }
      // express 单独处理为外部模块
      if (request === 'express') {
        return callback(null, `commonjs ${request}`);
      }
      callback();  // 非外部依赖则正常处理
    },
  ],
  
  // 模块加载规则
  module: {
    rules: [
      {
        test: /\.tsx?$/,  // 处理 .ts 和 .tsx 文件
        exclude: [  // 排除以下文件和目录
          /node_modules/,  // 排除第三方模块
          /\.spec\.ts$/,   // 排除测试文件
          /\.e2e-spec\.ts$/,  // 排除端到端测试文件
          path.resolve(__dirname, 'test'),  // 排除测试目录
          path.resolve(__dirname, 'src/**/*.spec.ts'),  // 排除源码中的测试文件
        ],
        use: {
          loader: 'ts-loader',  // 使用 ts-loader 处理 TypeScript
          options: {
            transpileOnly: true,  // 只转译不类型检查，提高构建速度
            experimentalWatchApi: true,  // 启用实验性的文件监视 API，提高增量构建性能
          },
        },
      },
    ],
  },
  
  // 模块解析配置
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],  // 自动解析的扩展名
    alias: {
      '@': path.resolve(__dirname, 'src/'),  // 设置 @ 作为 src 目录的别名
    },
  },
  
  // 输出配置
  output: {
    path: path.resolve(__dirname, 'dist'),  // 输出目录为 dist
    filename: (pathData) => {
      // 入口文件固定命名为 lambda.js，其他块使用默认命名
      return pathData.chunk.name === 'lambda' ? 'lambda.js' : '[name].js';
    },
    chunkFilename: '[name].[contenthash].js',  // 非入口 chunk 文件命名方式，使用内容哈希以便缓存
    clean: true,  // 构建前清理输出目录
    libraryTarget: 'commonjs2',  // 输出的库类型为 CommonJS 模块
  },
  
  // 优化配置
  optimization: {
    minimize: false,  // 不压缩代码
    runtimeChunk: false,  // 不生成 runtime chunk
    splitChunks: {  // 代码分割配置
      chunks: 'all',  // 分割所有类型的代码块
      minSize: 0,     // 生成 chunk 的最小体积（这里设为 0，表示不管大小都分割）
      cacheGroups: {  // 缓存组配置
        default: false,  // 禁用默认缓存组
        vendors: false,  // 禁用 vendors 缓存组
        sources: {  // 自定义 sources 缓存组
          test: /\.ts$/,  // 仅处理 .ts 文件
          name(module) {
            // 如果是入口文件，不单独分割
            if (module.resource.endsWith('lambda.ts')) {
              return false;
            }
            // 根据文件在 src 下的相对路径命名分割后的文件
            const srcPath = path.relative(
              path.join(__dirname, 'src'),
              module.resource
            );
            return srcPath.replace(/\.ts$/, '');  // 去掉 .ts 后缀
          },
          chunks: 'all',    // 处理所有类型的 chunk
          enforce: true,    // 强制创建这个缓存组的 chunk
          priority: 10,     // 缓存组优先级
        },
      },
    },
  },
  
  // 构建统计信息配置
  stats: {
    errorDetails: true,  // 显示错误详情
    chunks: true,        // 显示 chunk 信息
    modules: true,       // 显示模块信息
  },
  
  // 源码映射配置，生成 source map 便于调试
  devtool: 'source-map',
};
