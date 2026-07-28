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

let salesRank =
JSON.parse(localStorage.getItem("salesRank")) || {};


const price = 130;


function addItem(name){

order.push({
name:name,
price:price
});

total += price;

showOrder();

}



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



function showOrder(){

let text="";

order.forEach((item,index)=>{

text +=
(index+1)+". "+
item.name+
" "+item.price+
"元<br>";

});


document.getElementById("orderList").innerHTML=text;


document.getElementById("total").innerHTML=
"總金額："+total+"元";

}



function finishOrder(){

if(order.length===0){
alert("目前沒有訂單");
return;
}


todayOrders++;

todaySales += total;


// 計算碗數（扣除加購）
let bowls =
order.filter(item=>item.name!="加起司").length;

todayCount += bowls;
let saveOrder = {

number:String(orderNumber).padStart(3,"0"),

items:order,

total:total

};


orderHistory.push(saveOrder);


localStorage.setItem(
"orderHistory",
JSON.stringify(orderHistory)
);


order.forEach(item=>{

if(item.name!="加起司"){

salesRank[item.name] =
(salesRank[item.name] || 0)+1;

}

});


localStorage.setItem(
"salesRank",
JSON.stringify(salesRank)
);

localStorage.setItem(
"orderNumber",
orderNumber+1
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


alert(
"完成訂單\n\n"+
"訂單號碼："+String(orderNumber).padStart(3,"0")+
"\n金額："+total+"元"
);


orderNumber++;

order=[];
total=0;

showOrder();

showReport();

}



function showReport(){

document.getElementById("report").innerHTML=

"訂單數："+todayOrders+"筆<br>"+
"總碗數："+todayCount+"碗<br>"+
"營業額："+todaySales+"元";

}


showReport();
function clearSales(){

if(confirm("確定清除今日營業資料嗎？")){

localStorage.removeItem("todaySales");
localStorage.removeItem("todayOrders");
localStorage.removeItem("todayCount");


todaySales = 0;
todayOrders = 0;
todayCount = 0;


showReport();


alert("今日營業資料已清除");

}

}
function showReport(){

document.getElementById("report").innerHTML =

"訂單數：" + todayOrders + "筆<br>" +
"總碗數：" + todayCount + "碗<br>" +
"營業額：" + todaySales + "元";

}showReport();
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



function showRanking(){

let text="";


let rank = Object.entries(salesRank)
.sort((a,b)=>b[1]-a[1]);


if(rank.length===0){

text="目前沒有資料";

}else{


rank.forEach((item,index)=>{

text +=
(index+1)+". "+
item[0]+
" "+
item[1]+
"碗<br>";

});

}


document.getElementById("ranking").innerHTML=text;

}


showHistory();

showRanking();
