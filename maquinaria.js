// let temp = {
//     "id": 1,
//     "img": "http://s7d2.scene7.com/is/image/Caterpillar/CM20180925-52478-35901?$cc-s$",
//     "type": "Técnica de carreteras",
//     "dealer": "Caterpillar CS431C",
//     "model": "m3054T",
//     "specifications": "http://maquqam.com/tecnicas/carreteras-3337/caterpillar/cs431c.html",
//     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum qui quas corporis facere quod? Blanditiis velit quasi dolorum delectus illo mollitia consequuntur consectetur totam esse natus. Odit facere ex quisquam?Expedita quos dolorem, eligendi provident earum commodi voluptatem, magnam veritatis sit, quod voluptatum est excepturi eum perspiciatis aperiam! Animi facere laudantium, dolor veniam maiores consequuntur exercitationem magni minus eum corrupti."
// };
// localStorage.setItem("maquina", JSON.stringify(temp));

document.addEventListener("DOMContentLoaded", function () {
    let maquina = JSON.parse(localStorage.getItem("maquina"));
    document.getElementById("img").setAttribute("src", maquina.img);
    document.getElementById("type").after(maquina.type);
    document.getElementById("dealer").after(maquina.dealer);
    document.getElementById("model").after(maquina.model);
    document.getElementById("description").after(maquina.description);
    document.getElementById("specifications").setAttribute("href", maquina.specifications);

    OperatorRequest(maquina.id, () => {
        let operadores = JSON.parse(localStorage.getItem("operadorM"));
        let array = [];
        for (let operador in operadores) {
            console.log(operadores[operador]);
           
            let HTMLOperador = `<tr>
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
</tr>`;
            array.push(HTMLOperador);
        }
        document.getElementById('table').innerHTML = array.join("<div></div> ");

    }, () => {
        console.log("No fue posible recibir operado");
    });

});

function OperatorRequest(object, cbOk, cbErr) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `http://localhost:3000/Operador?machinesOperated_like=${object}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(object)]);
    xhr.onload = function () {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText + 'Error, no se ha podido registrar el usuario');
            cbErr();
        } else {
            localStorage.setItem("operadorM", xhr.responseText);
            cbOk();
        }
    };
}

function verOperador(key){
    for (let i=0; i < JSON.parse(localStorage.operadorM).length; i++) {
        if (JSON.parse(localStorage.operadorM)[i].id == key) {
            localStorage.operador = JSON.stringify(JSON.parse(localStorage.operadorM)[i]);
            window.location.href = "./candidato.html";
        }
    } 

}


