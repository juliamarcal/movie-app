const API_KEY = '4aec08d6a063f531b3aa5dfd47796e60';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const populares = document.getElementById('filmes_populares');
const lancamentos = document.getElementById('filmes_lancamentos');
const aclamados_criticas = document.getElementById('filmes_aclamados_pela_critica');
const mais_info = document.getElementById("mais_info");
const filme_escolhido = document.getElementById("filme_escolhido_conteudo");
const grandeLucro = document.getElementById('filmes_grande_lucro');


//Chamada das funções para colocar filmes nos posteres
function carregaDados () {
    pegar_filmes_lancamentos("https://api.themoviedb.org/3/discover/movie?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&primary_release_year=2021&with_watch_monetization_types=flatrate");
    pegar_filmes_aclamados_pela_critica("https://api.themoviedb.org/3/discover/movie?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate");
    pegar_filmes_populares("https://api.themoviedb.org/3/discover/movie?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate");
    pegar_filmes_grande_lucro("https://api.themoviedb.org/3/discover/movie?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&sort_by=revenue.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate");
} 

//filmes lançamentos
function pegar_filmes_lancamentos(url){
 fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
     mostrar_filmes_lancamentos(data.results);
 })
}
function mostrar_filmes_lancamentos(data){
    lancamentos.innerHTML = '';

    data.forEach(movie => {
        const{poster_path, id} = movie;
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('item');
        movieEl.innerHTML = `
        <div class="pad15">
            <img src="${IMG_URL + poster_path}" alt="" id = "${id}" onclick="clicar_filme_poster(id)">
        </div>
        `
        lancamentos.appendChild(movieEl);
        
    })
}


//filmes populares
function pegar_filmes_aclamados_pela_critica(url){
 fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
     mostrar_filmes_aclamados_pela_critica(data.results);
 })
}
function mostrar_filmes_aclamados_pela_critica(data){
    aclamados_criticas.innerHTML = '';

    data.forEach(movie => {
        const{poster_path, id} = movie;
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('item');
        movieEl.innerHTML = `
        <div class="pad15">
            <img src="${IMG_URL + poster_path}" alt="" id = "${id}" onclick="clicar_filme_poster(id)">
        </div>
        `
        aclamados_criticas.appendChild(movieEl);
        
    })
}


//aclamdos pela critica
function pegar_filmes_populares(url){
 fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
     mostrar_filmes_populares(data.results);
 })
}
function mostrar_filmes_populares(data){
    populares.innerHTML = '';

    data.forEach(movie => {
        const{poster_path, id} = movie;
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('item');
        movieEl.innerHTML = `
        <div class="pad15">
            <img src="${IMG_URL + poster_path}" alt="" id = "${id}" onclick="clicar_filme_poster(id)">
        </div>
        `
        populares.appendChild(movieEl);
        
    })
}

//grande lucro
function pegar_filmes_grande_lucro(url){
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
     mostrar_filmes_grande_lucro(data.results);
    })
}
function mostrar_filmes_grande_lucro(data){
    grandeLucro.innerHTML = '';

    data.forEach(movie => {
        const{poster_path, id} = movie;
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('item');
        movieEl.innerHTML = `
        <div class="pad15">
            <img src="${IMG_URL + poster_path}" alt="" id = "${id}" onclick="clicar_filme_poster(id)">
        </div>
        `
        grandeLucro.appendChild(movieEl);
        
    })
}


//pop-up texto posters
function clicar_filme_poster(id){
    var filme_id = id;
    descobre_url (filme_id);    
}

function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
    
  }

function descobre_url(id){
    var URL_textos = `https://api.themoviedb.org/3/movie/${id}?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br`;
    pegar_info_filme_clicado(URL_textos);
}

function pegar_info_filme_clicado(url){
    fetch(url).then(res => res.json()).then(data => {
     mostrar_info(data);
 })
}

