let loginButton = document.getElementById("loginButton");

loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    let objeto = {
        mail: document.getElementById("loginEmail").value,
        password: document.getElementById("loginPassword").value
    }
    loginDatos(objeto, function () {
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


function loginDatos(datos, cbOk, cbErr) {
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