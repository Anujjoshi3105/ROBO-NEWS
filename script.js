API_KEY = '9757c7f52586eac915a03c1df53dd80c';
url = 'https://gnews.io/api/v4/search?q=';
window.addEventListener("load", () => fetchNews("robotics"));


async function fetchNews(query) {
    const res = await fetch(`${url}${query}&max=10&apikey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const newsContainer = document.getElementById("news-container");
    const newsnewsTemplate = document.getElementById("template-news-card");

    newsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.image) return;
        const newsClone = newsnewsTemplate.content.cloneNode(true);
        fillDataInnews(newsClone, article);
        newsContainer.appendChild(newsClone);
    });
}

function fillDataInnews(newsClone, article) {
    const newsImg = newsClone.querySelector("#news-img");
    const newsTitle = newsClone.querySelector("#news-title");
    const newsSource = newsClone.querySelector("#news-source");
    const newsDesc = newsClone.querySelector("#news-desc");

    newsImg.src = article.image;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `SOURCE: ${article.source.name}    |    ${date}`;

    newsClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});