let car = require("./car1");

console.log(car.setOwner("lily"));
console.log(car.showBrand());
console.log(car.showColor());

// 不公開屬性 沒有export 無法使用 
// car.showOwner is not a function
// console.log(car.showOwner());
