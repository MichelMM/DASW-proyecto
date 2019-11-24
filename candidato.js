
document.addEventListener("DOMContentLoaded", function () {
    let operador = JSON.parse(localStorage.getItem("operador"));
    document.getElementById("name").after(operador.name + " " + operador.lastname);
    document.getElementById("work").after(operador.available);
    document.getElementById("state").after(operador.state);
    document.getElementById("city").after(operador.city);
    document.getElementById("desc").after(operador.description);
    let array = []
    for (let i = 0; i < operador.previousJobs.length; i++) {
        array.push(operador.previousJobs[i].company);
    }
    document.getElementById("company").after(array.join(", "));
    document.getElementById("time").after(operador.yearsExperience + " años");
    document.getElementById("licence").setAttribute("href", operador.licensePDF);
    for (let key in operador.machinesOperated) {
        console.log(operador.machinesOperated[key]);
        machineRequest(operador.machinesOperated[key], () => {
            let machine = JSON.parse(localStorage.getItem("maquina"));
            let HTMLmachine = document.createElement("li");
            HTMLmachine.setAttribute("class","list-group-item");
            let black = document.createElement("b");
            black.textContent = machine[0].type + ": ";
            HTMLmachine.appendChild(black);
            HTMLmachine.insertAdjacentText("beforeEnd",machine[0].description);
            console.log(machine)
            document.getElementById("machine").appendChild(HTMLmachine);
        }, () => {
            alert("Fail in request");
        });
    }

});

document.getElementById("company").parentElement.lastChild.nodeValue.slice(0,-1);

function machineRequest(object, cbOk, cbErr) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/Maquinaria?id=${object.id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(object)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar el usuario');
            cbErr();
        } else {
            localStorage.setItem("maquina", xhr.responseText);
            cbOk();
        }
    };
}