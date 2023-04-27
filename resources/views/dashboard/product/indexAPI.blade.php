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
       <tbody id="entrades">

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

// Fem diverses peticions.
/*obtenirDades("http://apis-laravel.test/api/products")
.then(response => {
    console.log(response.data['data'])
    response.data['data'].forEach(imprimeix);

});*/

/*function imprimeix(value) {
    console.log(value);
    let cataleg = document.getElementById('entrades');
    const item = document.createElement('p');
    item.innerHTML = value.id;

    console.log(item);

    cataleg.appendChild(item);
}*/

// Funció que mostres les dades de la promesa que se li passa
const mostraDades = (dades) => {
    dades.data.data.forEach((item) => {
        console.log(item.id, item.product_name, item.product_price);
    });
}

/*jsonData.data.forEach((item) => {
  console.log(item.id, item.name);
});*/

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

// Cridem a la funció asíncrona 1a versió:
const dades = carregarMultiplesDades("http://apis-laravel.test/api/products").then(dades => {
    mostraDades(dades);
});

// Cridem a la funció asíncrona 2a versió:
/*const dades2 = carregarMultiplesDades2("http://apis-laravel.test/api/products").then(dades => {
    mostraDades(dades);
});
*/

    /*const getFirstUserData = async () => {
        // Obtenim la llista d'usuaris:
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json(); // parse JSON
        
        console.log(response);

        // Agafem el primer usuari de la llista que esn ha tornat la petició:
        const user = users[0];
    
        // Obtenim les dades de l'usuari:
        const userResponse = await fetch(`http://apis-laravel.test/api/products/1`);
        const userData = await userResponse.json(); // parse JSON
    
        return userData; // Estem retornant una promesa.
    };
    
    const getUserDataWithAsyncAwait = async () => {
        const result = await getFirstUserData();
        console.log(result); // Des d'aquí podem mostrar el contingut obtingut mitjançant la funció asíncrona.

        

    };
    
    getUserDataWithAsyncAwait().then(res => console.log(res)); // Resultat: {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz', address: {…}, …}
*/

    /*const
    getUserDataWithAsyncAwait()
            .then(response => response)
            .then(data => {
                data.forEach(product => {

                const imatge = document.createElement('a');
                imatge.setAttribute('data-pswp-width', image.width);
                imatge.setAttribute('data-pswp-height', image.height);
                imatge.setAttribute('href', image.src);

                const portada = document.createElement('div');
                portada.setAttribute("style", "background-image: url(\'" + image.src + "\')");
                portada.setAttribute('class', 'card');

                imatge.appendChild(portada);
                gallery.appendChild(imatge);
   
                });
            });*/

</script> 

