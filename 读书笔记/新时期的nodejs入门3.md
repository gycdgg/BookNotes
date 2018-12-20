## 书写异步代码

#### 嵌套回调
```js
const fs = require("fs")

function read(path){
  return fs.readFile(path,{encoding:"UTF-8"},(err,data) => console.log(data))
}

read("test.txt")
read("test2.txt")
```
打印的顺序并不受控制，这里是依据文件解析的速度，先解析完成的会加入到执行队列中。
但是有些场景需要依赖上一个解析完成的文件。
我们可以采取嵌套的方式解决
```js
function deepRead(path1,path2){
  fs.readFile(path1,{encoding:"UTF-8"},(err1,data1) =>{
    fs.readFile(path2,{encoding:"UTF-8"},(err1,data2)=>{
      console.log(data1+data2)
    })
  })
}

deepRead("test.txt","test2.txt")
```
当有更多的层级，这里的代码嵌套就会很深了。这就是callback hell(回调地狱)

### 使用promise



