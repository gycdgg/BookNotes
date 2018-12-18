let fs = require("fs")

fs.readFile("test.txt",(err,data)=>{
  console.log(data)
  console.log(data.toString("UTF-8"))
})

fs.readFile("test.txt",{encoding: "UTF-8"},(err,data)=>{
  console.log(data)
})

fs.writeFile("test.txt","hello node",(err,data) => {
  console.log(err,data)
})

fs.stat("test.txt",(err,data)=>{
  data && fs.open("test.txt",'a',()=>{})
  console.log(data)
})

console.log('do something')