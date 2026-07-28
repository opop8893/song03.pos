let order = [];
let total = 0;


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


alert(
"訂單完成\n\n"+
"金額："+total+"元"
);


order=[];
total=0;

showOrder();

}
