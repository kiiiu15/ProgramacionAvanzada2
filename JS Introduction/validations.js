"use strict";

const NAME_REGEX = /^[a-zA-Z]{1,20}$/
const AGE_REGEX = /^\d{0,2}$/
const EMAIL_REGEX = /^.*(@outlook\.com|@icloud\.com|@gmail\.com)$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{9,20}$/

function validate() {
    validateFistAndLastName();
    validateAge();
    validatePassword();
    validateEmail();

    console.log("End Validations");
}

/*First and Last name validations */

function validateFistAndLastName() {
    const inputFname = document.getElementById("firstName");
    const inputLname = document.getElementById("lastName");
    const fname = inputFname.value;
    const lname = inputLname.value;
    let validFirstName = NAME_REGEX.test(fname);
    let validLastName = NAME_REGEX.test(lname);


    let passValidations = validFirstName && validLastName;

    if (!passValidations) {
        alert("First name and last name must contain up to 20 characters, can't be empty nor have special characters");
        if (!validLastName) {
            changeInputClass(inputLname, false);

        } else {
            changeInputClass(inputLname, true);
        }
        if (!validFirstName) {
            changeInputClass(inputFname, false);

        } else {
            changeInputClass(inputFname, true);
        }



    } else {

        changeInputClass(inputFname, true);
        changeInputClass(inputLname, true);
    }

}





function strHasSpecialChars(string) {
    const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

    for (let i = 0; i < specialChars.length; i++) {
        if (string.indexOf(specialChars[i]) > -1) {
            return true;
        }
    }
    return false;

}
/* Age validations */
function validateAge() {
    const inputAge = document.getElementById("age");
    const age = inputAge.value;
    if (!AGE_REGEX.test(age)) {
        alert("Age must be an integer");
        changeInputClass(inputAge, false);

    } else {
        changeInputClass(inputAge, true);
    }
}


/* Password validations */

function validatePassword() {
    const inputPwd = document.getElementById("password");
    const pwd = inputPwd.value;

    let passValidaitons = PWD_REGEX.test(pwd);

    if (!passValidaitons) {
        alert("Password must be 9-20 character long, must contain at least 1 capital leter and one lowercase letter and one number ");
        changeInputClass(inputPwd, false);
    } else {
        changeInputClass(inputPwd, true);
    }
}


/* Email password */

function validateEmail() {
    const inputmail = document.getElementById("email");
    const email = inputmail.value;

    let passValidaitons = EMAIL_REGEX.test(email);
    if (!passValidaitons) {
        alert("Email can't be empty and must have format:  name@domain.com, only, outlook, gmail and icloud ");
        changeInputClass(inputmail, false);

    } else {
        changeInputClass(inputmail, true);
    }
}

function changeInputClass(input, isValid) {
    const classNames = (isValid) ? "is-valid" : "is-invalid";
    const classNamesToRemove = (isValid) ? "is-invalid" : "is-valid";
    input.classList.remove(classNamesToRemove);
    input.classList.add(classNames);
}