const API_KEY = 'api_key=4aec08d6a063f531b3aa5dfd47796e60';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+ API_KEY + "&language=pt-br";

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');


function getMovies(url) {
  lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results)
        if(data.results.length !== 0){
            showMovies(data.results);
        }else{
            main.innerHTML= `<h1 class="no-results">Resultados não encontrados, tente pesquisar outra palavra...</h1>`
        }
       
    })

}


function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
      const{poster_path, title, overview, vote_average, id} = movie;
      const movieEl = document.createElement(`div`);
      movieEl.classList.add('item_pesquisa');
      movieEl.innerHTML = `
      <div class="col-12">
        <h1 class="titulo">${title}</h1>
      </div>
      <div class="col-12 poster">
        <img src="${IMG_URL + poster_path}" alt="">
      </div>
      <div class=" col-12 info">
        <p><b>Avaliação: </b> ${vote_average}</p>
      </div>
      <div class="col-12">
        <p><b>Sinopse: </b>${overview}
        <a href="https://www.themoviedb.org/movie/${id}">ler mais ...</a></p>
      </div>
      `
      main.appendChild(movieEl);
      
  })
}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    getMovies(searchURL+'&query='+searchTerm)
})






























/*
const form = document.getElementById('form');
const search = document.getElementById('search_bar');
const main = document.getElementById('main');
const IMG_URL = 'https://image.tmdb.org/t/p/w500';


form.addEventListener("submit", executaPesquisa);


function executaPesquisa() {
    var pesquisa = search.value;
    console.log(pesquisa);
    const pesquisa_URL = `https://api.themoviedb.org/3/search/movie?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&query=${pesquisa}&page=1&include_adult=false`;
    getMovies(pesquisa_URL);
}



function getMovies(url){
  console.log("URL recebida: "+ url);
 fetch(url).then(res => res.json()).then(data => {
    console.log(data.results);
    showMovies(data.results);
 })
}


function showMovies(data){
    main.innerHTML = '';

    data.forEach(movie => {
        const{poster_path, title, overview, vote_average, id} = movie;
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('item_pesquisa');
        movieEl.innerHTML = `
        <div class="col-12">
          <h1 class="titulo">${title}</h1>
        </div>
        <div class="col-12 poster">
          <img src="${IMG_URL + poster_path}" alt="">
        </div>
        <div class=" col-12 info">
          <p><b>Avaliação: </b> ${vote_average}</p>
        </div>
        <div class="col-12">
          <p><b>Sinopse: </b>${overview}
          <a href="https://www.themoviedb.org/movie/${id}">ler mais ...</a></p>
        </div>
        `
        main.appendChild(movieEl);
        
    })
}

//document.getElementById('botao_pesquisa').addEventListener('click', executaPesquisa);












*/