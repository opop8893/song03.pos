let order=[];
let total=0;


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


const price=130;



function addItem(name){


let item =
order.find(
x=>x.name===name
);



if(item){

item.qty++;

item.price=item.qty*price;


}else{


order.push({

name:name,

qty:1,

price:price

});


}


total+=price;


showOrder();

updateMenuCount();


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


total+=10;


showOrder();


}



function plusItem(index){


order[index].qty++;


order[index].price =
order[index].qty*price;


total+=price;


showOrder();

updateMenuCount();


}



function minusItem(index){


if(order[index].qty>1){


order[index].qty--;

order[index].price =
order[index].qty*price;


total-=price;


}else{


total-=order[index].price;

order.splice(index,1);


}


showOrder();

updateMenuCount();


}



function showOrder(){


let text="";


order.forEach((item,index)=>{


if(item.name==="加起司"){


text+=
"🧀 加起司 ×"+
item.qty+
" "+
item.price+
"元<br>";


}else{


text+=

(index+1)+". "+
item.name+
"<br>"+

"<button onclick='minusItem("+index+")'>➖</button>"+

" "+item.qty+" "+

"<button onclick='plusItem("+index+")'>➕</button>"+

"<br>"+

item.price+
"元<br><br>";

}


});



document.getElementById("orderList").innerHTML =
text || "目前沒有訂單";


document.getElementById("total").innerHTML =
"總金額："+total+"元";


}



function updateMenuCount(){


let menu=[

"蜀香麻辣",
"石頭火鍋",
"田園蕃茄",
"濃郁牛奶",
"烏溜溜黑蒜",
"酸菜魚"

];


menu.forEach(name=>{


let btn=document.getElementById("btn-"+name);


if(btn){


let item=
order.find(
x=>x.name===name
);



btn.innerHTML =
item ?
name+"（"+item.qty+"碗）":
name;


}


});


}




function finishOrder(){


if(order.length===0){

alert("目前沒有訂單");

return;

}



let number =
String(orderNumber).padStart(3,"0");



todayOrders++;

todaySales+=total;



let bowls=0;


order.forEach(item=>{


if(item.name!="加起司"){

bowls+=item.qty;

}


});


todayCount+=bowls;



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



createB21Label(
number,
order,
total
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

updateMenuCount();


}




function createB21Label(number,items,total){


let text="";


text+="🍲 宋爽爽花枝蝦滑湯\n\n";


text+=number+"號\n\n";


items.forEach(item=>{


text+=
item.name+
" × "+
item.qty+
"\n";


});


text+="\n總額："+total+"元\n\n";


text+="請製作";



document.getElementById("printLabel").innerText=text;


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


text+="<hr>"+o.number+"號<br>";


o.items.forEach(item=>{


text+=
item.name+
" × "+
item.qty+
" "+
item.price+
"元<br>";


});


text+="總額："+o.total+"元<br>";



});


document.getElementById("orderHistory").innerHTML =
text || "目前沒有訂單";


}




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




function resetOrderNumber(){


if(confirm("確定訂單號碼重新從001開始嗎？")){


orderNumber=1;


localStorage.setItem(
"orderNumber",
1
);


alert("訂單號碼已歸零，下一張001號");


}


}




showOrder();

showReport();

showHistory();

updateMenuCount();
