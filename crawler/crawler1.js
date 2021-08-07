const axios = require("axios"); //引用axios
const moment = require("moment"); //引用moment套件
// moment().format("YYYYMMDD") moment用法
const fs = require("fs");

// node.js內建的讀取檔案 fs.readFile("文件","編碼",function(){})
fs.readFile("stock.txt", "utf8", function (err, stockCode) {
  if (err) {
    console.log(err);
  } else {
    // console.log(data);
    console.log("成功");
    // axios文件用法;
    axios
      .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
        params: {
          response: "json",
          date: moment().format("YYYYMMDD"),
          stockNo: stockCode,
        },
      })
      .then(function (response) {
        console.log(response.data);
      });
  }
});
