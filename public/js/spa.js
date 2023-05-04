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

/*document.getElementById("carregar-productes").addEventListener("click", function(event) {
    event.target.remove();
    generaTaulaCRUD();
    // Cridem a la funció asincrónica
    consultarDades("http://apis-laravel.test/api/products").then(function(dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'mostrarTot';
        gestionaDades(dades, accio);
    });
});*/

// Afegim un esdeveniment click
/*document.getElementById("carregar-productes").addEventListener("click", function(event) {
    event.target.remove();
    generaTaulaCRUD();
    // Cridem a la funció asincrónica
    consultarDades("http://apis-laravel.test/api/products").then(function(dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'mostrarTot';
        gestionaDades(dades, accio);
    });
});*/

function clickCarregarProductes(event){
    event.target.remove();
    neteja();
    generaTaulaCRUD();
    // Cridem a la funció asincrónica
    consultarDades("http://apis-laravel.test/api/products").then(function(dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'mostrarTot';
        gestionaDades(dades, accio);
    });
}

function clickModificar(event){
    const id = event.currentTarget.getAttribute('id-producte');
    consultarDades("http://apis-laravel.test/api/products/" + id).then(function(dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'modificar';
        gestionaDades(dades, accio, id);
    });
}


// Funció asíncrona per accedir a una API
const obtenirDades = async (url) => {
try{
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();

        return data;
    } else {
        console.log(response.status); // 404
    }
} catch (err) {
    console.log(err);
};
};


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
        formulariModifica(producte.id, producte.product_name, producte.product_description, producte.product_price);
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

function formulariModifica(id, nom, descripcio, preu) {

    neteja();

    console.log("Generant formulari per modificar producte.");
    console.log(id);
    console.log(nom);
    console.log(descripcio);
    console.log(preu);

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

const formulari =  document.createElement('form');

formulari.setAttribute('method', 'POST');
formulari.setAttribute('action', `/dashboard/product/delete/` + id);

const veure =  document.createElement('a');
const modificar =  document.createElement('a');
const eliminar =  document.createElement('button');


veure.setAttribute('href', '/dashboard/product/show/' + id);
veure.setAttribute('id-producte', id);
veure.setAttribute('class', 'boto veure');

//modificar.setAttribute('href', '/dashboard/product/' + id + '/edit/');
modificar.setAttribute('href', '#');
modificar.setAttribute('id-producte', id);
modificar.setAttribute('class', 'boto modificar');
modificar.addEventListener('click', clickModificar);

eliminar.setAttribute('href', '/dashboard/product/delete/' + id);
eliminar.setAttribute('type', 'submit');
eliminar.setAttribute('class', 'boto eliminar');
eliminar.setAttribute('id-producte', id);

veure.innerHTML = "Veure "
modificar.innerHTML = "Modificar "
eliminar.innerHTML = "Eliminar "

tr.appendChild(tdid);
tr.appendChild(tdna);
tr.appendChild(tdde);
tr.appendChild(tdpr);
tr.appendChild(tdac);
tdac.appendChild(formulari);
formulari.appendChild(veure)
formulari.appendChild(modificar)
formulari.appendChild(eliminar)

entrades.appendChild(tr);


}


