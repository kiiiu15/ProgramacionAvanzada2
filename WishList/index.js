"use strict";
console.log("Hello World!");
const productList = [
    {
        "name": "Light",
        "price": 150
    },
    {
        "name": "Desk",
        "price": 500
    }
];

let wishlist = new Set();
const htmlProductList = document.getElementById("products");
const htmlWishList = document.getElementById("wishlist");

window.onload = () => {
    htmlProductList.innerHTML = "";
    productList.forEach(element => {
        createLine(element);
    });
};


function createLine(element) {

    let li = document.createElement("li");
    let txtNode = document.createTextNode(`${element.name} (${element.price})` + "  ");
    let btnAdd = document.createElement("button");

    btnAdd.innerText = "+";
    btnAdd.value = element.name;
    btnAdd.addEventListener("click", addToWishList, false);
    console.log(btnAdd);

    li.appendChild(txtNode);
    li.appendChild(btnAdd);
    

    htmlProductList.appendChild(li);

}

function addToWishList(name){
    console.log(name.srcElement.value);
}







