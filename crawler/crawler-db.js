const axios = require("axios"); //引用axios
const moment = require("moment"); //引用moment套件
const fs = require("fs");
const mysql = require("mysql"); //連線到mysql

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  port: 3306,
  password: "12345",
  database: "stock",
});

connection.connect((err) => {
  if (err) {
    console.error("資料庫連不上");
  }
});

// 不關閉連線，認為程式一直在執行
connection.end();

// 先讀 stock.txt > 再用axios > 再console.log資料
// 把函式都先拉出來寫比較美
// 函式一
// function resultCode() {
//   return new Promise((resolve, reject) => {
//     fs.readFile("stock.txt", "utf8", function (err, stockCode) {
//       //把非同步函式搬進來
//       if (err) {
//         reject(err);
//       } else {
//         resolve(stockCode);
//       }
//     });
//   });
// }
// // 函式二
// function resultData(stockCode) {
//   return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
//     //用return 再把then丟出去
//     params: {
//       response: "json",
//       date: moment().format("YYYYMMDD"),
//       stockNo: stockCode,
//     },
//   });
// }

// //再一次用async await呼叫
// async function getData() {
//   try {
//     let stockCode = await resultCode();
//     let result = await resultData(stockCode);
//     console.log(result.data);
//   } catch (err) {
//     console.log(err);
//   }
// }
// getData();
