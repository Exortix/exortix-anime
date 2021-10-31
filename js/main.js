BASE_URL = "https://gogoplay1.com"






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
    var url = `${BASE_URL}/search.html?keyword=${query}`;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState === 4) {
          console.log(xhr.status);
          console.log(xhr.responseText);
          
          
          var parser = new DOMParser();
          var doc = parser.parseFromString(xhr.responseText, "text/html");
          var animes = doc.querySelectorAll('ul.listing.items > li.video-block > a');
          console.log(animes)

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
                    <p class="anime-overview">${(anime.querySelector('meta') != null) ? anime.querySelector('meta').innerText : ''}</p>
                </div>
            `;
          });
          $('#animes > .row').html(output);
       }};
    
    xhr.send();
}