inicia();

function inicia() {
    generaCRUD();
}

async function generaCRUD() {
    neteja();
    generaCRUDTitol();
    generaCRUDControls();
    await generaCRUDTaula(); // esperem a que la taula es generi abans de carregar els productes
    carregaProductes();
}


async function generaGaleria() {
    neteja();
    generaGaleriaTitol();
    generaGaleriaControls();
    await generaGaleriaTaula();
    carregaImatges();
}

function neteja() {
    content.innerHTML = "";
}

function netejaTaula() {
    const entradesTaula = document.getElementById("entrades");
    entradesTaula.innerHTML = "";
}

function generaCRUDTitol() {
    const titol = document.createElement('h1');
    titol.innerHTML = 'CRUD - API';
    content.appendChild(titol);
}

function generaCRUDControls() {

    const controlsWrapper = document.createElement('div');
    controlsWrapper.setAttribute('class', 'controls-crud');

    const crear = document.createElement('a');
    crear.setAttribute('href', '#');
    crear.setAttribute('class', 'boto crear');
    crear.setAttribute('accio', 'crear');
    crear.innerHTML = 'Crear Producte';
    crear.addEventListener('click', clickCrear);

    const veureGaleria = document.createElement('a');
    veureGaleria.setAttribute('href', '#');
    veureGaleria.setAttribute('class', 'boto veure');
    veureGaleria.setAttribute('accio', 'veure');
    veureGaleria.innerHTML = 'Veure galeria';
    veureGaleria.addEventListener('click', generaGaleria);
    

    const missatge = document.createElement('div');
    missatge.setAttribute('id', 'missatge');
    missatge.setAttribute('class', 'missatge');
    missatge.style.display = 'none';

    const columna1 = document.createElement('div');
    columna1.setAttribute('class', 'columna col-9');
    columna1.appendChild(missatge);

    const columna2 = document.createElement('div');
    columna2.setAttribute('class', 'columna col-3');
    columna2.appendChild(veureGaleria);
    columna2.appendChild(crear);

    controlsWrapper.appendChild(columna1);
    controlsWrapper.appendChild(columna2);
    content.appendChild(controlsWrapper);

}

async function generaCRUDTaula() {
    return new Promise((resolve, reject) => {
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
        const capImg = document.createElement('th');
        capImg.innerHTML = 'Imatge';
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
        cap.appendChild(capImg);
        cap.appendChild(capNo);
        cap.appendChild(capDe);
        cap.appendChild(capPr);
        cap.appendChild(capOp);

        taula.appendChild(cosTaula);

        resolve(); //Un cop generada la taula cridem resolve per indicar  que ha acabat

    });
}


function generaGaleriaTitol() {
    const titol = document.createElement('h1');
    titol.innerHTML = 'Galeria d\'Imatges';
    content.appendChild(titol);
}

function generaGaleriaControls() {
    const controlsWrapper = document.createElement('div');
    controlsWrapper.setAttribute('class', 'controls-crud');

    const missatge = document.createElement('div');
    missatge.setAttribute('id', 'missatge');
    missatge.setAttribute('class', 'missatge');
    missatge.style.display = 'none';

    const novaImatge = document.createElement('a');
    novaImatge.setAttribute('href', '#');
    novaImatge.setAttribute('class', 'boto crear');
    novaImatge.setAttribute('accio', 'crear');
    novaImatge.innerHTML = 'Afegir imatges';
    novaImatge.addEventListener('click', clickNovaImatge);

    const columna1 = document.createElement('div');
    columna1.setAttribute('class', 'columna col-9');
    columna1.appendChild(missatge);

    const columna2 = document.createElement('div');
    columna2.setAttribute('class', 'columna col-3');
    columna2.appendChild(novaImatge);

    controlsWrapper.appendChild(columna1);
    controlsWrapper.appendChild(columna2);
    content.appendChild(controlsWrapper);
}

