const axios = require("axios"); //引用axios
const moment = require("moment"); //引用moment套件
const fs = require("fs");
const mysql = require("mysql"); //連線到mysql
const { resolve } = require("path");
const { rejects } = require("assert");
require("dotenv").config();

//再一次用async await呼叫
async function getData() {
  try {
    // 函式一 先讀stock.txt
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

    let dbresult = await new Promise(function(resolve,rejects){
      // 連線後再用sql語法撈資料
      connection.query(
        `SELECT * FROM stock WHERE stock_id= ?`,
        [stockCode],
        function (error, results, fields) {
          if (error) {
          rejects(error);
          }
          resolve(results); //資料庫中的代碼資料 
        }
      )
    });
    console.log(results);

    // // 連線後再用sql語法撈資料
    // connection.query(
    //   `SELECT * FROM stock WHERE stock_id= ?`,
    //   [stockCode],
    //   function (error, results, fields) {
    //     if (error) throw error;
    //     // console.log(results); //資料庫中的代碼資料 
    //     if (results.length > 0) {
    //       new Promise(function (resolve, rejects) {
    //         //函式二 再用axios連到對方的json檔案
    //         async function twseData(stockCode) {
    //           let twse = await axios.get(
    //             "https://www.twse.com.tw/exchangeReport/STOCK_DAY",
    //             {
    //               //用return 再把then丟出去
    //               params: {
    //                 response: "json",
    //                 date: moment().format("YYYYMMDD"),
    //                 stockNo: stockCode,
    //               },
    //             }
    //           );
    //           return twse;
    //         }
    //         let result = twseData(stockCode);
    //         resolve(result.data);
    //         rejects("錯誤");
    //       });
    //     } else {
    //       console.log("資料不在範圍內");
    //     }
    //   }
    // );

    // 資料庫連線關閉
    connection.end();

    
  } catch (err) {
    console.log(err);
  }
}
getData();




// 讀 stock.txt 把股票代碼讀進來 OK
// 去資料庫的 stock 表格查看看，這個代碼是不是在我們的服務範圍內
// 如果是，才去證交所抓資料
// 抓回來的資料存到資料庫的 stock_price 表格裡去
// 先讀 stock.txt > 再用axios > 再console.log資料








