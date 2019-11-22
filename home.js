let modal=document.getElementById('registro');
console.log(modal);
let form=document.getElementById('form');
let btnregistro=document.getElementById("btnregistro");
console.log(btnregistro);
form.addEventListener("change",campos);
function campos(){
    let notValid = form.querySelectorAll(":invalid");
    let valid = form.querySelectorAll(":valid");
    let password1 = document.getElementById('password1');
    let password2 = document.getElementById('password2');
    notValid.forEach(function (element){
        element.style.border = '1px solid #ff0000';
        form.querySelector('button').disabled = true;
    });
    if (notValid.length == 0 && password1.value == password2.value) {
        form.querySelector('button').disabled = false;
    }else if(notValid.length != 0 || password1.value != password2.value){
        form.querySelector('button').disabled = true;
    }

    valid.forEach(function(element){
        element.style.border = '1px solid #ced4da';
    });
}


btnregistro.addEventListener("click",function (event){
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
        id: document.getElementById("phone").value,
        company: "",
        user: document.getElementById("inputName").value,

    }
    registrarDatos(objeto);
});

function registrarDatos(datos) {
    event.preventDefault();
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