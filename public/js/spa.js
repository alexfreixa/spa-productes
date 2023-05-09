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
}

function generaTaulaCRUD(){

    const titol = document.createElement('h1');
    titol.innerHTML = 'CRUD - API';
    content.appendChild(titol);

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

function clickVeure(event){
    const id = event.currentTarget.getAttribute('id-producte');
    consultarDades("http://apis-laravel.test/api/products/" + id).then(function(dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'mostraUn';
        gestionaDades(dades, accio, id);
    });
    //mostraMissatge('Producte modificat.', 'modificats');
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

function clickCrear(){
    const tipusFormulari = 'crear';
    generaFormulari(tipusFormulari);
};

function requestEliminar(event){
    const id = event.currentTarget.getAttribute('id-producte');
    eliminarProducte("http://apis-laravel.test/api/products/" + id).then(function(dades) {
        clickCarregarProductes();
        mostraMissatge('Producte eliminat.', 'eliminat');
    });
}

function requestCrear(event) {
    event.preventDefault();

    const urls = ["http://apis-laravel.test/api/products"];

    const extraImages = document.getElementsByName("product_extra_images[]");

    let extraImagesArray = [];
    for (let i = 0; i < extraImages.length; i++) {
        extraImagesArray.push(extraImages[i].files[0]);
    }

    const datos = {
        product_name: document.getElementsByName("product_name")[0].value,
        product_description: document.getElementById('product_description').value,
        product_price: document.getElementById('product_price').value,
        product_image: document.getElementById("product_image").files[0],
        //product_extra_images: document.getElementsByName("product_extra_images[]")[0].files[0],
        product_extra_images: extraImagesArray,
    };

    crearProducte(urls, datos).then(response => {
        console.log(response);
        clickCarregarProductes();
        mostraMissatge('Producte creat correctament.', 'creat');

    }).catch(error => {
        console.error(error);
    });
}

const crearProducte = async (url, datos) => {
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  
      // Crear un objeto FormData para enviar la imagen y los demás datos del formulario
      const formData = new FormData();
      formData.append('product_name', datos.product_name);
      formData.append('product_description', datos.product_description);
      formData.append('product_price', datos.product_price);
      formData.append('product_image', datos.product_image);

      const extraImages = datos.product_extra_images;
      for (let i = 0; i < extraImages.length; i++) {
          formData.append('product_extra_images[]', extraImages[i]);
      }
  
      const respuesta = await fetch(url, {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': csrfToken
        },
        body: formData
      });
  
      const data = await respuesta.json();

      return data;
    } catch (error) {
        console.error(error);
        throw new Error('Error en la creación del producto');
    }
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
            consultaProductes(accio, producte.id, producte.product_name, producte.product_description, producte.product_price, producte.product_image);
        });
    } else if (accio == 'modificar') {
        
        producte = dades[0].data;
        const tipusFormulari = 'modificar';
        generaFormulari(tipusFormulari, producte.id, producte.product_name, producte.product_description, producte.product_price);
    
    } else if (accio == 'mostraUn') {
        producte = dades[0].data;
        origen = dades[0].origin;
        consultaProductes(accio, producte.id, producte.product_name, producte.product_description, producte.product_price, producte.product_image, origen, producte.product_extra_images);
        botoEnrere();
    }

}

