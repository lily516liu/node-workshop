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

app.get("/about", function (request, response, next) {
  response.send("About me");
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


app.listen(3001, async function () {
  // 因為用createPool 所以不用預先建立連線
  // await connection.connectAsync(); 
  console.log("我的 web server 啟動了～");
})