import React from 'react';

function Stock(props) {
  const {data, setData} = props;
  console.log(data);

    return (
        <div>
            <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">stock_id</th>
            <th scope="col">date</th>
            <th scope="col">high_price</th>
            <th scope="col">low_price</th>
            <th scope="col">transactions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item)=>(
            <tr>
              <th scope="row">{item.stock_id}</th>
              <td>{item.date}</td>
              <td>{item.high_price}</td>
              <td>{item.low_price}</td>
              <td>{item.transactions}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default Stock
