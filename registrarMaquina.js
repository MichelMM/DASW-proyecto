let btnRegistrarMaquina = document.getElementById("registroMaquina");

btnRegistrarMaquina.addEventListener("click", function(event){
    let objeto={
        id: document.getElementById("inputID").value,
        type: document.getElementById("inputMachine").value,
        dealer: document.getElementById("inputDealer").value,
        model: document.getElementById("inputModel").value,
        specifications: document.getElementById("inputPDF").value,
    }
    registrarMaquina(objeto);
})

function registrarMaquina(datos){
    event.preventDefault();
    let xhr = new XMLHttpRequest();
    xhr.open('POST', "http://localhost:3000/Maquinaria");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send([JSON.stringify(datos)]);
    xhr.onload = function () {
        if (xhr.status != 201) {
            alert(xhr.status + ': ' + xhr.statusText  + 'Error, no se ha podido registrar la máquina');
        } else {
            alert(xhr.responseText+'\n La máquina ha sido registrada con éxito');
        }
    };
}