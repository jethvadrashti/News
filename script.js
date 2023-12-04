const API_KEY = "24f71e79a5cc44d7828837b6b6df3bf3";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("India"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate = document.getElementById('template-card');

    cardsContainer.innerHTML = "";

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function onNavItemClick(id){
    fetchNews(id);
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsTitle.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone : "Asia/Jakarta"});

    newsSource.innerHTML = `${article.source.name} ${date}`;
    newsDesc.innerHTML = `${article.description}`;

    cardClone.firstElementChild.addEventListener('click',() => {
        window.open(article.url,"_blank");
    });
}