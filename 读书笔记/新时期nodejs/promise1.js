let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject()
xhr.open('GET', 'https://www.baidu.com')
xhr.onreadystatechange = () => {
  if(xhr.readyState === 4) {
    if(xhr.status === 200) {
      console.log(xhr.response)
    }else{
      console.log(xhr.response)
    }
  }
}
xhr.send()