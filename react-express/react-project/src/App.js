import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Stock from './components/Stock';

function App() {
  // 各股票代碼得資料狀態
  const [data2330, setData2330] = useState([]);
  const [data2603, setData2603] = useState([]);
  // 這是結果顯示的狀態
  const [data, setData] = useState([]);
  const stock = [2330,2603];

  // axios 抓資料
  useEffect(() => {
    axios.get("http://localhost:3001/stock/2330").then((result) => {
      setData2330(result.data);
    });
    axios.get("http://localhost:3001/stock/2603").then((result) => {
      setData2603(result.data);
    });
  }, []);
  

  return (
    <Router>
      <>
        <h1>股票資料表格</h1>
        <Link to="/2330">台積電 {stock[0]}</Link>
        <br></br>
        <Link to="/2603">長榮 {stock[1]}</Link>

        <Switch>
          <Route path="/2330">
            <Stock data={data2330} />
          </Route>
          <Route path="/2603">
            <Stock data={data2603}  />
          </Route>
        </Switch>
      </>
    </Router>
  );
}

export default App;
