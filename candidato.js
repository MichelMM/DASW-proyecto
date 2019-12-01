// let temp =   {
//     "id": 3345631034,
//     "name": "Roberto",
//     "lastname": "Zepeda Gonzalez",
//     "licensePDF": "https://www.oaklandcityid.com/uploads/4/2/1/9/4219226/new-oaklandid-site-mock-up_orig.png",
//     "officialID": "https://laopinionla.files.wordpress.com/2018/07/federal-non-compliant-large.jpg?quality=80&strip=all&w=940",
//     "city": "Guadalajara",
//     "state": "Jalisco",
//     "cellphone": "3345631034",
//     "noCRB": "https://www.evictionrecords.com/images/state-criminal-records/id-idaho-tenant-records.jpg",
//     "operatorIMG": "https://randomuser.me/api/portraits/men/21.jpg",
//     "previousJob1": {
//       "company": "Intel",
//       "referenceContact": {
//         "name": "Federico",
//         "cellphone": "3344610335"
//       }
//     },
//     "previousJob2": {
//       "company": "Intel",
//       "referenceContact": {
//         "name": "Federico",
//         "cellphone": "3344610335"
//       }
//     },
//     "previousJob3": {
//       "company": "Intel",
//       "referenceContact": {
//         "name": "Federic",
//         "cellphone": "3344610335"
//       }
//     },
//     "machinesOperated": [1,2],
//     "yearsExperience": "4",
//     "recomendationCard": "https://www.letterwritingservice.net/wp-content/uploads/2018/06/reference-letter-for-green-card-eb2-example.png",
//     "type": "operador",
//     "RFC": "lvndwoncuqiodcnilqbevonqwnvoqndiovn",
//     "available": "Por hora",
//     "description":"soy honesto"
//     }
//   localStorage.setItem("operador",JSON.stringify(temp));

let OPinfo = JSON.parse(localStorage.operador);
let CONinfo = JSON.parse(localStorage.usuario);

let datosInsertar = document.getElementById("formContratacion");
let nombreOperador = document.getElementById("opName");
let estadoOperador = document.getElementById("opState");
let ciudadOperador = document.getElementById("opCity");
let nombreContratista = document.getElementById("contName");
let estadoContratista = document.getElementById("contState");
let ciudadContratista = document.getElementById("contCity");
let informacionPago = document.getElementById("payInfo");
let fechaInicio = document.getElementById("beginDate");
let fechaFin = document.getElementById("endDate");
let diaPago = document.getElementById("payDate");
let compName=document.getElementById("compName");
let btnContratar = document.getElementById("btnContratar");

nombreOperador.value = OPinfo.name;
estadoOperador.value = OPinfo.state;
ciudadOperador.value = OPinfo.city;
nombreContratista.value = CONinfo[0].name;
compName.value=CONinfo[0].companyName;
estadoContratista.value = CONinfo[0].companyAdd.state;
ciudadContratista.value = CONinfo[0].companyAdd.city;
informacionPago.value = CONinfo[0].payInfo;

btnContratar.addEventListener("click", function () {
    let contratacion = {
        Operador: {
            name: nombreOperador.value,
            state: estadoOperador.value,
            city: ciudadOperador.value
        },
        Contratista: {
            CompanyName:compName.value,
            name: nombreContratista.value,
            state: estadoContratista.value,
            city: ciudadContratista.value,
            payInfo: informacionPago.value
        },
        beginContractDate: fechaInicio.value,
        endContractDate: fechaFin.value,
        PaymentDay: diaPago.value
    }
    postContratacion(contratacion);
})


function postContratacion(datos) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:3000/contratacionesOperador");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 201) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar la contratacion');
        } else {
            alert(xhr.responseText + '\n La contratación ha sido registrada con éxito');
        }
    };
}
document.addEventListener("DOMContentLoaded", function () {
    let operador = JSON.parse(localStorage.getItem("operador"));
    document.getElementById("img").setAttribute("src", operador.operatorIMG);
    document.getElementById("name").after(operador.name + " " + operador.lastname);
    document.getElementById("work").after(operador.available);
    document.getElementById("state").after(operador.state);
    document.getElementById("city").after(operador.city);
    document.getElementById("desc").after(operador.description);
    let array = [];
    array.push(operador.previousJob1.company);
    array.push(operador.previousJob2.company);
    array.push(operador.previousJob3.company);
    document.getElementById("company").after(array.join(", "));
    document.getElementById("time").after(operador.yearsExperience + " años");
    document.getElementById("licence").setAttribute("href", operador.licensePDF);
    for (let key in operador.machinesOperated) {
        console.log(operador.machinesOperated[key]);
        machineRequest(operador.machinesOperated[key], () => {
            let machine = JSON.parse(localStorage.getItem("maquina"));
            let HTMLmachine = document.createElement("li");
            HTMLmachine.setAttribute("class", "list-group-item");
            let black = document.createElement("b");
            black.textContent = machine[0].type + ": ";
            HTMLmachine.appendChild(black);
            HTMLmachine.insertAdjacentText("beforeEnd", machine[0].description);
            console.log(machine)
            document.getElementById("machine").appendChild(HTMLmachine);
        }, () => {
            alert("Fail in request");
        });
    }

});


function machineRequest(object, cbOk, cbErr) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/Maquinaria?id=${object}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(object)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar el usuario');
            cbErr();
        } else {
            localStorage.setItem("maquina", xhr.responseText);
            console.log(xhr.responseText)
            cbOk();
        }
    };
}