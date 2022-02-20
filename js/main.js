BASE_URL = "https://gogoplay1.com"

let searchParams = new URLSearchParams(window.location.search);
let pageNumber = searchParams.get('page');


$(document).ready(() => {
    let searchParams = new URLSearchParams(window.location.search);
        if (!searchParams.has('page'))
            window.location.href = `${window.location.href.split('?')[0]}?page=1`;
        let pageNumber = searchParams.get('page');;
        let searchText = $('#searchText').val();
        getAnimes(searchText)
});





$('#searchForm').submit( function(e){ 
    e.preventDefault();
})

let searchText = $('#searchText').val();
getAnimes(searchText)

$('#searchForm').on("input", (e) => {
    searchText = $('#searchText').val();
    getAnimes(searchText);
    e.preventDefault();
});

function getAnimes(query) {
    var url;

    if (searchText.length < 2)
        url = `${BASE_URL}/?page=${pageNumber}`;
    else
        url = `${BASE_URL}/search.html?keyword=${query}`

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {        
          var parser = new DOMParser();
          var doc = parser.parseFromString(xhr.responseText, "text/html");
          var animes = doc.querySelectorAll('ul.listing.items > li.video-block > a');
          var pagination = doc.querySelector("#main_bg > div:nth-child(5) > div > div.vc_row.wpb_row.vc_row-fluid.vc_custom_1404913114846 > div:nth-child(3)")

          let output = '';
          $.each(animes, (index, anime) => {
            id = anime.pathname.split('/').pop().split('-')
            id.pop()
            id = id.join('-')
            ep = anime.pathname.split('/').pop().split('-').pop()
            output += `
                <div onclick="window.location.href = 'anime/?id=${id}&ep=${ep}'" class="col anime rounded">
                    <img class = "rounded" src = "${anime.querySelector('img').src}"/>
                    <h4>${anime.querySelector('div.name').innerText}</h4>
                    <span class="anime-overview">${(anime.querySelector('.meta') != null) ? anime.querySelector('.meta').innerText : ''}</span>
                </div>
            `;
          });
          $('#animes > .row').html(output);
          $('#pagination').html(pagination);
       }};
    
    xhr.send();
}