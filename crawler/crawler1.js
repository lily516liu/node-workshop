const axios = require("axios"); //引用axios
const moment = require("moment"); //引用moment套件
// moment().format("YYYYMMDD") moment用法

// axios文件用法
axios
  .get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: 2330,
    },
  })
  .then(function (response) {
    console.log(response.data);
  });
