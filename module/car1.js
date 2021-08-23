let brand = "Audi";
let color = "red" ;
let owner = "";

// (隱形的底層設定 無法改) exports = module.exports = {};
// 看到模組會設定空物件 module.exports = {};

function setOwner(name){
    return owner =  name;
}
function showBrand(){
    return brand;
}
function showColor(){
    return color;
}
function showOwner(){
    return owner;
}


// exports.showBrand = showBrand;
// exports.showColor = showColor;
// exports.showOwner = showOwner;
// // exports = 又創建一個新物件！ 不等於 module.exports！ 
// exports = {
//     showBrand,
//     showColor,
//     showOwner
// }


//因為最後是回傳module.exports 所以如果要改要用module.exports =
module.exports = {
    setOwner,
    showBrand,
    showColor
}

// (隱形的底層設定 無法改) return module.exports;
// 雖然前面改到 exports 但最後回傳是 module.exports; 所以會變成空物件