async function generaGaleriaTaula() {
    return new Promise((resolve, reject) => {

        const galeriaWrapper = document.createElement('div');
        galeriaWrapper.setAttribute("id", "image-mosaic");

        content.appendChild(galeriaWrapper);

        const enrere = document.createElement('a');
        enrere.addEventListener("click", inicia);
        enrere.setAttribute('href', '#');
        enrere.setAttribute('class', 'boto normal');
        enrere.innerHTML = "Enrere";
        content.appendChild(enrere);

        resolve();
    });
}

async function carregaProductes() {
    try {
        const dades = await consultarDadesAPI("http://apis-laravel.test/api/products");
        // Passem les dades obtingudes a la funció per gestionar les dades
        const accio = 'mostraTotsProductes';
        gestionaDades(dades, accio);
    } catch (error) {
        console.error(error);
    }
}

async function carregaImatges() {
    await consultarDadesAPI("http://apis-laravel.test/api/images").then(function (dades) {
        // Passem les dades obtingudes a la funció per gestionar les dades
        const accio = 'galeriaTota';
        gestionaDades(dades, accio);
    });
}

function previewImatge() {
    const inputImg = document.getElementById('inputImg');
    const img = document.getElementById('img-preview');
    const [file] = inputImg.files;
    if (file) {
        img.src = URL.createObjectURL(file);
    }
}

function carregaProducteIndividual(event) {
    const id = event.currentTarget.getAttribute('id-element');
    consultarDadesAPI("http://apis-laravel.test/api/products/" + id).then(function (dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'mostraUnProducte';
        gestionaDades(dades, accio, id);
    });
    //mostraMissatge('Producte modificat.', 'modificats');
}

function modificarProducte(event) {
    const id = event.currentTarget.getAttribute('id-element');
    consultarDadesAPI("http://apis-laravel.test/api/products/" + id).then(function (dades) {
        // Passem les dades obtingudes a la funció de visualización
        const accio = 'modificarProducte';
        gestionaDades(dades, accio, id);
    });
    //mostraMissatge('Producte modificat.', 'modificats');
}

function clickCrear() {
    const tipusFormulari = 'crear';
    generaFormulari(tipusFormulari);
};

function clickNovaImatge() {
    const tipusFormulari = 'novaImatge';
    generaFormulari(tipusFormulari);
};

function eliminarProducte(event) {
    const id = event.currentTarget.getAttribute('id-element');
    requestEliminar("http://apis-laravel.test/api/products/" + id).then(function (dades) {
        carregaProductes();
        mostraMissatge('Producte eliminat.', 'eliminat');
    });
}

function requestCrear(event) {
    event.preventDefault();

    const urls = ["http://apis-laravel.test/api/products"];

    const datos = {
        product_name: document.getElementsByName("product_name")[0].value,
        product_description: document.getElementById('product_description').value,
        product_price: document.getElementById('product_price').value
    };

    crearProducte(urls, datos)
    .then(response => {
        generaCRUD();
        mostraMissatge('Producte creat correctament.', 'creat');
    })
    .catch(error => {
        console.error(error);
    });
}

function requestPujarImatge(event) {
    event.preventDefault();

    const urls = ["http://apis-laravel.test/api/images"];

    const datos = {
        product_image: document.getElementById("inputImg").files[0]
    };

    crearImatge(urls, datos)
    .then(response => {
        generaGaleria();
        mostraMissatge('Imatge pujada correctament.', 'creat');
    })
    .catch(error => {
        console.error(error);
    });
}

const crearImatge = async (url, datos) => {
    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const formData = new FormData();
        formData.append('image_file', datos.product_image);


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
        throw new Error('Error en la subida de imagen.');
    }
};

