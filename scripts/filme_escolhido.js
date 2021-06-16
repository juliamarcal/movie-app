const API_KEY = '4aec08d6a063f531b3aa5dfd47796e60';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const populares = document.getElementById('filmes_populares');
const lancamentos = document.getElementById('filmes_lancamentos');
const aclamados_criticas = document.getElementById('filmes_aclamados_pela_critica');
const mais_info = document.getElementById("mais_info");
const filme_escolhido = document.getElementById("filme_escolhido_conteudo");

passar_filme_escolhido(id);

function passar_filme_escolhido(id){
    const URL_info = `https://api.themoviedb.org/3/movie/${id}?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br`;
    console.log(URL_info);
    pegar_info_filme_escolhido(URL_textos);
}

function pegar_info_filme_escolhido(url){
    fetch(url).then(res => res.json()).then(data => {
        mostrar_filme_escolhido(data);
 })
}

function mostrar_filme_escolhido(data){
    filme_escolhido.innerHTML = '';

        console.log("dados mostrar info: "+ data);//undefined
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('row conteudo');
        movieEl.innerHTML = `
            <div class="col-12 titulo">
                <h1>${data.title}</h1>
            </div>
            <div class="col-12 col-sm-3 info">
                <div class="row poster">
                    <img src="${IMG_URL + data.poster_path}" alt="">
                </div>
                <p><b>Avaliação: </b> ${data.vote_avarage}</p>
                <p><b>Estreia: </b> ${data.release_date}</p>
                <p><b>Idioma original: </b> ${data.original_language}</p>
            </div>
            <div class="col-12 col-sm-9 texto">
                <div class="row sinopse">
                    <h2>Sinópse:</h2>
                    <p>${data.overview}</p>
                </div>
            </div>
        `
        filme_escolhido.appendChild(movieEl);
    
}