function botoEnrere(){

    const botoVeure = document.getElementsByClassName("boto veure")[0];
    botoVeure.remove();

    const content = document.getElementById("content");
    const enrere = document.createElement('a');
    enrere.addEventListener("click", clickCarregarProductes);
    enrere.setAttribute('href', '#');
    enrere.setAttribute('class', 'boto normal');
    enrere.innerHTML = "Enrere";
    content.appendChild(enrere);
  
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

    const contenidor = document.createElement('div');
    contenidor.setAttribute('class', 'formulari');

    const formulari = document.createElement('form');
    const titol = document.createElement('h1');

    if (tipusFormulari == 'modificar')  {
        titol.innerHTML = 'Modificant producte';
        formulari.setAttribute('method', 'post');
    } else if ( tipusFormulari == 'crear'){
        formulari.setAttribute('method', 'post');
        titol.innerHTML = 'Creant nou producte';
    }

    content.appendChild(titol);

    formulari.appendChild(creaLabel('ID', 'product_id'));
    formulari.appendChild(creaInput('text', 'product_id', id ));

    formulari.appendChild(creaLabel('Nom', 'product_name'));
    formulari.appendChild(creaInput('text', 'product_name', nom ));

    formulari.appendChild(creaLabel('Descripcio', 'product_description'));
    formulari.appendChild(creaInput('textarea', 'product_description', descripcio ));

    formulari.appendChild(creaLabel('Preu', 'product_price'));
    formulari.appendChild(creaInput('number', 'product_price', preu ));

    formulari.appendChild(creaLabel('Imatge principal', 'product_image'));
    formulari.appendChild(creaInput('file', 'product_image', preu ));
    
    formulari.appendChild(creaLabel('Imatges Extra', 'product_extra_images'));
    formulari.appendChild(creaInput('arrayImatges', 'product_extra_images', preu ));

    const enrere = document.createElement('a');
    enrere.addEventListener("click", clickCarregarProductes);
    enrere.setAttribute('href', '#');
    enrere.setAttribute('class', 'boto normal');
    enrere.innerHTML = "Enrere";

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');

    if (tipusFormulari == 'modificar')  {
        submit.setAttribute('class', 'boto update');
        submit.setAttribute('id-producte', id);
        submit.innerHTML = "Guardar";
    } else if ( tipusFormulari == 'crear'){
        submit.setAttribute('class', 'boto crear');
        submit.innerHTML = "Crear";
        submit.addEventListener('click', requestCrear);
    }

    formulari.appendChild(enrere);
    formulari.appendChild(submit);

    content.appendChild(formulari);
}

function creaInput(tipus, id, contingut){

    let input;

    if (tipus == 'text' || tipus == 'number') {
        input = document.createElement('input');
        input.setAttribute('type', tipus);
        if (contingut == undefined) {
            input.setAttribute('value', '');
        } else {
            input.setAttribute('value', contingut);
        }

        if (id == 'product_id') {
            input.setAttribute('readonly', 'readonly')
            input.setAttribute('class', 'deshabilitat')
        } 

    } else if(tipus == 'textarea') {
        input = document.createElement('textarea');
        if (contingut == undefined) {
            input.setAttribute('value', '');
        } else {
            input.setAttribute('value', contingut);
            input.innerHTML = contingut;
        }
    } else if(tipus == 'file') {
        input = document.createElement('input');
        input.setAttribute('type', tipus);
        input.setAttribute('accept', 'image/*');
        if (contingut == undefined) {
            input.setAttribute('value', '');
        } else {
            input.setAttribute('value', contingut);
            input.innerHTML = contingut;
        }
    } else if(tipus == 'arrayImatges') {

        imatgesExtra = 3;
        tipus = 'file';

        inputs = document.createElement('div');
        inputs.setAttribute('class', 'imatges-extra')

        for (i = 0; i < imatgesExtra; i++) {
            input = document.createElement('input');
            input.setAttribute('type', tipus);
            input.setAttribute('name', id+"[]");
            input.setAttribute('id', id + i);
            input.setAttribute('accept', 'image/*');

            if (contingut == undefined) {
                input.setAttribute('value', '');
            } else {
                input.setAttribute('value', contingut);
                input.innerHTML = contingut;
            }
            inputs.appendChild(input);
        }

        return inputs;

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

function consultaProductes(accio, id, nom, descripcio, preu, rutaImatge, origen, imatgesExtra) {

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
    veure.setAttribute('accio', 'monstraUn');
    veure.setAttribute('class', 'boto veure');
    veure.addEventListener('click', clickVeure);

    modificar.setAttribute('href', '#');
    modificar.setAttribute('id-producte', id);
    modificar.setAttribute('accio', 'modificar');
    modificar.setAttribute('class', 'boto modificar');
    modificar.addEventListener('click', clickModificar);

    eliminar.setAttribute('href', '#');
    eliminar.setAttribute('id-producte', id);
    eliminar.setAttribute('accio', 'eliminar');
    eliminar.setAttribute('class', 'boto eliminar');
    eliminar.addEventListener('click', requestEliminar);

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

    if (accio == 'mostraUn') {

        const imgs = document.createElement('div');
        imgs.setAttribute('id', 'imatges');

        // Imatge principal
        const foto = document.createElement('img');
        foto.setAttribute("src", origen + "/" + rutaImatge);
        imgs.appendChild(foto);
       
        const jsonImatges = JSON.parse(imatgesExtra);
 
        for(i = 0; i < jsonImatges.length; i++) {
            const foto = document.createElement('img');
            foto.setAttribute("src", origen + "/" + jsonImatges[i]);
            imgs.appendChild(foto);
        }
        
        content.appendChild(imgs);
    }

}




