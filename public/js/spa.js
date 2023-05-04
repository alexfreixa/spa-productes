function neteja() {
    content.innerHTML = "";
}

function inicia(){
    const botoConsulta = document.createElement('button');
    botoConsulta.setAttribute('id', 'carregar-productes');
    botoConsulta.addEventListener('click', clickCarregarProductes);
    botoConsulta.innerHTML = 'Start';
    content.appendChild(botoConsulta);
}

function netejaTaula(){
    const entradesTaula = document.getElementById("entrades");
    entradesTaula.innerHTML = "";
    console.log("Taula netejada.");
}

function generaTaulaCRUD(){
    console.log("Generant taula CRUD");

    const controlsWrapper = document.createElement('div');
    controlsWrapper.setAttribute('class', 'controls-crud');

    const crear = document.createElement('a');
    crear.setAttribute('href', '#');
    crear.setAttribute('class', 'boto crear');
    crear.setAttribute('accio', 'crear');
    crear.innerHTML = 'Crear Producte';
    crear.addEventListener('click', clickCrear);

    const missatge = document.createElement('div');
    missatge.setAttribute('id', 'missatge');
    missatge.setAttribute('class', 'missatge');
    missatge.style.display = 'none';

    const columna1 = document.createElement('div');
    columna1.setAttribute('class', 'columna col-9');
    columna1.appendChild(missatge);

    const columna2 = document.createElement('div');
    columna2.setAttribute('class', 'columna col-3');
    columna2.appendChild(crear);

    controlsWrapper.appendChild(columna1);
    controlsWrapper.appendChild(columna2);
    content.appendChild(controlsWrapper);   

    const taulaWrapper = document.createElement('div');
    taulaWrapper.setAttribute("id", "taula-productes");

    const taula = document.createElement('table');

    taula.setAttribute("cellspacing", 0);
    taula.setAttribute("cellpadding", 0);
    taula.setAttribute("class", "taula");

    const cap = document.createElement('tr');

    cap.setAttribute('class', 'capTaula');

    const capId = document.createElement('th');
    capId.innerHTML = 'ID';
    const capNo = document.createElement('th');
    capNo.innerHTML = 'Nom';
    const capDe = document.createElement('th');
    capDe.innerHTML = 'Descripcio';
    const capPr = document.createElement('th');
    capPr.innerHTML = 'Preu';
    const capOp = document.createElement('th');
    capOp.innerHTML = 'Opcions';

    const cosTaula = document.createElement('tbody');
    cosTaula.setAttribute("id", "entrades");

    content.appendChild(taulaWrapper);
    taulaWrapper.appendChild(taula);
    taula.appendChild(cap);

    cap.appendChild(capId);
    cap.appendChild(capNo);
    cap.appendChild(capDe);
    cap.appendChild(capPr);
    cap.appendChild(capOp);

    taula.appendChild(cosTaula);

}

inicia();
//generaTaulaCRUD();

function clickCarregarProductes(){
    
    neteja();
    generaTaulaCRUD();
    // Cridem a la funció asincrónica
    consultarDades("http://apis-laravel.test/api/products").then(function(dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'mostrarTot';
        gestionaDades(dades, accio);
    });
    mostraMissatge('Productes carregats.', 'carregats');

}

function clickModificar(event){
    const id = event.currentTarget.getAttribute('id-producte');
    consultarDades("http://apis-laravel.test/api/products/" + id).then(function(dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'modificar';
        gestionaDades(dades, accio, id);
    });
    //mostraMissatge('Producte modificat.', 'modificats');
}

function clickEliminar(event){
    const id = event.currentTarget.getAttribute('id-producte');
    eliminarProducte("http://apis-laravel.test/api/products/" + id).then(function(dades) {
        console.log(dades);
        clickCarregarProductes();
        mostraMissatge('Producte eliminat.', 'eliminat');
    });
}

function clickCrear(){
    /*const accio = 'crear';
    gestionaDades(null, accio, null);*/
    const tipusFormulari = 'crear';
    generaFormulari(tipusFormulari);
};

function mostraMissatge(text, resposta){
    const msg = document.getElementById('missatge');
    msg.innerHTML = text;
    msg.setAttribute('class', 'msg ' + resposta);
    msg.style.display = '';
}


// Funció que mostres les dades de la promesa que se li passa
const gestionaDades = (dades, accio, id) => {

    netejaTaula();

    if (accio == 'mostrarTot') {
        productes = dades[0].data.data;
        productes.forEach((producte) => {
            consultaProductes(producte.id, producte.product_name, producte.product_description, producte.product_price);
        });
    } else if (accio == 'modificar') {
        producte = dades[0].data;

        const tipusFormulari = 'modificar';

        generaFormulari(tipusFormulari, producte.id, producte.product_name, producte.product_description, producte.product_price);
    }

}



