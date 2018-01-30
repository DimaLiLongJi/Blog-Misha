const promise = new Promise((resolve, reject) => {
  console.log('做些什么');
  if ( /* 异步操作成功 */ ) {
    resolve(value);
  } else {
    reject(error);
  }
}).then((result) => {
  console.log('异步开始');
}).catch((error) => {
  console.error(error)
});



// 一个例子 实现同步ajax
const getJSON = (url) => {
  const promise = new Promise((resolve, reject) => {
    const handler = () => {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json")
  .then((json) => {
    console.log('Contents: ' + json);
  })
  .catch((error) => {
    console.error(error)
  });

// 其实也可以用 await 和 async
await const id = (setTimeout( // 同步
  console.log(123)
), 100)();

async const d = (setTimeout( // 异步
  console.log(123)
), 100)()
  .then(() => {
    console.log(234);
  })
