BASE_URL = "https://gogohd.net/videos/"

var iframe_url = ""

let searchParams = new URLSearchParams(window.location.search);
let animeId = searchParams.get('id');
let animeEp =  searchParams.get('ep');

const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

$(document).ready(() => {
    let searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('id')) {
        if (!searchParams.has('ep'))
            window.location.href = `${window.location.href.split('?')[0]}?id=${searchParams.get('id')}&ep=1`;
        let animeId = searchParams.get('id');
        let animeEp =  searchParams.get('ep');
        getAnime(animeId, animeEp);
    } else
        window.location.href = "../";
});

$( "#ep" ).change(function() {
    window.location.href = `${window.location.href.split('?')[0]}?id=${animeId}&ep=${Number(document.getElementById('ep').value)}`;
});



function getAnime(animeId, animeEp) {
    var url = `${BASE_URL}${animeId}-${animeEp}`;
    
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        if (xhr.status == 200 && xhr.responseText.trim() != "404".trim()) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(xhr.responseText, "text/html");
            var episodes = doc.querySelectorAll('.video-info-left ul.listing.items > li.video-block > a');
            if (Number(animeEp) > episodes.length || Number(animeEp) < 1) {
                window.location.href = `${window.location.href.split('?')[0]}?id=${animeId}&ep=1`;
            }
            
            episodes.forEach( (e,i) => {
                if (i+1 == Number(animeEp)) {
                    document.getElementById('ep').innerHTML += `<option selected value = '${i+1}'>${i+1}</option>`;
                } else {
                    document.getElementById('ep').innerHTML += `<option value = '${i+1}'>${i+1}</option>`;
                }
            });

            iframe_url = doc.querySelector('iframe').getAttribute('src');
            title = doc.querySelector("div.video-info-left > h1").innerText;
            
            document.title = title;

            document.getElementById('main').innerHTML += 
            `<iframe id="embedvideo" src="https:${iframe_url}" allowvr="yes"  allowfullscreen="true" marginwidth="0" marginheight="0" scrolling="no" frameborder="0"></iframe>`           
        } else
            window.location.href = "../";
    }};
    xhr.send();
}


// setInterval(function(){ 
//     console.clear();
// }, 1000);

// document.addEventListener('contextmenu', e => {  
//     e.preventDefault();
// });

// document.onkeydown = e => {  
//     if (e.keyCode == 123)
//         return false;      
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0))
//         return false;
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0))
//         return false;
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0))
//         return false;
//     if (e.ctrlKey && e.shiftKey && e.keyCode == "U".charCodeAt(0))
//         return false;
// };