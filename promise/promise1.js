let doWork = function (job, timer, isOk) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      let dt = new Date();
      if (isOk) {
        resolve(`完成工作: ${job} at ${dt.toISOString()}`);
      } else {
        reject(`失敗了: ${job}`);
      }
    }, timer);
  });
};

let dt = new Date();
console.log(`開始工作 at ${dt.toISOString()}`);

let doHW = doWork("寫功課", 3000, true);

// console.log(doHW); // 這是一個Promise物件
// 解決callback hell 方式一

doHW
  .then(
    // .then()規範 第一個是成功，第二個是失敗
    (resolve) => {
      console.log("第1個函式被呼叫", resolve);
      return doWork("吃早餐", 5000, true);
    }
  )
  .then((resolve) => {
    console.log("第2個函式被呼叫", resolve);
    return doWork("刷牙", 3000, true);
  })
  .then((resolve) => {
    console.log("第3個函式被呼叫", resolve);
  })
  .catch((reject) => {
    console.log("函式被呼叫失敗", reject);
  });

// let eat = doWork("吃早餐", 5000, true);
// eat.then(
//   function (resolve) {
//     console.log("第2個函式被呼叫", resolve);
//   },
//   function (reject) {
//     console.log("第2個函式被呼叫失敗", reject);
//   }
// );

// let brush = doWork("刷牙", 3000, true);
// brush.then(
//   function (resolve) {
//     console.log("第3個函式被呼叫", resolve);
//   },
//   function (reject) {
//     console.log("第3個函式被呼叫失敗", reject);
//   }
// );
