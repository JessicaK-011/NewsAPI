const API_KEY = "94f6fc7f7dc545888b727c3d87719284";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener('load',()=>fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
    console.log(data);
}
function bindData(articles){
    const cardContainer = document.getElementById("card-container");
    const cardTemplate = document.getElementById("template-news-card");
    cardContainer.innerHTML='';
    articles.forEach((article)=> {
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardContainer.appendChild(cardClone);
    });
}
function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    })

    newsSource.innerHTML=`${article.source.name} . ${date}`;
}

let currSelectedNav = null;
function onNavItemClick(id){
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=navItem;
    currSelectedNav.classList.add('active');
}

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query);
    currSelectedNav?.classList.remove('active');
    currSelectedNav=null;
})

function reload(){
    window.location.reload();
}

