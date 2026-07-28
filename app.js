let order = [];
let total = 0;

let orderNumber =
Number(localStorage.getItem("orderNumber")) || 1;


let todaySales =
Number(localStorage.getItem("todaySales")) || 0;


let todayOrders =
Number(localStorage.getItem("todayOrders")) || 0;


let todayCount =
Number(localStorage.getItem("todayCount")) || 0;


let orderHistory =
JSON.parse(localStorage.getItem("orderHistory")) || [];


const price = 130;


// 點餐
function addItem(name){

order.push({

name:name,
price:price

});


total += price;

showOrder();

}



// 加起司
function addCheese(){

if(order.length === 0){

alert("請先選擇商品");

return;

}


order.push({

name:"加起司",
price:10

});


total += 10;


showOrder();

}



// 顯示目前訂單
function showOrder(){

let text="";


order.forEach((item,index)=>{


text +=

(index+1)+". "+
item.name+
" "+
item.price+
"元<br>";


});


document.getElementById("orderList").innerHTML=text;


document.getElementById("total").innerHTML=

"總金額："+total+"元";


}



// 完成訂單
function finishOrder(){


if(order.length===0){

alert("目前沒有訂單");

return;

}



todayOrders++;

todaySales += total;


let bowls =
order.filter(item=>item.name!="加起司").length;


todayCount += bowls;



let saveOrder={


number:String(orderNumber).padStart(3,"0"),

items:order,

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

orderNumber+1

);



alert(

"完成訂單\n\n"+
"號碼："+String(orderNumber).padStart(3,"0")+
"\n金額："+total+"元"

);



orderNumber++;

order=[];

total=0;



showOrder();

showReport();

showHistory();


}



// 今日營業
function showReport(){


document.getElementById("report").innerHTML=


"訂單數："+todayOrders+"筆<br>"+
"總碗數："+todayCount+"碗<br>"+
"營業額："+todaySales+"元";


}



// 訂單明細
function showHistory(){


let text="";


if(orderHistory.length===0){


text="目前沒有訂單";


}else{


orderHistory.forEach(o=>{


text +=

"<hr>"+
o.number+"號<br>";



o.items.forEach(item=>{


text +=

item.name+
" "+
item.price+
"元<br>";


});



text +=

"總額："+o.total+"元<br>";


});


}



document.getElementById("orderHistory").innerHTML=text;


}



// 清除今日營業
function clearSales(){


if(confirm("確定清除今日營業資料嗎？")){


todaySales=0;

todayOrders=0;

todayCount=0;

orderHistory=[];



localStorage.removeItem("todaySales");

localStorage.removeItem("todayOrders");

localStorage.removeItem("todayCount");

localStorage.removeItem("orderHistory");



showReport();

showHistory();



alert("今日資料已清除");


}


}



// 開啟載入

showReport();

showHistory();
