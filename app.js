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
