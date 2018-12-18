## 常用模块

### 1. 事件循环

事件：**在可交互的用户界面上（浏览器页面），用户会产生一系列的动作，包括点击，拖动，滑动等，还有Ajax执行成功，也会有成功和失败事件**

循环：用ajax为例，当请求成功，这个队列中就会加入一件成功的事件，随后被循环遍历到，执行这个成功的callback、

#### Node中的eventloop
Node中的eventloop分为6个不同的阶段
1. timer：处理setTimeout和setInterval。定时器的callback总是优先被执行，触发后加入队列中
2. io的Callback，大多数的callback都在这个阶段执行
3. idle，prepare
4. poll 轮询，循环可能在这里阻塞
5. check: setImmediate事件的回调
6. close callbacks: 处理一些close的回调

process.nextTick:定义一个异步的动作，该动作在时间循环的当前阶段被执行。

### 2. 常用模块
#### 2.1 Module
1. commonsjs：同步加载
2. AMD： 异步加载

#### 2.2 Buffer
buffer是node对js类型的补充，二进制数据流在后端比较常见，比如文件，图片等。
在文件操作和网络操作中，不显示的指定编码格式，默认的就是Buffer类型
```js
let fs = require("fs")
fs.readFile("test.txt",(err,data)=>{
  console.log(data) // <Buffer e4 bd a0 e4 bb 8a e5 a4 a9 e5 9c a8 e5 b9 b2 e5 98 9b>
})
```

#### 2.3 file system
文件系统是node很重要的模块，使用频率也很高
常见的如下
1. readFile
fs.readFile(file[,option],call)
```js
let fs = require("fs")
fs.readFile("test.txt",{encoding:"UTF-8"},(err,data)=>{
  console.log(data) // 你今天在干嘛
})
```

2. writeFile

fs.writeFile(file,data[,options],callback)
eg.
```js
let fs = require("fs")
fs.writeFile("test.txt","hello node",(err,data) => {
  console.log(err,data) // null undefined
})
```
修改已经存在的文件，不存在就创建新的文件

3. fs.stat
查看文件的状态，存在就返回文件的详情

```js
fs.stat("test.txt",(err,data)=>{
  console.log(data)
})
```

#### 2.4 HTTP 服务
创建http服务

```js
let http = require("http")
const port = 3003
console.log(`server listening at port http://localhost:${port}`)
const server = http.createServer((req,res)=>{
  res.writeHead(200,{"Content-Type":'text/plain'})
  res.end("hello world")
})

server.on("connection",(req,res)=>{
  console.log("connected success")
})

server.listen(3003)
```

### 2.5 Events
 Events模块就定义了一个类：eventEmitter
```js
const events = require('events')
const myEmitter = new events()

myEmitter.on("action",funtion(){
  console.log("=>action")
})

myEmiter.emit("action")
```
这个代码先是实例化了一个emitter类，然后注册了一个action的事件，之后触发了这个事件