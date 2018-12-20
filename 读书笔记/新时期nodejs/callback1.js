const fs = require('fs')

function read(path) {
  fs.readFile(path, { encoding: 'UTF-8' }, (err, data) => console.log(data))
}

read('test.txt')
read('test2.txt')


function deepRead(path1, path2) {
  fs.readFile(path1, { encoding: 'UTF-8' }, (err1, data1) => {
    fs.readFile(path2, { encoding: 'UTF-8' }, (err1, data2) => {
      console.log(data1 + data2)
    })
  }) 
}

deepRead('test.txt', 'test2.txt')
