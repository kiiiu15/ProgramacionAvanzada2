console.log("Hello world!");
const API_URL = "https://utn-avanzanda2-tp5.herokuapp.com";
const tbody = document.querySelector('#myTbody');
const tableHead = [
    "userId",
    "firstName",
    "lastName",
    "email",
    "gender",
    "lastConnectedAddress"
];
tbody.innerHTML = "";

function prepareRequest(url) {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = "json";
    return req;
}

function retrieveData(url = API_URL + "/api/User") {
    return new Promise((resolve, reject) => {

        const req = prepareRequest(url);

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

        req.send();
    });
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
        td.innerHTML = element[element2];
        tr.appendChild(td);
    });

    return tr;

}

function refreshTable() {
    retrieveData()
        .then(treatment)
        .catch(error => console.log(error));
}


refreshTable();