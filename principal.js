let array = [];
document.addEventListener("DOMContentLoaded", () => {
    OperadorRequest(null, () => {
        let operadores = JSON.parse(localStorage.operadores);
        for (let operador in operadores) {
            let HTMLOperador = `<table>
            <tr>
    <td rowspan="5"><img width="200px"
            src="${operadores[operador].operatorIMG}"
            alt=""></td>
    <td>Nombre:</td>
    <td>${operadores[operador].name} ${operadores[operador].lastname}</td>
    </tr>
    <tr>
    <tr>
    <td>Años de Experiencia:</td>
    <td>${operadores[operador].yearsExperience} años</td>
    </tr>
    <tr>
    <td>Disponibilidad:</td>
    <td>${operadores[operador].available}</td>
    </tr>
    <tr>
    <td>Calificación:</td>
    <td>Aqui van las estrellitas</td>
    <td><button onclick=verOperador(${operadores[operador].id}) type="button" class="btn btn-primary" data-toggle="button"
            aria-pressed="false" autocomplete="off">Ver</button></td>
    </tr>
    </table>`;
            array.push(HTMLOperador);
        }
        fill();

    }, () => {
        console.log("No Fue posible cargar contenido")
    });
    MaquinariaRequest(null, () => {
        let maquinas = JSON.parse(localStorage.Maquinaria);
        for (let maquina in maquinas) {
            let HTMLMaquina = `<table width=100%>
            <tr>
                <td rowspan="5"><img width="200px"
                        src="${maquinas[maquina].img}"
                        alt=""></td>
                <td>Equipo:</td>
                <td>${maquinas[maquina].type}</td>
            </tr>
            <tr>
                <td>Fabricante/Modelo:</td>
                <td>${maquinas[maquina].dealer} ${maquinas[maquina].model}</td>
            </tr>
            <tr>
                <td>Renta</td>
                <td>Hora: $50/ Día:$500 /Semana: $2000</td>
            </tr>
            <tr>
                <td>Incluye transporte:</td>
                <td>SI</td>
            </tr>
            <tr>
                <td>Calificación</td>
                <td><img src="https://miro.medium.com/max/1106/1*PvoG2ZWSd5Z-a3k2jdM55A.png" alt="" srcset=""
                        width="91px" height="25px"></td>
                <td><button onclick=verMaquina(${maquinas[maquina].id}) type="button" class="btn btn-primary" data-toggle="button" aria-pressed="false"
                        autocomplete="off">Ver</button></td>
            </tr>
    
        </table>`;
        array.push(HTMLMaquina);
        fill();
        }   
    }, () => {
        console.log("No Fue posible cargar contenido")
    });
    
});

function fill(){
    document.getElementById("tabla").innerHTML = array.join("<p></p>");
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

function MaquinariaRequest(object, cbOk, cbErr) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/Maquinaria`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(object)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar el usuario');
            cbErr();
        } else {
            localStorage.setItem("Maquinaria", xhr.responseText);
            cbOk();
        }
    };
}

function verOperador(key){
    for (let i=0; i < JSON.parse(localStorage.operadores).length; i++) {
        if (JSON.parse(localStorage.operadores)[i].id == key) {
            localStorage.operador = JSON.stringify(JSON.parse(localStorage.operadores)[i]);
            window.location.href = "./candidato.html";
        }
    } 

}
function verMaquina(key){
    for (let i=0; i < JSON.parse(localStorage.Maquinaria).length; i++) {
        if (JSON.parse(localStorage.Maquinaria)[i].id == key) {
            localStorage.maquina = JSON.stringify(JSON.parse(localStorage.Maquinaria)[i]);
            window.location.href = "./maquinaria.html";
        }
    } 

}