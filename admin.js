let arrayOperadores = [];
let arrayContratistas = [];
let arrayMaquinaria = [];
document.addEventListener("DOMContentLoaded", () => {
    OperadorRequest(null, () => {
        let operadores = JSON.parse(localStorage.operadores);
        for (let operador in operadores) {
            let HTMLOperador =
                `<table width=100%>
                        <tr>
                            <td rowspan="5" width="20%"><img width="200px"
                                    src="${operadores[operador].operatorIMG}" alt=""></td>
                            <td align="left" width="50%">
                                <ul class="list-group">
                                    <li class="list-group-item"> <b>Nombre:</b> ${operadores[operador].name} ${operadores[operador].lastname}</li>
                                    <li class="list-group-item"> <b>Años de Experiencia:</b> ${operadores[operador].yearsExperience} años</li>
                                    <li class="list-group-item"><b>Estado:</b> ${operadores[operador].state}</li>
                                    <li class="list-group-item"><b>Ciudad:</b> ${operadores[operador].city}</li>
                                    <li class="list-group-item"><b>Status:</b> ${operadores[operador].status}</li>
                                </ul>
                                 <a href="/mensajes.html" type="button" class="btn btn-primary btn-rounded" >Contactar</a>
                                <button onclick=ActivarOperador(${operadores[operador].id}) type="button" class="btn btn-primary btn-rounded btn-success">Activar</button>
                                <button onclick=DesactivarOperador(${operadores[operador].id}) type="button" class="btn btn-primary btn-rounded btn-warning">Desactivar</button>
                                <button onclick=DeleteOperador(${operadores[operador].id}) type="button" class="btn btn-primary btn-rounded btn-danger" data-toggle="button" aria-pressed="false" autocomplete="off">Eliminar</button></<button>
                            </td>
                            <td></td>
                        </tr>
                    </table>
            `
            arrayOperadores.push(HTMLOperador);
        }
        fillOperadores();

    }, () => {
        console.log("No Fue posible cargar contenido")
    });

    ContratistaRequest(null, () => {
        let contratistas = JSON.parse(localStorage.contratistas);
        for (let contratista in contratistas) {
            let HTMLContratista =
                `<table>

            <tr>
                <td rowspan="5" width="20%"><img width="200px"
                        src="${contratistas[contratista].img}" alt=""></td>
            
                <td align="left" width="50%">
                    <ul class="list-group">
                        <li class="list-group-item"> <b>Nombre:</b> ${contratistas[contratista].name} ${contratistas[contratista].lastname}</li>
                        <li class="list-group-item"><b>Compañia:</b> ${contratistas[contratista].companyName}</li>
                        <li class="list-group-item"><b>Estado:</b>  ${contratistas[contratista].companyAdd.state}</li>
                        <li class="list-group-item"><b>Ciudad:</b> ${contratistas[contratista].companyAdd.city}</li>
                    </ul>
                    <a href="/mensajes.html" type="button" class="btn btn-primary btn-rounded" >Contactar</a>
                    <button onclick=DeleteContratista(${contratistas[contratista].id}) type="button" class="btn btn-primary btn-rounded btn-danger" data-toggle="button" aria-pressed="false" autocomplete="off">Eliminar Contratista</button></<button>
                </td>
                <td>
            
                </td>
            </tr>
            </table>
            `
            arrayContratistas.push(HTMLContratista);
        }
        fillContratistas();

    }, () => {
        console.log("No Fue posible cargar contenido")
    });


});

function fillOperadores() {
    document.getElementById("divOperadores").innerHTML = arrayOperadores.join("<p></p>");
}

function fillContratistas() {
    document.getElementById("divContratistas").innerHTML = arrayContratistas.join("<p></p>");
}

function OperadorRequest(object, cbOk, cbErr) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/Operador`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(object)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar el usuario');
            cbErr();
        } else {
            localStorage.setItem("operadores", xhr.responseText);
            cbOk();
        }
    };
}

function ContratistaRequest(object, cbOk, cbErr) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/Contratista`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(object)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar el usuario');
            cbErr();
        } else {
            localStorage.setItem("contratistas", xhr.responseText);
            cbOk();
        }
    };
}

function DeleteOperador(key) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('DELETE', `http://localhost:3000/Operador/${key}`);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud a la red
    xhr.send(null);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert("ERROR");
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        } else {
            // Significa que fue exitoso
            window.location.href = "/admin.html";
            alert("Operador Eliminado");
        }
    };

}

function DesactivarOperador(key) {
    console.log(key)
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', `http://localhost:3000/Operador/${key}`);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud a la red
    xhr.send(null);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert("ERROR");
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        } else {
            // Significa que fue exitoso
            let User = JSON.parse(xhr.response);
            DesactivaOperador(User);
        }
    };
}

function DesactivaOperador(User) {
    User.status = "inactivo";
    event.preventDefault();
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('PUT', `http://localhost:3000/Operador/${User.id}`);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud a la red
    xhr.send(JSON.stringify(User));
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ':' + xhr.statusText); // e.g. 404: Not Found
        } else {
            alert('El Operador ha sido desactivado con éxito');
        }
    };
}

function ActivarOperador(key) {
    console.log(key)
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', `http://localhost:3000/Operador/${key}`);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud a la red
    xhr.send(null);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert("ERROR");
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        } else {
            // Significa que fue exitoso
            let User = JSON.parse(xhr.response);
            ActivaOperador(User);
        }
    };
}

function ActivaOperador(User) {
    User.status = "activo";
    event.preventDefault();
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('PUT', `http://localhost:3000/Operador/${User.id}`);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud a la red
    xhr.send(JSON.stringify(User));
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ':' + xhr.statusText); // e.g. 404: Not Found
        } else {
            alert('El Operador ha sido activado con éxito');
        }
    };
}

function DeleteContratista(key) {
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('DELETE', `http://localhost:3000/Contratista/${key}`);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud a la red
    xhr.send(null);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert("ERROR");
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
        } else {
            // Significa que fue exitoso
            window.location.href = "/admin.html";
            alert("Contratista Eliminado");
        }
    };

}