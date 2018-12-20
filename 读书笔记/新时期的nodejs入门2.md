## ES6

### let const
* 不允许重复申明
* 不会变量提升
* 块级作用域
* const 声明的对象不可以修改，但是修辞的对象可以修改

### 数组

es5的数组方法
* concat：对象拼接，返回新对象，不改变原始对象
* join：数组元素拼成array，返回字符串
* pop: 返回数组结尾的元素，改变原数组
* push： 数组结尾加入新元素，返回新数组长度
* reverse： 数组翻转，会改变原数组
* shift：删除数组中第一个元素，返回该元素，会改变原数组
* sort: 数组排序，会改变原数组
* slice：数组截取，不改变原数组
* splice：删除现有元素，添加新元素，返回原数组被删除的内容
* toString:转化为string
* unShift：在数组头加入1个或者多个新元素，返回新数组长度

es6新增的方法
* find
* findIndex
* fill
* entries 返回键值对的Iterator对象
* keys  返回数组的key的Iterator对象，可以拿来遍历
* values 返回数组的value的Iterator对象，可以拿来遍历

Demo
```js
let arr = ["a","b","c"]
console.log([...arr.keys()]) // [0,1,2]
console.log([...arr.values()]) // ["a","b","c"]
console.log([...arr.entries()]) // [[0,"a"],[1,'b'],[2,'c']]
```

### 函数
* 函数参数默认值
* spread运算符
* 箭头函数
箭头函数带来的this指向的问题

### 对象cv 
继承

方法1： new + 原型链                
```js
function Father(name="father"){
  this.name = name
  this.work = [1,2,3]
}

Father.prototype.getName = function(){
  return this.name
}

function Child(age,name){
  this.age = age
}

Child.prototype = new Father()
Child.prototype.getAge = function(){
  return this.age
}
Child.prototype.constructor = Child
let child1 = new Child(25)
let child2  = new Child(50)
```
弊端：child对象是父类的实例，也是子类的实例。
但是不能给父类传递参数

方法2：借用父类构造函数
```js
function Father(name="father"){
  this.name = name
  this.work = [1,2,3]
}

Father.prototype.getName = function(){
  return this.name
}

function Child(age,name){
  this.age = age
  Father.call(this,name)
}

Child.prototype.getAge = function(){
  return this.age
}

let child1 = new Child(25,"jim")
let child2  = new Child(50,"green")
```
弊端：可以传递参数，但是child不是father类的实例，原型链上没有getName方法了

方法3 混合继承

结合方法1和方法2：
```js
function Father(name="father"){
  this.name = name
  this.work = [1,2,3]
}

Father.prototype.getName = function(){
  return this.name
}

function Child(age,name){
  this.age = age
  Father.call(this,name)
}

Child.prototype = new Father()
Child.prototype.getAge = function(){
  return this.age
}

let child1 = new Child(25,"jim")
let child2  = new Child(50,"green")
```
这个方法可以避免上面的问题，但是带来了一个新问题

Child.prototype = new Father()这里会调用Father方法执行内部逻辑，child1对象的原型链上还会有name和work2个属性，只是由于原型链的遮蔽效应，这2个属性不会被取到
```js
{
  age: 25
  name: "jim"
  work: (3) [1, 2, 3]
  __proto__: Father 
    getAge: ƒ ()
    name: "father"
    work: (3) [1, 2, 3]
    __proto__: Object
}

```
方法4 原型
ES6引入的方法Object.create()

let obj2 = Object.create(obj1)
其实就是obj2.__proto__ = obj1
用new来简单的实现就是

function create(obj1){
  let Func = function(){}
  Func.prototype = obj1
  return new Func()
}

```js
function Father(name="father"){
  this.name = name
  this.work = [1,2,3]
}

Father.prototype.getName = function(){
  return this.name
}

function Child(age,name){
  this.age = age
  Father.call(this,name)
}

Child.prototype = Object.create(Father.prototype)

Child.prototype.getAge = function(){
  return this.age
}

let child1 = new Child(25,"jim")
let child2  = new Child(50,"green")
```
方法5 class实现
```js
class Father {
  constructor(name="father"){
    this.name = name
    this.work = [1,2,3]
  }
  getName(){
    return this.name
  }
}

class Child {
  constructor(name,age){
    super(name)
    this.age = age
  }
  getAge(){
    return this.age
  }
}
```