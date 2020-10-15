console.log("Hello World!");



//console.log("Hello world!");


window.onload = RefeshTable;

const API_URL = "https://utn-avanzada2-tp6.herokuapp.com";

const tbody = document.querySelector('#myTbody');
const tableHead = ["employeeId", "firstName", "lastName", "email", "companyName"];
const buttonIcon = `<svg width="1em" height="1em" viewBox="0 0 16 16"
class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path
    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
<path fill-rule="evenodd"
    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
</svg>`;

const jsonAtributes = ["firstName", "lastName", "email", "companyId"];
/*
{
    "employeeId": 0,
    "companyId": 1,
    "firstName": "Prueba",
    "lastName": "prueba",
    "email": "et@gmail.com"
}
*/


/*{

"employeeId":0,
"firstName":"Felipe",
"lastName":"Escribas",
"email":"admin@admin.com",
"companyId":"1"

} */
const btnAdd = document.getElementById("addBtn");
btnAdd.addEventListener("click", AddEmployee, false);


class Employee {
    constructor({ employeeId, firstName, lastName, email }, companyName) {
        this.employeeId = employeeId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.companyName = companyName;
    }


}







function prepareRequest(url, method = "GET") {
    const req = new XMLHttpRequest();
    req.open(method, url);
    req.responseType = "json";
    req.setRequestHeader("Content-Type", "application/json");
   // req.setRequestHeader("Access-Control-Allow-Credentials",  "*");
    return req;
}

function MakeRequest(url = API_URL + "/api/Employee", method = "GET", data = "") {
    return new Promise((resolve, reject) => {

        const req = prepareRequest(url, method);

        req.onload = function () {
            if (req.status >= 200 && req.status < 300) {
                resolve(req.response)
            } else {
                reject(Error("Failed retriving data! " + req.statusText));
            }
        }

        req.onerror = function () {
            reject(Error("Request couldn't be made!"));
        }

        if (data) {
            req.send(data);
        } else {
            req.send();
        }

    });
}


function getEmployees() {
    return MakeRequest(API_URL + "/api/Employee", "GET");
}

function getCompanies() {
    return MakeRequest(API_URL + "/api/Company", "GET");
}



function mergeData(employees, companies) {
    const mergedData = new Array();
    employees.forEach(employee => {
        const company = companies.find(company => company.companyId == employee.companyId);
        const epl = new Employee(employee, company.name);
        mergedData.push(epl);
    });

    return mergedData;
}

function addCompaniesToForm(companies) {
    const select = document.getElementById("companyId");
    select.innerHTML = "";
    companies.forEach(company => {
        let option = document.createElement("option");
        option.innerText = company.name;
        option.value = company.companyId;
        select.appendChild(option);
    });

}
async function RefeshTable() {
    tbody.innerHTML = "";
    try {

        const companyList = await getCompanies();
        const employeeList = await getEmployees();

        addCompaniesToForm(companyList);
        const data = mergeData(employeeList, companyList);

        treatment(data);
    } catch (error) {
        console.log("Error retriving data", error);
    }

}


function treatment(data) {


    data.forEach(element => {
        let row = createLine(element);
        tbody.appendChild(row);
    });
}

function createLine(element) {
    let tr = document.createElement("tr");

    tableHead.forEach(element2 => {
        let td = document.createElement("td");
        td.scope = "row";
        td.innerHTML = element[element2];
        tr.appendChild(td);
    });

    let button = createButton(element.employeeId);
    let td = document.createElement("td");
    td.appendChild(button);
    tr.appendChild(td);

    return tr;

}

function createButton(id) {
    let button = document.createElement("button");
    button.innerHTML = buttonIcon;
    button.classList = "btn btn-danger";

    button.addEventListener("click", DeleteEmployee, false);

    button.value = id;
    return button;
}


function DeleteEmployee(event) {

    let id = event.srcElement.value;
    let url = API_URL + "/api/Employee/" + id;
    MakeRequest(url, "DELETE")
        .then(RefeshTable)
        .catch(console.log);
}

function AddEmployee(event) {
    event.preventDefault();
    const data = captureData();
    console.log(data);
    MakeRequest(API_URL + "/api/Employee", "POST", data)
        .then(RefeshTable)
        .catch(console.log);
}

function captureData() {
    const json = { employeeId: 0 };
    jsonAtributes.forEach(artibute => {
        json[artibute] = document.getElementById(artibute).value;
    });

    //let rta = JSON.stringify(json);
    let rta = json;
    return rta;
}


