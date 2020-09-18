"use strict";

// Insertar el string "Hello World" dentro del elemento <p>
const text = "Hello world!";
const elementP = document.getElementById("myId");
elementP.innerHTML = text;

// Insertar el string "Hello World" dentro del primer elemento que tenga la clase test

const pArray = document.getElementsByClassName("test");
const firstP = pArray[0];
firstP.innerHTML = text;


// Agregar funcionalidad a los botones para modificar la tabla.
/*
    a. Cuando haga click en el botón “Insert row” se deberá agregar una fila al final de
        la tabla.

    b. Cuando haga click en el botón “Delete row” se deberá borrar la última fila
        agregada.

*/

const tbody = document.getElementsByTagName("tbody")[0];


function insertRow(){
    let tr = createRow();
    tbody.appendChild(tr);
}


function deleteRow(){
    const trs = [...document.getElementsByTagName("tr")];
    if (trs.length <= 1 ){
        alert("No rowws to remove");
    }else{
        const last = trs.pop();
        tbody.removeChild(last);  
    }
     
}


function createRow(){
    let  rowsNumber = getRowsInTable();

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");
    
    
    td.innerHTML = "Line: "
    td2.innerHTML = rowsNumber;
    
    
    tr.appendChild(td);
    tr.appendChild(td2);
    
    return tr;

}



function getRowsInTable(){
    let rows = document.getElementsByTagName("tr");
    return rows.length;
}