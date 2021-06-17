const API_KEY = '4aec08d6a063f531b3aa5dfd47796e60';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const filme_escolhido = document.getElementById("filme_escolhido_info");
const avaliacoes = document.getElementById("filme_escolhido_avaliacoes");


pegar_id();

function pegar_id(){
    var id_filme = localStorage.getItem('id_do_filme');
    passar_filme_escolhido(id_filme);
    passar_avaliacoes(id_filme);
}

//informações
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
    console.log(data);

        const movieEl = document.createElement(`div`);
        movieEl.classList.add('informacoes');
        movieEl.innerHTML = `
        <div class="row conteudo">
            <div class="col-12 col-sm-4 info">
                <div class="row poster">
                    <img src="${IMG_URL + data.poster_path}" alt="">
                </div>
                <p><b>Avaliação: </b> ${data.vote_average}</p>
                <p><b>Popularidade: </b> ${data.popularity}</p>
                <p><b>Estreia: </b> ${data.release_date}</p>
                <p><b>Idioma original: </b> ${data.original_language}</p>
                <p><b>Lucro: </b> ${data.revenue}</p>
                <a href ="https://www.themoviedb.org/movie/${data.id}">Informações retiradas do site The Movie DB</a>
            </div>
            <div class="col-12 col-sm-8 texto">
                <div class="col-12 titulo">
                    <h1>${data.title}</h1>
                    <p>${data.tagline}</p>
                </div>
                <div class="row sinopse">
                    <p><b>sinópse: </b>${data.overview}</p>
                </div>
            </div>
        </div>
        `
        filme_escolhido.appendChild(movieEl);
    
}


//avaliações
function passar_avaliacoes(id){
    const URL_info = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&page=1`;
    pegar_avaliacao(URL_info);
}
function pegar_avaliacao(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
     mostrar_avaliacao(data.results);
    })
}
function mostrar_avaliacao(data){
    avaliacoes.innerHTML = '';

    data.forEach(movie => {
        const{author, rating, content, author_details} = movie;
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('avaliacao_item');
        movieEl.innerHTML = `
        <div class="col-12">
            <h3><b>${author}</b> - nota: ${author_details.rating}</h3>
            <p>${content}</p>
        </div>
        `
        avaliacoes.appendChild(movieEl);
        
    })
}