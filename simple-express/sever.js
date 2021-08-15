const { response } = require("express");
const express = require("express");

// 利用 express 建立了一個 express application
let app = express();

//要造訪頁面才會經過流程
app.use((request,response,next)=>{
    let time = new Date();
    console.log(`我是第一名 在 ${time.toISOString()}`);
    next();
});

app.use((request,response,next)=>{
    let time = new Date();
    console.log(`我是第二名 在 ${time.toISOString()}`);
    next();
});

// HTTP Method: get, post, put, patch, delete
app.get("/", function (request, response, next) {
  response.send("Hello");

});

app.get("/about", function (request, response, next) {
    response.send("About me");
  });

app.listen(3000, function () {
console.log("我的 web server 啟動了～");
})