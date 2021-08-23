const axios = require("axios"); //引用axios
const moment = require("moment"); //引用moment套件
const fs = require("fs");

// 先讀 stock.txt > 再用axios > 再console.log資料
// 把函式都先拉出來寫比較美
// 函式一
function readStock() {
  return new Promise((resolve, reject) => {
    fs.readFile("stock.txt", "utf8", function (err, stockCode) {
      //把非同步函式搬進來
      if (err) {
        reject(err);
      } else {
        resolve(stockCode);
      }
    });
  });
}
// 函式二
function resultData(stockCode) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    //用return 再把then丟出去
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode,
    },
  });
}

//再一次用async await呼叫
async function getData() {
  try {
    let stockCode = await readStock();
    let result = await resultData(stockCode);
    console.log(result.data);
  } catch (err) {
    console.log(err);
  }
}
getData();
