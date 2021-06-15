const API_KEY = '4aec08d6a063f531b3aa5dfd47796e60';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const populares = document.getElementById('filmes_populares');
const lancamentos = document.getElementById('filmes_lancamentos');
const aclamados_criticas = document.getElementById('filmes_aclamados_pela_critica');
const mais_info = document.getElementById("mais_info");
const filme_escolhido = document.getElementById("filme_escolhido_conteudo");

//Pegar dados da API DMDB

//filmes lançamentos
pegar_filmes_lancamentos("https://api.themoviedb.org/3/discover/movie?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&primary_release_year=2021&with_watch_monetization_types=flatrate");

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
            <img src="${IMG_URL + poster_path}" alt="" id = "${id}" onclick="togglePopup(id)">
        </div>
        `
        lancamentos.appendChild(movieEl);
        
    })
}


//filmes populares
pegar_filmes_aclamados_pela_critica("https://api.themoviedb.org/3/discover/movie?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&sort_by=vote_count.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate");

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
            <img src="${IMG_URL + poster_path}" alt="" id = "${id}" onclick="togglePopup(id)">
        </div>
        `
        aclamados_criticas.appendChild(movieEl);
        
    })
}


//aclamdos pela critica
pegar_filmes_populares("https://api.themoviedb.org/3/discover/movie?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&with_watch_monetization_types=flatrate");

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
            <img src="${IMG_URL + poster_path}" alt="" id = "${id}" onclick="togglePopup(id)">
        </div>
        `
        populares.appendChild(movieEl);
        
    })
}



//pop-up texto posters
function togglePopup(id){
    document.getElementById("popup-1").classList.toggle("active");
    var filme_id = id;
    //descobre_url(filme_id);
  }

function descobre_url(id){
    const URL_textos = `https://api.themoviedb.org/3/movie/${id}?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br`
    console.log(URL_textos);//está imprimindo ok
    pegar_info_filme_clicado(URL_textos);
}

function pegar_info_filme_clicado(url){//recebe o URL ok
    fetch(url).then(res => res.json()).then(data => {
        console.log("data.results: "+data.results);
     mostrar_info(data.results);
 })
}

function mostrar_info(data){
    mais_info.innerHTML = '';
    console.log("dados mostrar info: "+data);//undefined
        
    data.forEach(movie => {
        const{poster_path, id} = movie;
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
                <a href="filme_escolhido.html id=${data.id}" onclick ="passar_filme_escolhido(id)">leia mais ...</a>
                </div>
            </div>
        `
    })
        mais_info.appendChild(movieEl);
    
}



//pagina filme escolhido

function passar_filme_escolhido(id){
    const URL_info = `https://api.themoviedb.org/3/movie/${id}?api_key=4aec08d6a063f531b3aa5dfd47796e60&language=pt-br`
    console.log(URL_info);//está imprimindo ok
    pegar_info_filme_escolhido(URL_textos);
}

function pegar_info_filme_escolhido(url){//recebe o URL ok
    fetch(url).then(res => res.json()).then(data => {
        console.log("dados pegar filmes: "+ data.results);//undefined
        mostrar_filme_escolhido(data.results);
 })
}

function mostrar_filme_escolhido(data){
    filme_escolhido.innerHTML = '';

        console.log("dados mostrar info: "+data);//undefined
        const movieEl = document.createElement(`div`);
        movieEl.classList.add('row conteudo');
        movieEl.innerHTML = `
            <div class="col-12 titulo">
                <h1>${titulo}</h1>
            </div>
            <div class="col-12 col-sm-3 info">
                <div class="row poster">
                    <img src="${img}" alt="">
                </div>
                <p><b>Direção: </b> ${direção}</p>
                <p><b>Avaliação: </b> ${avaliação}</p>
                <p><b>Classificação: </b> ${classificação}</p>
                <p><b>Estreia: </b>${estreia}</p>
            </div>
            <div class="col-12 col-sm-9 texto">
                <div class="row sinopse">
                    <h2>Sinópse:</h2>
                    <p>${sinopse}</p>
                </div>
                <div class="row review">
                    <h2>Review:</h2>
                    <p>${avaliação}</p>
                </div>
            </div>
        `
        filme_escolhido.appendChild(movieEl);
    
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



