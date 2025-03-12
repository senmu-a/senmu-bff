# senmu-bff

一个基于 AWS Serverless 架构的 BFF (Backend For Frontend) 服务层。

## 项目概述

senmu-bff 是一个使用 Koa.js 构建的 Node.js 应用，通过 AWS Lambda 和 API Gateway 运行在 AWS 云平台上。该项目使用 TypeScript 进行开发，并通过 Webpack 打包部署。

## 技术栈

- **后端框架**: Koa.js
- **语言**: TypeScript
- **打包工具**: Webpack
- **云服务**: AWS Lambda, API Gateway
- **部署工具**: AWS SAM CLI

## 项目状态

### 已完成

- [x] 设置 AWS SAM CLI 的凭证信息
- [x] 使用 AWS SAM CLI 进行线上部署

### 进行中

- [x] 使用 AWS SAM CLI 进行本地测试

  ```shell
  0. docker ps # 前提是 docker 必须要安装
  1. sam local invoke # 调用一次 lambda 函数
  2. sam local start-api # 本地启动一个服务供测试 api 的测试
  ```

- [ ] Api Gateway 打日志
- [ ] webpack 打包导致部署到 AWS 出现 404 问题
- [ ] 前端静态资源部署到 S3
- [ ] CloudFront 是什么？
- [ ] 重用代码 - 嵌套应用 `AWS::Serverless::Application`

## 快速开始

### 先决条件

- Node.js (v20 或更高版本)
- AWS 账号及相应权限
- AWS SAM CLI

### 安装依赖

```bash
yarn install
```

### 本地构建

```bash
yarn run build
```

### 本地测试

```bash
sam local start-api
```

### 部署到 AWS

```bash
sam deploy
```

## 项目结构

```shell
senmu-bff/
├── config/        # 应用配置
├── interface/     # TypeScript 接口定义
├── middlewares/   # Koa 中间件
├── routers/       # 路由定义
├── services/      # 业务逻辑服务
├── utils/         # 工具函数
├── views/         # 视图模板
├── lambda.ts      # Lambda 入口文件
└── template.yaml  # AWS SAM 部署模板
```
