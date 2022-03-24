const baseURL = 'https://api.github.com/';

const request = async (direccion) => {
    const resultado = await fetch(`${baseURL}${direccion}`);
    const respuesta = await resultado.json();
    console.log(respuesta);
    return respuesta;
}

const getUser = async (nombreUsuario) => {
    return request(`users/${nombreUsuario}`);
}

const getRepo = async (usuario, numero, pagina) => {
    return request(`users/${usuario}/repos?page=${numero}&per_page=${pagina}`);
}


const buscar = document.querySelector('#frmformulario');
buscar.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombreUsuario = document.querySelector('#nombre').value;
    const numeroPagina = document.querySelector('#pagina').value;
    const repoPagina = document.querySelector('#repoPagina').value;
    const falla = `${nombreUsuario} no se reconoce como usuario`;
    if (nombreUsuario === '' || numeroPagina === '' || repoPagina === '') {
        alert(`Debe llenar los campos antes de presionar enviar`);
    } else {
        Promise.all([getUser(nombreUsuario), getRepo(nombreUsuario, numeroPagina, repoPagina)]).then(promesas => {
            let formato = document.querySelector('#resultados');
            if (promesas[0].name === null) {
                throw new Error(falla);
            } else {
                formato.innerHTML = `<div class="container col-12 col-sm-10 text-center">
                <div class="card-deck">
                <div class="card">
                <div class="card-header text-white bg-info mb-3 text-center"><h3>Datos Usuario</h3></div>
                <img src=${promesas[0].avatar_url} class="logo mx-auto">
                  <div class="card-body">
                    <ul class="mx-2">
                        <li class="text-left"><b>Nombre de Usuario : </b>${promesas[0].name}</li>
                        <li class="text-left"><b>Nombre de Login : </b>${promesas[0].login}</li>
                        <li class="text-left"><b>Cantidad de Repositorios : </b>${promesas[0].public_repos}</li>
                        <li class="text-left"><b>Localidad : </b>${promesas[0].location}</li>
                        <li class="text-left"><b>Tipo de usuario : </b>${promesas[0].type}</li>   
                    </ul>
                  </div>
                </div>
                <div class="card">
                    <div class="card-header text-white bg-info mb-3 text-center"><h3>Nombre Repositorio</h3></div>
                  <div class="card-body">
                    <div id="datRepo" class="text-left">
                    </div>
                  </div>
                </div>
              </div><br> `
              promesas[1].forEach( (dato,i) => 
                $('#datRepo').append(`<b>Repositorio N° ${i+1}</b>&nbsp&nbsp<a href="${dato.html_url}" target="_black" > ${dato.name}</a><br>`));
            }
        })
        .catch (fal => alert(falla));
    }
});