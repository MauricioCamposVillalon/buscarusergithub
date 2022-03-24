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

const getRepo = async (nombreUsuario, numero, pagina) => {
    return request(`users/${nombreUsuario}/repos?page=${numero}&per_page=${pagina}`);
}


const buscar = document.querySelector('#frmformulario');
buscar.addEventListener('submit', async (event) => {
    //const arreglousuar = [];
    //const arreglorepo = [];
    event.preventDefault();
    const nombreUsuario = document.querySelector('#nombre').value;
    const numeroPagina = document.querySelector('#pagina').value;
    const repoPagina = document.querySelector('#repoPagina').value;
    // const usuario  = await getUser(nombreUsuario);
    // arreglousuar.push(usuario);
    // const repositorio = await getRepo(nombreUsuario,numeroPagina,repoPagina);
    //  arreglorepo.push(repositorio);
    if (nombreUsuario === '' || numeroPagina === '' || repoPagina === '') {
        alert(`Debe llenar los campos antes de presionar enviar`);
    } else {
        Promise.all([getUser(nombreUsuario), getRepo(nombreUsuario, numeroPagina, repoPagina)]).then(promesas => {
            let formato = document.querySelector('#resultados');
            if ((promesas[0].name === null) || (promesas[0].name === undefined)) {
                throw new Error(`El usuario con nombre ${nombreUsuario}, no se encuentra`);
            } else {
                console.log(promesas[0].name);
                console.log(promesas[1][0].name);
                formato.innerHTML = `<div class="container col-12 col-sm-10 text-center">
                <div class="card-deck">
                <div class="card">
                <div class="card-header text-white bg-info mb-3 text-center"><h3>Datos Usuario</h3></div>
                <img src=${promesas[0].avatar_url} class="logo mx-auto">
                  <div class="card-body">
                    <ul>
                        <li class="text-left"><b>Nombre de Usuario : </b>${promesas[0].name}</li>
                        <li class="text-left">Nombre de Login : ${promesas[0].login}</li>
                        <li class="text-left">Cantidad de Repositorios : ${promesas[0].public_repos}</li>
                        <li class="text-left">Localidad : ${promesas[0].location}</li>
                        <li class="text-left">Tipo de usuario : ${promesas[0].type}</li>
                    </ul>
                  </div>
                </div>
                <div class="card">
                    <div class="card-header text-white bg-info mb-3 text-center">Datos Usuario</div>
                  <div class="card-body">
                    <ul>
                        <li>aqui el nombre</li>
                        <li>aqui el nombre</li>
                    </ul>
                  </div>
                </div>
              </div>`

            }
        });
    }

});