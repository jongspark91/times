const apiKey = "8341e0d5704a413d903d3f1ca6ba4bc3"
let newsList = []
const getLatestNews = async ()=>{
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const url = new URL(`https://mapark-times.netlify.app/top-headlines?country=kr`);
    const response= await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    // console.log(newsList);
    // render()
    // console.log("rrr",response);
}

const render=()=>{
    const newsHTML = newsList.map(
        (news)=> `<div class = "row news">
    <div class = "col-lg-4">
        <img class=${news.urlToImage}/>
    </div>
    <div class = "col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>
    </div>
</div>`).join('');
    document.getElementById("news-board").innerHTML = newsHTML
}
getLatestNews()