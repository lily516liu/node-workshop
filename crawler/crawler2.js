const axios = require("axios"); //引用axios
const moment = require("moment"); //引用moment套件
// moment().format("YYYYMMDD") moment用法
const fs = require("fs");

new Promise((resolve, reject) => {
  fs.readFile("stock.txt", "utf8", function (err, stockCode) {
    //把非同步函式搬進來
    if (err) {
      reject(err);
    } else {
      resolve(stockCode);
    }
  });
})
  .then((stockCode) => {
    return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
      //用return 再把then丟出去
      params: {
        response: "json",
        date: moment().format("YYYYMMDD"),
        stockNo: stockCode,
      },
    });
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
