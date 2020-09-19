console.log("Hello world!");
const API_URL = "https://utn-avanzanda2-tp5.herokuapp.com";
retrieveData()
.then(data => {
    console.log(JSON.stringify(data, null, 2));
})
.catch(error => {
    console.log(error);
});




function retrieveData(url = API_URL+"/api/User") {
    return new Promise((resolve, reject) => {
        
        const req = prepareRequest(url);

        req.onload = function () {
            if (req.status == 200) {
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

function prepareRequest(url){
    const req = new XMLHttpRequest();
    req.open("GET", url);
    req.responseType = "json";
    return req;
}

