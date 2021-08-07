// 請問下列程式碼印出的順序為何？

function syncF() {
  console.log(1);

  setTimeout(() => {
    console.log(2);
  }, 0);
  console.log(3);
}

console.log(4);
syncF();
console.log(5);

// 印出順序 4 > 1 > 3 > 5 > 2
// 因為先syncF()是被呼叫才會執行，所以照順序先執行 4 再執行 syncF()
// syncF() 中可以先執行 console.log() 1 跟 3 而setTimeout()是非同步函示
// 所以要在stack為空時，才會把queue中的結果印出來
