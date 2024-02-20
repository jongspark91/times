const apiKey = "8341e0d5704a413d903d3f1ca6ba4bc3"
let news = []
const getLatestNews = async ()=>{
    const apiKey = "8341e0d5704a413d903d3f1ca6ba4bc3"
    // const url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const url = new URL(`https://mapark-times.netlify.app/top-headlines?q="아이유`);
    const response=await fetch(url)
    const data = await response.json()
    news = data.articles;
    console.log(news)
    console.log("rrr",response)
}
getLatestNews()