@extends('dashboard.layout')
@section('title', 'Product Index')
@section('content')
<div class="titol-pagina">
    <h2>Index de Productos</h2>
</div>

@if ($message = Session::get('success'))
    <div class="missatge correcte">
        <span>{{ $message }}</span>
    </div>
@endif

<div class="taula-productes">
    <table>
       <tr>
           <th>ID</th>
           <th>Nombre</th>
           <th>Descripcion</th>
           <th>Precio</th>
           <th width="180px">Opciones</th>
       </tr>
       <tbody class="entrades">

       </tbody>
   </table>
</div>

@endsection

<script>

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
const mostraDades = (dades) => {
    $productes = dades[0].data.data;

    console.log($productes);

    $productes.forEach((producte) => {
        afegeixProducte(producte.id, producte.product_name, producte.product_description, producte.product_price);
    });

    /*const deleteButtons = document.querySelectorAll('.boto-eliminar');
    deleteButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const productId = button.getAttribute('id-producte');
            // Enviar petició d'eliminació
            fetch(`/dashboard/product/delete/${productId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                }
            })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    throw new Error('Error en la respuesta de la petición de eliminación');
                }
            })
            .catch(error => {
                console.error(error);
            });
        });
    });*/

}

const carregarMultiplesDades = async (...urls) => {
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

// Cridem a la funció asíncrona. Afegim el .then perque ens retorni en comptes de la promesa les dades.
const dades = carregarMultiplesDades("http://apis-laravel.test/api/products").then(dades => {
    mostraDades(dades);
});


function afegeixProducte(id, nom, descripcio, preu) {
    const entrades = document.getElementsByClassName("entrades")[0];
    const tr = document.createElement('tr');
    const tdid = document.createElement('td');
    const tdna = document.createElement('td');
    const tdde = document.createElement('td');
    const tdpr = document.createElement('td');
    const tdac =  document.createElement('td');

    tdid.innerHTML = id;
    tdna.innerHTML = nom;
    tdde.innerHTML = descripcio;
    tdpr.innerHTML = preu;

    const formulari =  document.createElement('form');

    formulari.setAttribute('method', 'POST');
    formulari.setAttribute('action', `/dashboard/product/delete/` + id);

    // Afegim el camp CSRF
    /*const tokenField = document.createElement('input');
    tokenField.setAttribute('type', 'hidden');
    tokenField.setAttribute('name', '_token');
    tokenField.setAttribute('value', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
    formulari.appendChild(tokenField);*/

    const veure =  document.createElement('a');
    const modificar =  document.createElement('a');
    const eliminar =  document.createElement('button');
    

    veure.setAttribute('href', '/dashboard/product/show/' + id);
    modificar.setAttribute('href', '/dashboard/product/' + id + '/edit/');
    eliminar.setAttribute('href', '/dashboard/product/delete/' + id);
    eliminar.setAttribute('type', 'submit');
    eliminar.setAttribute('class', 'boto-eliminar');
    eliminar.setAttribute('id-producte', id);

    veure.innerHTML = "Veure"
    modificar.innerHTML = "Editar"
    eliminar.innerHTML = "Eliminar"

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


</script>
