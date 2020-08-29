"use strict";

function validate(){
    validateFistAndLastName();
    validateAge();
    validatePassword();
    validateEmail();

    console.log("End Validations");
}

/*First and Last name validations */
function validateFistAndLastName(){
    const inputFname = document.getElementById("firstName");
    const inputLname = document.getElementById("lastName");
    const fname = inputFname.value;
    const lname = inputLname.value;
    let validFirstName =  true && !isEmpty(fname) && fname.length <= 20 && !strHasSpecialChars(fname) ;
    let validLastName = true && !isEmpty(lname) && lname.length <= 20 && !strHasSpecialChars(lname) ;


    let passValidations = validFirstName && validLastName;

    if (!passValidations){
       alert("First name and last name must contain up to 20 characters, can't be empty nor have special characters");
        if (!validLastName){
            changeInputClass(inputLname, false);
            
        } else {
            changeInputClass(inputLname, true);
        }
        if (!validFirstName){
            changeInputClass(inputFname, false);
           
        }else {
            changeInputClass(inputFname, true);
        }
       
        
       
    }else {
        
        changeInputClass(inputFname, true);
        changeInputClass(inputLname, true);
    }





}

function isEmpty(value){
    return value === "" || value == undefined || value == null || false;
}



function strHasSpecialChars(string){
    const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

    for(let i = 0; i < specialChars.length;i++){
        if(string.indexOf(specialChars[i]) > -1){
            return true;
        }
    }
    return false;

}
/* Age validations */
function validateAge(){
    const inputAge =  document.getElementById("age");
    const age = inputAge.value;
    if(age !== "" && !Number.isInteger(Number(age))){
        alert("Age must be an integer");
        changeInputClass(inputAge, false);
       
    }else{
        changeInputClass(inputAge, true);
    }
}


/* Password validations */


function validatePassword(){
    const inputPwd = document.getElementById("password");
    const pwd = inputPwd.value;
       
    let passValidaitons = true && !isEmpty(pwd) && (pwd.length >=9 && pwd.length <= 20) && ( /[a-z]/.test(pwd) && /[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) ;

    if (!passValidaitons){
        alert("Password must be 9-20 character long, must contain at least 1 capital leter and one lowercase letter and one number ");
        changeInputClass(inputPwd, false);
    }else {
        changeInputClass(inputPwd, true);
    }
}

/* Email password */


function validateEmail(){
    const inputmail = document.getElementById("email");
    const email = inputmail.value;

    let passValidaitons = true && !isEmpty(email) && emailHasRightFormat(email);
    if (!passValidaitons){
        alert("Email can't be empty and must have format:  name@domain.com");
        changeInputClass(inputmail, false);
        
    }else{
        changeInputClass(inputmail, true);
    }
}

function emailHasRightFormat(email){
    
        const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i
        return expression.test(String(email).toLowerCase());
}


function changeInputClass(input, isValid){
    const classNames = (isValid) ? "is-valid" : "is-invalid";
    const classNamesToRemove = (isValid) ? "is-invalid" : "is-valid";
    input.classList.remove(classNamesToRemove);
    input.classList.add(classNames);
}