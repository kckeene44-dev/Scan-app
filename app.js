let inventory = JSON.parse(localStorage.getItem("inventory") || "[]");
let cart = [];

function startScanner(){
document.getElementById("scanner").innerHTML = "<div id='reader'></div>";
const scanner = new Html5Qrcode("reader");
scanner.start({facingMode:"environment"},{fps:10,qrbox:250},
barcode=>{
scanner.stop();
lookupProduct(barcode);
});
}

function lookupProduct(barcode){
let item = inventory.find(i=>i.barcode===barcode);

if(!item){
let name = prompt("Product name");
let sell = parseFloat(prompt("Sell price"));
let buy = parseFloat(prompt("Buy price"));

item={
barcode:barcode,
name:name,
sell:sell,
buy:buy,
qty:1
};

inventory.push(item);
saveInventory();
}

cart.push(item);
alert(item.name+" added to cart");
}

function showInventory(){
let html="<div class='card'><h3>Inventory</h3>";
inventory.forEach(i=>{
html += i.name+" | $"+i.sell+" | Qty:"+i.qty+"<br><br>";
});
html+=</div>";
document.getElementById("content").innerHTML=html;
}

function showCart(){
let total=0;
let html="<div class='card'><h3>Cart</h3>";

cart.forEach(i=>{
html += i.name+" $"+i.sell+"<br>";
total += i.sell;
});

html+="<h3>Total $"+total+"</h3>";
html+="<button onclick='createInvoice()'>Generate Invoice</button>";
html+=</div>";

document.getElementById("content").innerHTML=html;
}

function createInvoice(){
let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
let total=0;

cart.forEach(i=> total+=i.sell);

let invoice={
date:new Date().toLocaleDateString(),
items:cart,
total:total
};

invoices.push(invoice);
localStorage.setItem("invoices",JSON.stringify(invoices));

cart=[];
alert("Invoice saved");
}

function showInvoices(){
let invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
let html="<div class='card'><h3>Invoices</h3>";

invoices.forEach(i=>{
html += "Date:"+i.date+" Total:$"+i.total+"<br><br>";
});
html+=</div>";
document.getElementById("content").innerHTML=html;
}

function saveInventory(){
localStorage.setItem("inventory",JSON.stringify(inventory));
}