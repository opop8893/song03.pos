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



function addItem(name){


let exist = order.find(
item => item.name === name
);


if(exist){

exist.qty++;

exist.price = exist.qty * price;


}else{


order.push({

name:name,

qty:1,

price:price

});


}


total += price;


showOrder();


}





function addCheese(){


if(order.length===0){

alert("請先選擇湯底");

return;

}


order.push({

name:"加起司",

qty:1,

price:10

});


total +=10;


showOrder();


}




function showOrder(){


let text="";


order.forEach((item,index)=>{


text +=

(index+1)+". "+
item.name+
" × "+
item.qty+
" = "+
item.price+
"元<br>";



});



document.getElementById("orderList").innerHTML =
text || "目前沒有訂單";


document.getElementById("total").innerHTML =
"總金額："+total+"元";


}




function finishOrder(){


if(order.length===0){

alert("目前沒有訂單");

return;

}



let number =
String(orderNumber).padStart(3,"0");



todayOrders++;

todaySales += total;



let bowls=0;


order.forEach(item=>{

if(item.name!="加起司"){

bowls += item.qty;

}

});


todayCount += bowls;



let saveOrder={

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
orderNumber+1
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




function showReport(){


document.getElementById("report").innerHTML=


"訂單數："+todayOrders+"筆<br>"+
"總碗數："+todayCount+"碗<br>"+
"營業額："+todaySales+"元";


}




function showHistory(){


let text="";


orderHistory.forEach(o=>{


text +=

"<hr>"+
o.number+
"號<br>";


o.items.forEach(item=>{


text +=

item.name+
" × "+
item.qty+
" "+
item.price+
"元<br>";

});


text +=
"總額："+o.total+"元<br>";

});


document.getElementById("orderHistory").innerHTML =
text || "目前沒有訂單";


}




function clearSales(){


if(confirm("確定清除今日資料嗎？")){


todaySales=0;

todayOrders=0;

todayCount=0;

orderHistory=[];


localStorage.clear();


showReport();

showHistory();


alert("已清除");


}

}



showOrder();

showReport();

showHistory();
