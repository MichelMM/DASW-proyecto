let user = JSON.parse(localStorage.usuario);
console.log(user);
let camposOperador = document.getElementById("rowOperador");
let camposContratista = document.getElementById("rowContratista");

let OdivIMG = document.getElementById("OperatorImage");
let CdivIMG = document.getElementById("ContratistaImage");

let OName = document.getElementById("OPinputName");
let OLast = document.getElementById("OPinputApellido");
let OMail = document.getElementById("OPinputEmail3");
let OlicensePDF = document.getElementById("licensePDF");
let OofficialID = document.getElementById("officialID");
let Ocity = document.getElementById("OPcity");
let Ocellphone = document.getElementById("OPphone");
let OpIMG = document.getElementById("operatorIMG");
let noCRB = document.getElementById("noCRB");
let yearsExperience = document.getElementById("experience");
let OPavailable = document.getElementById("OPavailable");
let Orfc = document.getElementById("OPRFC");
let Opassword = document.getElementById('OPpassword1');
let description=document.getElementById('description');
let job1=document.getElementById('job1');
let jobc1=document.getElementById('jobc1');
let jobtel1=document.getElementById('jobtel1');
let job2=document.getElementById('job2');
let jobc2=document.getElementById('jobc2');
let jobtel2=document.getElementById('jobtel2');
let job3=document.getElementById('job3');
let jobc3=document.getElementById('jobc3');
let jobtel3=document.getElementById('jobtel3');
let newMachine=document.getElementById('newMachine');
let recomendation=document.getElementById('recomendation');
let EditOperador=document.getElementById('EditOperador');
let DeleteOperador=document.getElementById('DeleteOperador');

function ocultarCampos() {
    camposContratista.removeAttribute('hidden');
    camposOperador.removeAttribute('hidden');
    if (user[0].type == "operador") {
        camposContratista.setAttribute('hidden', "");
        OprecargarDatos();
    } else {
        camposOperador.setAttribute('hidden', "");
        CprecargarDatos();
    }
}
ocultarCampos();

function OprecargarDatos() {
    OdivIMG.innerHTML += ` <img  style="margin: 20px; height:180px; width:180px;"class="mx-auto d-block card-img-top rounded-circle"src="${user[0].operatorIMG}" alt="">`
    OName.value = user[0].name;
    OLast.value = user[0].lastname;
    OMail.value = user[0].mail;
    OlicensePDF.value = user[0].licensePDF;
    OofficialID.value=user[0].officialID;
    Ocity.value = user[0].city;
    Ocellphone.value = user[0].cellphone;
    OpIMG.value = user[0].operatorIMG;
    noCRB.value = user[0].noCRB;
    yearsExperience.value = user[0].yearsExperience;
    OPavailable.value = user[0].available;
    Orfc.value = user[0].rfc;
    Opassword.value = user[0].password;
    description.value = user[0].description;
job1.value = user[0].previousJob1.company;
 jobc1.value = user[0].previousJob1.referenceContact.name;
 jobtel1.value = user[0].previousJob1.referenceContact.cellphone;
 job2.value = user[0].previousJob2.company;
 jobc2.value = user[0].previousJob2.referenceContact.name;
 jobtel2.value = user[0].previousJob2.referenceContact.cellphone;
job3.value = user[0].previousJob3.company;
jobc3.value = user[0].previousJob3.referenceContact.name;
jobtel3.value = user[0].previousJob3.referenceContact.cellphone;
recomendation.value=user[0].recomendation;
}

EditOperador.addEventListener('click', function () {
    let DatosOperador = {
    name:OName.value,
      lastname:OLast.value,
      mail:OMail.value,
      licensePDF: OlicensePDF.value,
      officialID: OofficialID.value,
      city:Ocity.value,
      state: (Ocity.value == "Guadalajara") ? "Jalisco" : (document.getElementById("city").value == "Monterrey") ? "Nuevo Leon" : "Ciudad de México",
      cellphone:Ocellphone.value,
      operatorIMG:OpIMG.value ,
      noCRB:noCRB.value,
      yearsExperience:yearsExperience.value ,
      available:OPavailable.value,
      rfc: Orfc.value,
      user: OName.value,
      password:Opassword.value,
      type: "operador",
      previousJob1: {
        company: job1.value,
        referenceContact: {
          name: jobc1.value,
          cellphone: jobtel1.value
        }
      },
      previousJob2: {
        company:job2.value,
        referenceContact: {
          name: jobc2.value,
          cellphone: jobtel2.value
        }
      },
      previousJob3: {
        company: job3.value,
        referenceContact: {
          name: jobc3.value,
          cellphone: jobtel3.value
        }
      },
      machinesOperated: [],
      recomendationCard: recomendation.value,
      description: description.value
    }; //objeto  donde se guardaran los datos de registro;
    let machines=[];
    machines=user[0].machinesOperated;
    machines.push(newMachine.value);
    DatosOperador.machinesOperated=machines;
    OperadorUpdate(DatosOperador);
});

function OperadorUpdate(Datos) {
  console.log( `http://localhost:3000/Operador?mail=${user[0].mail}`);
    event.preventDefault();
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar: PUT actualizar archivo
    xhr.open('PATCH', `http://localhost:3000/Operador?mail=${user[0].mail}`);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    // 4. Enviar solicitud a la red
    xhr.send(JSON.stringify(Datos));
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            alert(xhr.status + ':' + xhr.statusText); // e.g. 404: Not Found
        } else {
            alert(xhr.responseText + '\n El Operador ha sido actualizado con éxito');
        }
    };
};



function OEditValues(){

}

function CprecargarDatos() {
    CdivIMG.innerHTML += ` <img  style="margin: 20px; height:180px; width:180px;"class="mx-auto d-block card-img-top rounded-circle"src="${user[0].img}" alt="">`
}

// function userEdit(correo) {

// };

// function userUpdate(DatosUsuario) {

// };