const consultarDades = async (...urls) => {
    try {
        const arrayFetch = urls.map((url) => fetch(url));
        const response = await Promise.all(arrayFetch);
        const data = await response.map((result) => result.json());
        const dadesFinals = Promise.all(data);
        return dadesFinals;
    } catch (err) {
        console.log(err);
    }
};

const eliminarProducte = async (...urls) => {

    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const arrayFetch = urls.map((url) => fetch(url,{
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
            }
        }));
        
        const response = await Promise.all(arrayFetch);
        const data = await response.map((result) => result.json());
        const dadesFinals = Promise.all(data);
        
        return dadesFinals;
    } catch (err) {
        console.log(err);
    }
    
};

function generaFormulari(tipusFormulari, id, nom, descripcio, preu) {
    
    neteja();
    
    console.log("Generant formulari...");
    
    const contenidor = document.createElement('div');
    contenidor.setAttribute('class', 'formulari');

    const formulari = document.createElement('form') 
    formulari.setAttribute('method', 'POST');
    formulari.setAttribute('action', `/dashboard/product/` + id);

    formulari.appendChild(creaLabel('ID', 'id'));
    formulari.appendChild(creaInput('text', 'id', id ));

    formulari.appendChild(creaLabel('Nom', 'nom'));
    formulari.appendChild(creaInput('text', 'nom', nom ));

    formulari.appendChild(creaLabel('Descripcio', 'descripcio'));
    formulari.appendChild(creaInput('textarea', 'descripcio', descripcio ));

    formulari.appendChild(creaLabel('Preu', 'preu'));
    formulari.appendChild(creaInput('number', 'preu', preu ));

    const enrere = document.createElement('a');
    enrere.addEventListener("click", clickCarregarProductes);
    enrere.setAttribute('href', '#');
    enrere.setAttribute('class', 'boto normal');
    enrere.innerHTML = "Enrere"

    const submit = document.createElement('button');

    submit.setAttribute('href', '/dashboard/product/update/' + id);
    submit.setAttribute('type', 'submit');
    submit.setAttribute('class', 'boto update');
    submit.setAttribute('id-producte', id);
    submit.innerHTML = "Guardar"

    formulari.appendChild(enrere);
    formulari.appendChild(submit);

    content.appendChild(formulari);
}

function creaInput(tipus, id, contingut){

    let input;

    if (tipus != 'textarea') {
        input = document.createElement('input');
        input.setAttribute('type', tipus);
        input.setAttribute('value', contingut);

        if (id == 'id') {
            input.setAttribute('readonly', 'readonly')
        } 


    } else if(tipus == 'textarea') {
        input = document.createElement('textarea');
    }
    
    input.setAttribute('id', id);
    input.setAttribute('name', id);

    return input;

    
    
}

function creaLabel(contingut, forlabel){
    const label = document.createElement('label');
    label.setAttribute('for', forlabel)
    label.innerHTML = contingut;
    return label;
}

function consultaProductes(id, nom, descripcio, preu) {
console.log("Generant contingut de la taula.");
const entrades = document.getElementById("entrades");
const tr = document.createElement('tr');

tr.setAttribute("class", "producte");

const tdid = document.createElement('td');
const tdna = document.createElement('td');
const tdde = document.createElement('td');

tdde.setAttribute('class', 'producteDescripcio');

const tdpr = document.createElement('td');
const tdac =  document.createElement('td');

tdid.innerHTML = id;
tdna.innerHTML = nom;
tdde.innerHTML = descripcio;
tdpr.innerHTML = preu;

const veure =  document.createElement('a');
const modificar =  document.createElement('a');
const eliminar =  document.createElement('a');

veure.setAttribute('href', '#');
veure.setAttribute('id-producte', id);
veure.setAttribute('class', 'boto veure');
//veure.addEventListener('click', clickVeure);

modificar.setAttribute('href', '#');
modificar.setAttribute('id-producte', id);
modificar.setAttribute('accio', 'modificar');
modificar.setAttribute('class', 'boto modificar');
modificar.addEventListener('click', clickModificar);

eliminar.setAttribute('href', '#');
eliminar.setAttribute('id-producte', id);
eliminar.setAttribute('accio', 'eliminar');
eliminar.setAttribute('class', 'boto eliminar');
eliminar.addEventListener('click', clickEliminar);

veure.innerHTML = "Veure "
modificar.innerHTML = "Modificar "
eliminar.innerHTML = "Eliminar "

tr.appendChild(tdid);
tr.appendChild(tdna);
tr.appendChild(tdde);
tr.appendChild(tdpr);
tr.appendChild(tdac);

tdac.appendChild(veure)
tdac.appendChild(modificar)
tdac.appendChild(eliminar)

entrades.appendChild(tr);


}

