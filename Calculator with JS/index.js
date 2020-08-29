"use strict";
console.log("Hello world!");

const input = document.getElementById("out");
const htmlcolection = document.getElementsByTagName("button");
const arrayButtons = Array.from(htmlcolection);

arrayButtons.forEach(element => {
    element.addEventListener("click", calculate, false);
});

function calculate(button){
    
    console.log(button.toElement);

    switch(button.toElement.value){
        case "AC":
            reset();
        break;
        case "=":
            evaluate()
        break;
        default:
            console.log("Valor Otros");
            concat(button.toElement.value);
        break;

    }


}

function evaluate (){
    const string = input.value;
    let val;
    try {
        val = eval(string);
    } catch (error) {
        val = "Error";
    }

    console.log(val);
    input.value = val;

    
}

function reset(){
    input.value = 0;
}

function asignate (val) {
    
    input.value = val;
}

function concat (val) {
    
    input.value += val;
}

function isNum (value){
    return ;
}






function add (number1, number2){
    return Number(number1) + Number(number2); 
}


function subtract (number1, number2){
    return Number(number1) - Number(number2); 
}

function multiply (number1, number2){
    return Number(number1) * Number(number2); 
}


function divide (number1, number2){
    return Number(number1) / Number(number2); 
}



