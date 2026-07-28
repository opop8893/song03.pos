let order = [];
let total = 0;


// 訂單編號
let orderNumber =
Number(localStorage.getItem("orderNumber")) || 1;


// 今日營業資料
let todaySales =
Number(localStorage.getItem("todaySales")) || 0;

let todayOrders =
Number(localStorage.getItem("todayOrders")) || 0;

let todayCount =
Number(localStorage.getItem("todayCount")) || 0;


// 訂單明細
let orderHistory =
JSON.parse(localStorage.getItem("orderHistory")) || [];


const price = 130;



// =================
// 點餐
// =================

function addItem(name){

order.push({

name:name,
price:price

});


total += price;

showOrder();

}



// =================
// 加起司
// =================

function addCheese(){

if(order.length === 0){

alert("請先選擇湯底");

return;

}


order.push({

name:"加起司",
price:10

});


total += 10;


showOrder();

}



// =================
// 顯示目前訂單
// =================

function showOrder(){

let text = "";


order.forEach((item,index)=>{


text +=

(index+1)+". "+
item.name+
" "+
item.price+
"元<br>";


});


document.getElementById("orderList").innerHTML =
text || "目前沒有訂單";


document.getElementById("total").innerHTML =
"總金額："+total+"元";


}



// =================
// 完成訂單
// =================

function finishOrder(){


if(order.length === 0){

alert("目前沒有訂單");

return;

}



let number =
String(orderNumber).padStart(3,"0");


// 計算營業

todayOrders++;

todaySales += total;


let bowls =
order.filter(item=>item.name !== "加起司").length;


todayCount += bowls;



// 保存訂單

let saveOrder = {

number:number,

items:[...order],

total:total

};



orderHistory.push(saveOrder);



localStorage.setItem(
"orderHistory",
JSON.stringify(orderHistory)
);



localStorage.setItem(
"todaySales",
todaySales
);


localStorage.setItem(
"todayOrders",
todayOrders
);


localStorage.setItem(
"todayCount",
todayCount
);



localStorage.setItem(
"orderNumber",
orderNumber + 1
);



alert(

"完成訂單\n\n"+
"號碼："+number+
"\n金額："+total+"元"

);



orderNumber++;


order=[];

total=0;



showOrder();

showReport();

showHistory();


}



// =================
// 今日營業
// =================

function showReport(){


document.getElementById("report").innerHTML =

"訂單數："+todayOrders+"筆<br>"+
"總碗數："+todayCount+"碗<br>"+
"營業額："+todaySales+"元";


}



// =================
// 訂單明細
// =================

function showHistory(){


let text="";


if(orderHistory.length === 0){

text="目前沒有訂單";


}else{


orderHistory.forEach(order=>{


text +=

"<hr>"+
order.number+
"號<br>";


order.items.forEach(item=>{


text +=

item.name+
" "+
item.price+
"元<br>";


});


text +=

"總額："+order.total+"元<br>";


});


}


document.getElementById("orderHistory").innerHTML =
text;


}



// =================
// 清除今日營業
// =================

function clearSales(){


if(confirm("確定清除今日營業資料嗎？")){


todaySales = 0;

todayOrders = 0;

todayCount = 0;

orderHistory = [];



localStorage.removeItem("todaySales");

localStorage.removeItem("todayOrders");

localStorage.removeItem("todayCount");

localStorage.removeItem("orderHistory");



showReport();

showHistory();



alert("今日資料已清除");


}


}



// =================
// 啟動載入
// =================

showOrder();

showReport();

showHistory();
