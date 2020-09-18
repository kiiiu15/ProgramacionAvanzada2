"use strict";

// Insertar el string "Hello World" dentro del elemento <p>
const text = "Hello world!";
const elementP = document.getElementById("myId");
elementP.innerHTML = text;

// Insertar el string "Hello World" dentro del primer elemento que tenga la clase test

const pArray = document.getElementsByClassName("test");
const firstP = pArray[0];
firstP.innerHTML = text;


