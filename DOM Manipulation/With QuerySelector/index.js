"use strict";

// Insertar el string "Hello World" dentro del elemento <p>
const text = "Hello world!";
const elementP = document.querySelector("#myId");
elementP.innerHTML = text;

// Insertar el string "Hello World" dentro del primer elemento que tenga la clase test


const firstP = document.querySelector(".test");
firstP.innerHTML = text;


// Agregar funcionalidad a los botones para modificar la tabla.
/*
    a. Cuando haga click en el botón “Insert row” se deberá agregar una fila al final de
        la tabla.

    b. Cuando haga click en el botón “Delete row” se deberá borrar la última fila
        agregada.

*/

const tbody = document.querySelector("tbody");


function insertRow() {
    let tr = createRow();
    tbody.appendChild(tr);
}


function deleteRow() {
    const trs = [...document.querySelectorAll("tr")];
    if (trs.length <= 1) {
        alert("No rowws to remove");
    } else {
        const last = trs.pop();
        tbody.removeChild(last);
    }

}


function createRow() {
    let rowsNumber = getRowsInTable();

    let tr = document.createElement("tr");
    let td = document.createElement("td");
    let td2 = document.createElement("td");


    td.innerHTML = "Line: "
    td2.innerHTML = rowsNumber;


    tr.appendChild(td);
    tr.appendChild(td2);

    return tr;

}



function getRowsInTable() {
    let rows = document.querySelectorAll("tr");
    return rows.length;
}


/*
Deberá resaltar (agregar CSS) todos los elementos span que contengan la clase
myClass cuando se haga click en el botón “Highlight words”.
 */


function highlight() {
    const spans = [...document.querySelectorAll(".myClass")];
    spans.forEach(element => {
        element.classList.add("highligth");
    });

}