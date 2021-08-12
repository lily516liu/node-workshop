// promise 版本
const axios = require("axios");
const moment = require("moment");
const fs = require("fs");
const mysql = require("mysql"); //連線到mysql
require("dotenv").config();

// 連線到mysql
const connection = mysql.createConnection({
    host: process.env.DB_host,
    user: process.env.DB_user,
    port: process.env.DB_port,
    password: process.env.DB_password,
    database: process.env.DB_database,
});

connection.connect((err) => {
    if (err) {
      console.error("資料庫連不上");
    }
});

// 1.讀stock
function readStock(){
    return new Promise((resolve, reject) => {
        fs.readFile("stock.txt", "utf8", (err, stockCode) => {
          if (err) {
            reject(err);
          } else {
            // trim 移除前後的空白字元，包括換行
            resolve(stockCode.trim());
          }
        });
    });
}

// 2.檢查資料庫有沒有stockCode
function checkCode(stockCode){
    return new Promise(function(resolve,rejects){
       connection.query(
        `SELECT * FROM stock WHERE stock_id= ?`,
        [stockCode],
        function (error, results, fields) {
          if (error) {
          rejects(error);
          }
          resolve(results); //資料庫中的代碼資料 
        }
      );
    })
}

// 3.讀證交所資料
function twseData(stockCode) {
  return axios.get("https://www.twse.com.tw/exchangeReport/STOCK_DAY", {
    params: {
      response: "json",
      date: moment().format("YYYYMMDD"),
      stockNo: stockCode, // 長榮航空 2618  長榮航海王 2603
    },
  });
}

function insertDataPromise(parseData) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT IGNORE INTO stock_price (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES ?",
      [parseData],
      function (error, results, fields) {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}

async function doWork() {
  try {
    // 1.讀 stock.txt 把股票代碼讀進來
    let stockCode = await readStock();

    // 2.去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
    let dbResult = await checkCode(stockCode);
    if (dbResult.length === 0) {
      console.log("股票不在服務範圍內");
      return;
    }
    console.log("在資料庫有查到資料");

    // 3.如果是，才去證交所抓資料
    let response = await twseData(stockCode);

    // 4.抓回來的資料存到資料庫的 stock_price 表格裡去
    const twseResultData = response.data;
    if (twseResultData.stat !== "OK") {
      throw "從證交所查到的資料有問題";
    }
    // '日期',     '成交股數',
    // '成交金額', '開盤價',
    // '最高價',   '最低價',
    // '收盤價',   '漲跌價差',
    // '成交筆數'
    // 用.map()把陣列資料區隔開
    let parseData = twseResultData.data.map((item) => {
      // console.log(item);
      //日期
      //千位符
      //+- paresInt
      let newitem = item.map((value) => {
        // .replace() ""取代","
        return value.replace(/,/g, "");
      });
      newitem[0] = parseInt(newitem[0].replace(/\//g, ""), 10) + 19110000;
      newitem.unshift(stockCode);
      console.log(newitem);
      return newitem;
    });
    console.log(parseData);

    let insertResult = await insertDataPromise(parseData);
    console.log(insertResult);
  } catch (e) {
    console.error(e);
  } finally {
    connection.end();
  }
}
doWork();

