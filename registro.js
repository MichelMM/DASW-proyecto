let modal = document.getElementById('registro');
let BtnRegContratista = document.getElementById("BtnRegContratista");
let BtnRegOperador = document.getElementById("BtnRegOperador");
let UserType = document.getElementById("radiobtn");
let formContratista = document.getElementById('formContratista');
let formOperador = document.getElementById('formOperador');



UserType.addEventListener("change", ChangeForm);

function ChangeForm() {
    let radio = document.querySelector('input[name="UserType"]:checked').value;
    formContratista.setAttribute('hidden', "");
    formOperador.setAttribute('hidden', "");
    if (radio == 'Operador') {
        formOperador.removeAttribute('hidden');
    }
    if (radio == 'Contratista') {
        formContratista.removeAttribute('hidden');
    }
}

formContratista.addEventListener("change", camposContratista);
formOperador.addEventListener("change", camposOperador);

function camposContratista() {
    let notValid = formContratista.querySelectorAll(":invalid");
    let valid = formContratista.querySelectorAll(":valid");
    let password1 = document.getElementById('password1');
    let password2 = document.getElementById('password2');
    notValid.forEach(function (element) {
        element.style.border = '1px solid #ff0000';
        formContratista.querySelector('button').disabled = true;
    });
    if (notValid.length == 0 && password1.value == password2.value) {
        formContratista.querySelector('button').disabled = false;
    } else if (notValid.length != 0 || password1.value != password2.value) {
        formContratista.querySelector('button').disabled = true;
    }

    valid.forEach(function (element) {
        element.style.border = '1px solid #ced4da';
    });
}

function camposOperador() {
    let notValid = formOperador.querySelectorAll(":invalid");
    let valid = formOperador.querySelectorAll(":valid");
    let password1 = document.getElementById('OPpassword1');
    let password2 = document.getElementById('OPpassword2');
    notValid.forEach(function (element) {
        element.style.border = '1px solid #ff0000';
        formOperador.querySelector('button').disabled = true;
    });
    if (notValid.length == 0 && password1.value == password2.value) {
        formOperador.querySelector('button').disabled = false;
    } else if (notValid.length != 0 || password1.value != password2.value) {
        formOperador.querySelector('button').disabled = true;
    }
    valid.forEach(function (element) {
        element.style.border = '1px solid #ced4da';
    });
}

BtnRegContratista.addEventListener("click", function (event) {
    let objeto = {
        id: document.getElementById("phone").value,
        name: document.getElementById("inputName").value,
        lastname: document.getElementById("inputApellido").value,
        cellphone: document.getElementById("phone").value,
        mail: document.getElementById("inputEmail3").value,
        personalAdd: {
            street: document.getElementById("Pstreet").value,
            city: document.getElementById("Pcity").value,
            state: (document.getElementById("Pcity").value == "Guadalajara") ? "Jalisco" : (document.getElementById("city").value == "Monterrey") ? "Nuevo Leon" : "Ciudad de México",
            CP: document.getElementById("PCP").value,
        },
        companyName: document.getElementById("Cname").value,
        companyAdd: {
            street: document.getElementById("Cstreet").value,
            city: document.getElementById("Ccity").value,
            state: (document.getElementById("Ccity").value == "Guadalajara") ? "Jalisco" : (document.getElementById("city").value == "Monterrey") ? "Nuevo Leon" : "Ciudad de México",
            CP: document.getElementById("CCP").value,
        },
        payInfo: document.getElementById("payInfo").value,
        rfc: document.getElementById("RFC").value,
        user: document.getElementById("inputName").value,
        password: document.getElementById('password1').value
    }
    registrarContratista(objeto);
    event.preventDefault();
});


BtnRegOperador.addEventListener("click", function (event) {
    let objeto = {
        id: document.getElementById("OPphone").value,
        name: document.getElementById("OPinputName").value,
        lastname: document.getElementById("OPinputApellido").value,
        mail: document.getElementById("OPinputEmail3").value,
        licensePDF:document.getElementById("licensePDF").value,
        officialID:document.getElementById("officialID").value,
        city: document.getElementById("OPcity").value,
        state: (document.getElementById("OPcity").value == "Guadalajara") ? "Jalisco" : (document.getElementById("city").value == "Monterrey") ? "Nuevo Leon" : "Ciudad de México",
        cellphone: document.getElementById("OPphone").value,
        operatorIMG: document.getElementById("operatorIMG").value,
        noCRB:document.getElementById("noCRB").value,
        yearsExperience:document.getElementById("experience").value,
        available:document.getElementById("OPavailable").value,
        rfc: document.getElementById("OPRFC").value,
        user: document.getElementById("OPinputName").value,
        password: document.getElementById('OPpassword1').value
    }
    registrarOperador(objeto);
    event.preventDefault();
});

function registrarContratista(datos) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:3000/Contratista");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 201) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar el usuario');
        } else {
            alert(xhr.responseText + '\n El Contratista ha sido registrado con éxito');
        }
    };
}

function registrarOperador(datos) {
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:3000/Operador");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 201) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar el usuario');
        } else {
            alert(xhr.responseText + '\n El Operador ha sido registrado con éxito');
        }
    };
}