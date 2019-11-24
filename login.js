let btnloginContratista = document.getElementById("loginContratista");
let btnloginOperador = document.getElementById("loginOperador");
let UserTypeLogin=document.getElementById("radiobtnLog");

UserTypeLogin.addEventListener("change",ChangeLoginForm);
function ChangeLoginForm(){
let radio=document.querySelector('input[name="UserTypeLog"]:checked').value;
btnloginContratista.setAttribute('hidden',"");
btnloginOperador.setAttribute('hidden',"");
if(radio=='Operador'){
    btnloginOperador.removeAttribute('hidden');
}
if(radio=='Contratista'){
    btnloginContratista.removeAttribute('hidden');
}
}


btnloginContratista.addEventListener("click", function (event) {
    event.preventDefault();
    let objeto = {
        mail: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    }
    loginContratista(objeto, function () {
        let temp = JSON.parse(localStorage.usuario);
        if (temp.length > 0) {
            if (temp[0].password == document.getElementById("loginPassword").value) {
                window.location.href = "/principal.html";
            } else {
                alert("Error, password o correo Incorrectos")
            }
        } else {
            alert("Error, password o correo Incorrectos")
        }


    }, function () {
        alert("No se pudo");
    });

});

function loginContratista(datos, cbOk, cbErr) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/Contratista?mail=${datos.mail}`);
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText + '\n Error, correo o contraseña invalidos');
            cbErr();
        } else {
            localStorage.setItem("usuario", xhr.response);
            cbOk();
            // 
        }
    };
}

btnloginOperador.addEventListener("click", function (event) {
    event.preventDefault();
    let objeto = {
        mail: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    }
    loginOperador(objeto, function () {
        let temp = JSON.parse(localStorage.usuario);
        if (temp.length > 0) {
            if (temp[0].password == document.getElementById("loginPassword").value) {
                window.location.href = "/principal.html";
            } else {
                alert("Error, password o correo Incorrectos")
            }
        } else {
            alert("Error, password o correo Incorrectos")
        }


    }, function () {
        alert("No se pudo");
    });

});

function loginOperador(datos, cbOk, cbErr) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/Operador?mail=${datos.mail}`);
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText + '\n Error, correo o contraseña invalidos');
            cbErr();
        } else {
            localStorage.setItem("usuario", xhr.response);
            cbOk();
            // 
        }
    };
}