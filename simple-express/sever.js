const express = require("express");
const connection = require("./utils/db");

// 利用 express 建立了一個 express application
let app = express();

//使用 cors 放在所有"路由"和"中間件"前面
const cors = require("cors");
app.use(cors());

// 要造訪頁面才會經過流程 要有請求才會觸發 類似生命週期
// app.use包著中間鍵 (request,response,next)=>{}
app.use((request,response,next)=>{
    let time = new Date();
    console.log(`我是第一名 在 ${time.toISOString()}`);
    // 要往下走 就給一個next();
    next();
});

app.use((request,response,next)=>{
    let time = new Date();
    console.log(`我是第二名 在 ${time.toISOString()}`);
    next();
});


// HTTP Method: get, post, put, patch, delete
// router 路由
app.get("/", function (request, response, next) {
  response.send("Hello nodemon");
});


// 也可以寫判斷式進到next錯誤訊息
// let isLogin = false;
// if(isLogin){
//   next();
// }else{
//   next({
//     status:401,
//     message:"沒登入",
//   });
// }

app.get("/about", function (request, response, next) {
  // response.send("About me");
  // next()沒帶參數，正常前往下一個
  // next()中帶參數，呼叫express有錯誤，用捕捉錯誤的middleware去接
  // next("去B啊");
  console.log("我是about");
  // 將next中放入錯誤訊息物件 統一丟給特殊middleware處理
  next({
    code:"1001",
    status:500,
    message:"測試錯誤"
  });
});

app.get("/stock", async (req,res,next)=>{
  let result = await connection.queryAsync("SELECT * FROM stock");
  res.json(result);
})

// app.get("/stock", async (req,res,next)=>{
//   let result = await connection.queryAsync("SELECT * FROM stock_price");
//   res.json(result);
// })

//網址後面有股票代碼就抓取對應的資料
app.get("/stock/:stockCode",async (req,res,next)=>{
  //規定的 req.params.stockCode
  let result = await connection.queryAsync("SELECT * FROM stock_price where stock_id=?",[req.params.stockCode]);
  res.json(result);
})

// 處理 404 的中間件
app.use((req,res,next)=>{
  res.status(404).send("Sorry 查無資料");
})

// about中有next("去B啊")有參數->呼叫捕捉錯誤的middleware 因此跑到這裡
// ** 超級特殊的middleware有四個參數 用來捕捉錯誤的 通常放在最下面
app.use((err,req,res,next)=>{
  console.error(err); // err接的是next()中的東西
  res.status(err.status).json(err.message);
});

app.listen(3001, async function () {
  // 因為用createPool 所以不用預先建立連線
  // await connection.connectAsync(); 
  console.log("我的 web server 啟動了～");
})