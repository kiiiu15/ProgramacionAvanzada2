//console.log("Hello world!");


window.onload = paginate;

const API_URL = "https://utn-avanzanda2-tp5.herokuapp.com";

const tbody = document.querySelector('#myTbody');
const tableHead = ["userId", "firstName", "lastName", "email", "gender", "lastConnectedAddress"];
const paginationButtonClasses = ["btn", "btn-dark"];
const selectPageSize = document.getElementById("pageSize");


selectPageSize.addEventListener("change", paginate, false);



function prepareRequest(url) {
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = "json";
    return req;
}

function MakeRequest(url = API_URL + "/api/User/1/10") {
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
    tbody.innerHTML = "";
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




async function paginate() {
    const pageCant = document.getElementById("pageSize").value;
    try {
        const total = await getTotal();
        const pageCount = Math.ceil(total / pageCant);
        createPaginationButtons(pageCount);
        loadPage(0);

    } catch (error) {
        console.log(error);
    }


}


function getTotal() {

    return MakeRequest(API_URL + "/api/user/total");

}

function createPaginationButtons(cant) {

    const div = document.getElementById("pgBtns");
    div.innerHTML = "";
    for (let i = 0; i < cant; i++) {
        const button = document.createElement("button");
        button.classList = paginationButtonClasses.join(" ");
        button.value = i ;
        button.innerText = i + 1;
        button.addEventListener("click", showPage, false);
        div.appendChild(button);

    }
}

function showPage (event){
    const page = event.srcElement.value;
    loadPage(page);
}

function loadPage(page) {
   
    const pageCant = +document.getElementById("pageSize").value;
    const start = 1 + (pageCant * page);
    const limit = start + pageCant-1;
    const url = `/api/User/${start}/${limit}`;
   
    MakeRequest(API_URL+url)
    .then(treatment)
    .catch(console.log);

}


