let array = [];
document.addEventListener("DOMContentLoaded", () => {
    OperadorRequest(null, () => {
        let operadores = JSON.parse(localStorage.operadores);
        for (let operador in operadores) {
            let HTMLOperador=
            `
            <table width=100%>
                        <tr>
                            <td rowspan="5" width="20%"><img width="200px"
                                    src="${operadores[operador].operatorIMG}" alt=""></td>

                            <td align="left" width="50%">
                                <ul class="list-group">
                                    <li class="list-group-item"> <b>Nombre:</b> ${operadores[operador].name} ${operadores[operador].lastname}</li>
                                    <li class="list-group-item"> <b>Años de Experiencia:</b> ${operadores[operador].yearsExperience} años</li>
                                    <li class="list-group-item"><b>Estado:</b> ${operadores[operador].state}</li>
                                    <li class="list-group-item"><b>Ciudad:</b> ${operadores[operador].city}</li>
                                </ul>
                                <button <a href="/mensajes.html" type="button" class="btn btn-primary btn-rounded" >Contactar</a></button>
                                <button type="button" class="btn btn-primary btn-rounded btn-warning">Desactivar Operador</button>
                                <button onclick=DeleteOperador(${operadores[operador].id}) type="button" class="btn btn-primary btn-rounded btn-danger" data-toggle="button" aria-pressed="false" autocomplete="off">Eliminar</button></<button>
                            </td>
                            <td></td>
                        </tr>
                    </table>
            `
            array.push(HTMLOperador);
        }
        fill();
    }, () => {
        console.log("No Fue posible cargar contenido")
    });
    
});

function fill(){
    document.getElementById("divOperadores").innerHTML = array.join("<p></p>");
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

function DeleteOperador(key){
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