function mostrar_info(data){

    mais_info.innerHTML = '';
        
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('item');
        movieEl.innerHTML = `
            <div class="popup" id="popup-1">
                <div class="overlay"></div>
                <div class="content">
                <div class="close-btn" onclick="togglePopup()">×</div>
                <h1>${data.title}</h1>
                <p><b>Avaliação: </b>${data.vote_average}</p>
                <p><b>Descrição: </b>${data.overview}</p>
                <a href="filme_escolhido.html" id="${data.id}" onclick ="passar_id(id)">leia mais ...</a>
                </div>
            </div>
        `
    
        mais_info.appendChild(movieEl);
        togglePopup()
    
}

function passar_id(id){
    var id_filme = id;
    localStorage.setItem('id_do_filme', id_filme);
}


// carrousel filmes
$(document).ready(function () {
    var itemsMainDiv = ('.MultiCarousel');
    var itemsDiv = ('.MultiCarousel-inner');
    var itemWidth = "";

    $('.leftLst, .rightLst').click(function () {
        var condition = $(this).hasClass("leftLst");
        if (condition)
            click(0, this);
        else
            click(1, this)
    });

    ResCarouselSize();




    $(window).resize(function () {
        ResCarouselSize();
    });

    //this function define the size of the items
    function ResCarouselSize() {
        var incno = 0;
        var dataItems = ("data-items");
        var itemClass = ('.item');
        var id = 0;
        var btnParentSb = '';
        var itemsSplit = '';
        var sampwidth = $(itemsMainDiv).width();
        var bodyWidth = $('body').width();
        $(itemsDiv).each(function () {
            id = id + 1;
            var itemNumbers = $(this).find(itemClass).length;
            btnParentSb = $(this).parent().attr(dataItems);
            itemsSplit = btnParentSb.split(',');
            $(this).parent().attr("id", "MultiCarousel" + id);


            if (bodyWidth >= 1200) {
                incno = itemsSplit[3];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 992) {
                incno = itemsSplit[2];
                itemWidth = sampwidth / incno;
            }
            else if (bodyWidth >= 768) {
                incno = itemsSplit[1];
                itemWidth = sampwidth / incno;
            }
            else {
                incno = itemsSplit[0];
                itemWidth = sampwidth / incno;
            }
            $(this).css({ 'transform': 'translateX(0px)', 'width': itemWidth * itemNumbers });
            $(this).find(itemClass).each(function () {
                $(this).outerWidth(itemWidth);
            });

            $(".leftLst").addClass("over");
            $(".rightLst").removeClass("over");

        });
    }


    //this function used to move the items
    function ResCarousel(e, el, s) {
        var leftBtn = ('.leftLst');
        var rightBtn = ('.rightLst');
        var translateXval = '';
        var divStyle = $(el + ' ' + itemsDiv).css('transform');
        var values = divStyle.match(/-?[\d\.]+/g);
        var xds = Math.abs(values[4]);
        if (e == 0) {
            translateXval = parseInt(xds) - parseInt(itemWidth * s);
            $(el + ' ' + rightBtn).removeClass("over");

            if (translateXval <= itemWidth / 2) {
                translateXval = 0;
                $(el + ' ' + leftBtn).addClass("over");
            }
        }
        else if (e == 1) {
            var itemsCondition = $(el).find(itemsDiv).width() - $(el).width();
            translateXval = parseInt(xds) + parseInt(itemWidth * s);
            $(el + ' ' + leftBtn).removeClass("over");

            if (translateXval >= itemsCondition - itemWidth / 2) {
                translateXval = itemsCondition;
                $(el + ' ' + rightBtn).addClass("over");
            }
        }
        $(el + ' ' + itemsDiv).css('transform', 'translateX(' + -translateXval + 'px)');
    }

    //It is used to get some elements from btn
    function click(ell, ee) {
        var Parent = "#" + $(ee).parent().attr("id");
        var slide = $(Parent).attr("data-slide");
        ResCarousel(ell, Parent, slide);
    }

});



