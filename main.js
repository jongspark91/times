const apiKey = "8341e0d5704a413d903d3f1ca6ba4bc3"
let newsList = []
let newsDesc = ""
let newsImg = ""
let newsSrc = ""
const getLatestNews = async ()=>{
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const url = new URL(`https://mapark-times.netlify.app/top-headlines?`);
    const response= await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    console.log(newsList);
    render()
    // console.log("rrr",response);
}

const render=()=>{
    const newsHTML = newsList.map(
        (news)=> `<div class = "row news">
    <div class = "col-lg-4">
        <img class= "news-img-size" src = "${checkImage(news.urlToImage)}"/>
    </div>
    <div class = "col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${sliceDescription(news.description)}
        </p>
        <div>
            ${checkSource(news.source.name)} * ${moment(news.publishedAt).fromNow()}
        </div>
    </div>
</div>`).join('');
    document.getElementById("news-board").innerHTML = newsHTML
}
getLatestNews()

function sliceDescription(desc){
    if(desc.length >= 200){
        newsDesc = desc.substr(0,200) + "..."
    }else if(desc.length === 0){
        newsDesc = "내용 없음"
    }else{
        newsDesc = desc
    }
    return newsDesc
}

function checkImage(img){
    if(img===""){
        newsImg = "이미지 없음"
    }else{
        newsImg = img
    }
    return newsImg
}

function checkSource(item){
    if(item===""){
        newsSrc = "출처 없음"
    }else{
        newsSrc = item
    }
    return newsSrc
}