async function asyncF() {
  console.log(1);
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
      resolve();
    }, 0);
  });
  console.log(3);
}

console.log(4);
asyncF();
console.log(5);

// 印出順序 4 > 1 > > 5 > 2 > 3
// new Promise 是同步函式 但用await會被阻塞住
// 先執行 4 > 再執行asyncF() 中的 1 ，然後遇到await 被阻塞，再執行 5 > 2 >
