let registro = document.getElementsByClassName("card border-secondary")[0];

registro.addEventListener("change",campos);
function campos(){
    let notValid = registro.querySelectorAll(":invalid");
    let valid = registro.querySelectorAll(":valid");
    let password1 = document.getElementById('password1');
    let password2 = document.getElementById('password2');
    notValid.forEach(function (element){
        element.style.border = '1px solid #ff0000';
        registro.querySelector('button').disabled = true;
    });
    if (notValid.length == 0 && password1.value == password2.value) {
        registro.querySelector('button').disabled = false;
    }else if(notValid.length != 0 || password1.value != password2.value){
        registro.querySelector('button').disabled = true;
    }

    valid.forEach(function(element){
        element.style.border = '1px solid #ced4da';
    });
}



document.getElementById("registro").addEventListener("click",function (event){
    let objeto = {
        name: document.getElementById("inputName").value,
        lastname: document.getElementById("inputApellido").value,
        mail: document.getElementById("inputEmail3").value,
        password: document.getElementById('password1').value,
        cellphone: document.getElementById("phone").value,
        city: document.getElementById("city").value,
        cp: document.getElementById("CP").value,
        rfc: document.getElementById("RFC").value,
        type: (document.getElementById("tipo1").checked == true)?"operador":"contratista",
        id: 100,
        company: "",
        user: document.getElementById("inputName").value,

    }
    registrarDatos(objeto);
});

function registrarDatos(datos) {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:3000/usuario");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 201) {
            alert(xhr.status + ': ' + xhr.statusText  + 'Error, no se ha podido registrar el usuario');
        } else {
            alert(xhr.responseText+'\n El usuario ha sido registrado con éxito');
        }
    };
}
