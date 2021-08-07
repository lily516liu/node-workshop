const axios = require("axios"); //引用axios
const moment = require("moment"); //引用moment套件
const fs = require("fs");

// 先讀 stock.txt > 再用axios > 再console.log資料

async function getData() {
  try {
    let stockCode = await new Promise((resolve, reject) => {
      fs.readFile("stock.txt", "utf8", function (err, stockCode) {
        //把非同步函式搬進來
        if (err) {
          reject(err);
        } else {
          resolve(stockCode);
        }
      });
    });
    let result = await axios.get(
      "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
      {
        //用return 再把then丟出去
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
      }
    );
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}
getData();
