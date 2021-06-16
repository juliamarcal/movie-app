const API_KEY = '4aec08d6a063f531b3aa5dfd47796e60';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const populares = document.getElementById('filmes_populares');
const lancamentos = document.getElementById('filmes_lancamentos');
const aclamados_criticas = document.getElementById('filmes_aclamados_pela_critica');
const mais_info = document.getElementById("mais_info");
const filme_escolhido = document.getElementById("filme_escolhido_conteudo");

pegar_id();

function pegar_id(){
    var id_filme = localStorage.getItem('id_do_filme');
    passar_filme_escolhido(id_filme);
}


function passar_filme_escolhido(id){
    const URL_info = `https://api.themoviedb.org/3/movie/${id}?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br`;
    pegar_info_filme_escolhido(URL_info);
}

function pegar_info_filme_escolhido(url){
    fetch(url).then(res => res.json()).then(data => {
        mostrar_filme_escolhido(data);
 })
}

function mostrar_filme_escolhido(data){
    filme_escolhido.innerHTML = '';

        const movieEl = document.createElement(`div`);
        movieEl.classList.add('informacoes');
        movieEl.innerHTML = `
        <div class="row conteudo">
            <div class="col-12 titulo">
                <h1>${data.title}</h1>
            </div>
            <div class="col-12 col-sm-5 info">
                <div class="row poster">
                    <img src="${IMG_URL + data.poster_path}" alt="">
                </div>
                <p><b>Avaliação: </b> ${data.vote_average}</p>
                <p><b>Estreia: </b> ${data.release_date}</p>
                <p><b>Idioma original: </b> ${data.original_language}</p>
            </div>
            <div class="col-12 col-sm-7 texto">
                <div class="row sinopse">
                    <h2>Sinópse:</h2>
                    <p>${data.overview}</p>
                </div>
            </div>
        </div>
        `
        filme_escolhido.appendChild(movieEl);
    
}