const crearProducte = async (url, datos) => {
    try {

        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const formData = new FormData();

        formData.append('product_name', datos.product_name);
        formData.append('product_description', datos.product_description);
        formData.append('product_price', datos.product_price);

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

function mostraMissatge(text, resposta) {
    const msg = document.getElementById('missatge');
    msg.innerHTML = text;
    msg.setAttribute('class', 'msg ' + resposta);
    msg.style.display = '';
}

// Funció que mostres les dades de la promesa que se li passa
const gestionaDades = (dades, accio, id) => {

    if (accio == 'mostraTotsProductes') {

        const productes = dades[0].product_data;
        const origen = dades[0].origin;

        console.log(productes);

        productes.forEach((producte) => {
            //console.log(producte);
            consultaProductes(accio, producte.id, producte.product_name, producte.product_description, producte.product_price, producte.product_main_image, producte.product_images, origen);
        });


    } else if (accio == 'modificarProducte') {

        //producte = dades[0].data;
        //const tipusFormulari = 'modificarProducte';
        //generaFormulari(tipusFormulari, producte.id, producte.product_name, producte.product_description, producte.product_price, producte.product_image, producte.product_extra_images);
        
        console.log(dades);

        const producte = dades[0].product_data;
        const origen = dades[0].origin;

        console.log(producte);
        
        generaFormulari(accio, producte.id, producte.product_name, producte.product_description, producte.product_price, producte.product_main_image, producte.product_images, origen);


    } else if (accio == 'mostraUnProducte') {

        netejaTaula();
        const producte = dades[0].product_data;
        const origen = dades[0].origin;
        consultaProductes(accio, producte.id, producte.product_name, producte.product_description, producte.product_price, producte.product_main_image, producte.product_images, origen);
        
        botoEnrere();

    }  else if (accio == 'galeriaTota') {

        imatges = dades[0].data.data;
        origen = dades[0].origin;
        imatges.forEach((imatge) => {
            consultaImatges(accio, imatge.id, imatge.image_file, imatge.image_name, origen);
        });

    }

}

function botoEnrere() {

    const botoVeure = document.getElementsByClassName("boto veure")[0];
    botoVeure.remove();

    const enrere = document.createElement('a');
    enrere.addEventListener("click", inicia);
    enrere.setAttribute('href', '#');
    enrere.setAttribute('class', 'boto normal');
    enrere.innerHTML = "Enrere";
    content.appendChild(enrere);

}

const consultarDadesAPI = async (...urls) => {
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

const requestEliminar = async (...urls) => {

    try {
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const arrayFetch = urls.map((url) => fetch(url, {
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




function generaFormulari(tipusFormulari, id, nom, descripcio, preu, imagePrincipal, imatgesExtra, origen) {

    neteja();

    const contenidor = document.createElement('div');
    contenidor.setAttribute('class', 'formulari');

    const formulari = document.createElement('form');
    const titol = document.createElement('h1');

    if (tipusFormulari == 'modificarProducte') {
        titol.innerHTML = 'Modificant producte';
        formulari.setAttribute('method', 'post');
    } else if (tipusFormulari == 'crear') {
        formulari.setAttribute('method', 'post');
        titol.innerHTML = 'Creant nou producte';
    } else if (tipusFormulari == 'novaImatge') {
        formulari.setAttribute('method', 'post');
        titol.innerHTML = 'Afegir nova imatge';
    }

    content.appendChild(titol);

    if (tipusFormulari == 'modificarProducte' || tipusFormulari == 'crear') {

        formulari.appendChild(creaLabel('ID', 'product_id'));
        formulari.appendChild(creaInput('text', 'product_id', id));

        formulari.appendChild(creaLabel('Nom', 'product_name'));
        formulari.appendChild(creaInput('text', 'product_name', nom));

        formulari.appendChild(creaLabel('Descripcio', 'product_description'));
        formulari.appendChild(creaInput('textarea', 'product_description', descripcio));

        formulari.appendChild(creaLabel('Preu', 'product_price'));
        formulari.appendChild(creaInput('number', 'product_price', preu));

        const wrapImgInput = document.createElement('div');
        wrapImgInput.setAttribute('class', 'wrapFromImgs');

        const col1 = document.createElement('div'); 
        col1.setAttribute('class', 'span-6');

        console.log('imagePrincipal');
        console.log(imagePrincipal);

        if  (tipusFormulari == 'mostraUnProducte') {
            const main_img = document.createElement('img'); 
            main_img.setAttribute('src', origen + '/' + imagePrincipal.file);
            main_img.setAttribute('class', 'preview-form');
            col1.appendChild(main_img);
        }

        const col2 = document.createElement('div'); 
        col2.setAttribute('class', 'span-6');

        wrapImgInput.appendChild(col1);
        wrapImgInput.appendChild(col2);

        col2.appendChild(creaLabel('Imatge principal', 'product_main_image'));
        col2.appendChild(creaInput('number', 'product_main_image', imagePrincipal));

        formulari.appendChild(wrapImgInput);
        
    } else if (tipusFormulari == 'novaImatge') {

        formulari.appendChild(creaLabel('Selecciona la imatge que vols pujar:', 'imatge'));
        formulari.appendChild(creaInput('imatge', 'imatge', preu));

        const caixaPreview = document.createElement('div');
        caixaPreview.setAttribute('class', 'caixa-preview-img');
        const imatgePreview = document.createElement('img');
        imatgePreview.setAttribute('id', 'img-preview')

        caixaPreview.appendChild(imatgePreview);

        formulari.appendChild(caixaPreview);

    }

    const enrere = document.createElement('a');
    enrere.addEventListener("click", inicia);
    enrere.setAttribute('href', '#');
    enrere.setAttribute('class', 'boto normal');
    enrere.innerHTML = "Enrere";

    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');

    if (tipusFormulari == 'modificarProducte') {
        submit.setAttribute('class', 'boto update');
        submit.setAttribute('id-element', id);
        submit.innerHTML = "Guardar";
    } else if (tipusFormulari == 'crear') {
        submit.setAttribute('class', 'boto crear');
        submit.innerHTML = "Crear";
        submit.addEventListener('click', requestCrear);
    } else if (tipusFormulari == 'novaImatge') {
        submit.setAttribute('class', 'boto crear');
        submit.innerHTML = "Pujar imatge";
        submit.addEventListener('click', requestPujarImatge);
    }

    formulari.appendChild(enrere);
    formulari.appendChild(submit);

    content.appendChild(formulari);
}

function creaInput(tipus, id, contingut) {

    let input;

    if (tipus == 'text' || tipus == 'number') {
        input = document.createElement('input');
        input.setAttribute('type', tipus);
        if (contingut == undefined) {
            input.setAttribute('value', '');
        } else {
            input.setAttribute('value', contingut.id);
        }

        if (id == 'product_id') {
            input.setAttribute('readonly', 'readonly')
            input.setAttribute('class', 'deshabilitat')
        }

    } else if (tipus == 'textarea') {
        input = document.createElement('textarea');
        if (contingut == undefined) {
            input.setAttribute('value', '');
        } else {
            input.setAttribute('value', contingut);
            input.innerHTML = contingut;
        }
    } else if (tipus == 'file') {
        input = document.createElement('input');
        input.setAttribute('type', tipus);
        input.setAttribute('accept', 'image/*');
        if (contingut == undefined) {
            input.setAttribute('value', '');
        } else {
            input.setAttribute('value', contingut);
            input.innerHTML = contingut;
        }
    } else if (tipus == 'imatge') {
        tipus = 'file';
        input = document.createElement('input');
        input.setAttribute('type', tipus);
        input.setAttribute('accept', 'image/*');

        input.addEventListener('change', previewImatge);

        if (contingut == undefined) {
            input.setAttribute('value', '');
        } else {
            input.setAttribute('value', contingut);
            input.innerHTML = contingut;
        }

        input.setAttribute('id', 'inputImg');
        input.setAttribute('name', id);
        return input;

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

function creaLabel(contingut, forlabel) {
    const label = document.createElement('label');
    label.setAttribute('for', forlabel)
    label.innerHTML = contingut;
    return label;
}

function consultaImatges(accio, id, rutaImatge, nomImatge, origen) {

    const graella = document.getElementById("image-mosaic");

    const wrapImatge = document.createElement("div");
    //wrapImatge.setAttribute("href", "#" + rutaImatge);
    wrapImatge.setAttribute("class", "wrapperImatge");
    
    const cartaImatge = document.createElement("div");
    cartaImatge.style.backgroundImage = 'url(\'' + origen + "/" + rutaImatge + '\')';
    cartaImatge.setAttribute('class', 'card');

    wrapImatge.appendChild(cartaImatge);
    //graella.appendChild(wrapImatge);


    const veure = document.createElement('a');
    const eliminar = document.createElement('a');

    veure.setAttribute('href', '#');
    veure.setAttribute('id-element', id);
    veure.setAttribute('accio', 'mostraUnaImatge');
    veure.setAttribute('class', 'boto veure');
    veure.addEventListener('click', carregaImatgeIndividual);

    eliminar.setAttribute('href', '#');
    eliminar.setAttribute('id-element', id);
    eliminar.setAttribute('accio', 'eliminar');
    eliminar.setAttribute('class', 'boto eliminar');
    eliminar.addEventListener('click', eliminarImatge);

    veure.innerHTML = "Veure"
    eliminar.innerHTML = "Eliminar "

    wrapImatge.appendChild(veure);
    wrapImatge.appendChild(eliminar);

    graella.appendChild(wrapImatge);

}

function carregaImatgeIndividual() {

}

/*function modificarImatge() {
    
}*/

function eliminarImatge() {
    
}

function consultaProductes(accio, id, nom, descripcio, preu, imatgePrincipal, imatgesExtra, origen) {


    console.log(imatgePrincipal);
    console.log(imatgesExtra);


    const entrades = document.getElementById("entrades");
    const tr = document.createElement('tr');

    tr.setAttribute("class", "entrada-taula");

    const tdid = document.createElement('td');
    const tdim = document.createElement('td');
    const tdna = document.createElement('td');
    const tdde = document.createElement('td');

    tdde.setAttribute('class', 'producteDescripcio');

    const tdpr = document.createElement('td');
    const tdac = document.createElement('td');

    const imatgeProducte = document.createElement('img');
    imatgeProducte.setAttribute('src', origen + "/" + imatgePrincipal.file)
    imatgeProducte.setAttribute('class', 'imatge-index')
    tdim.appendChild(imatgeProducte);

    tdid.innerHTML = id;
    //tdim.innerHTML = origen + "/" + imatgePrincipal.file;
    tdna.innerHTML = nom;
    tdde.innerHTML = descripcio;
    tdpr.innerHTML = preu;

    const veure = document.createElement('a');
    const modificar = document.createElement('a');
    const eliminar = document.createElement('a');

    veure.setAttribute('href', '#');
    veure.setAttribute('id-element', id);
    veure.setAttribute('accio', 'mostraUnProducte');
    veure.setAttribute('class', 'boto veure');
    veure.addEventListener('click', carregaProducteIndividual);

    modificar.setAttribute('href', '#');
    modificar.setAttribute('id-element', id);
    modificar.setAttribute('accio', 'modificarProducte');
    modificar.setAttribute('class', 'boto modificar');
    modificar.addEventListener('click', modificarProducte);

    eliminar.setAttribute('href', '#');
    eliminar.setAttribute('id-element', id);
    eliminar.setAttribute('accio', 'eliminar');
    eliminar.setAttribute('class', 'boto eliminar');
    eliminar.addEventListener('click', eliminarProducte);

    veure.innerHTML = "Veure "
    modificar.innerHTML = "Modificar "
    eliminar.innerHTML = "Eliminar "

    tr.appendChild(tdid);
    tr.appendChild(tdim);
    tr.appendChild(tdna);
    tr.appendChild(tdde);
    tr.appendChild(tdpr);
    tr.appendChild(tdac);

    tdac.appendChild(veure)
    tdac.appendChild(modificar)
    tdac.appendChild(eliminar)

    entrades.appendChild(tr);

    if (accio == 'mostraUnProducte') {

        const imgs = document.createElement('div');
        imgs.setAttribute('id', 'imatges');

        // Imatge principal
        const foto = document.createElement('img');
        foto.setAttribute("src", origen + "/" + imatgePrincipal.file);
        foto.setAttribute("class", "imatge-principal");
        foto.setAttribute("id", imatgePrincipal.file);
        imgs.appendChild(foto);

        for (i = 0; i < imatgesExtra.length; i++) {
            if (imatgesExtra[i].id != imatgePrincipal.id) {
                const foto = document.createElement('img');
                foto.setAttribute("src", origen + "/" + imatgesExtra[i].file);
                foto.setAttribute("class", "imatge-secundaria numero-" + i);
                imgs.appendChild(foto);
            }
        }
        content.appendChild(imgs);
    }

}




