const apiKey = "8341e0d5704a413d903d3f1ca6ba4bc3"
let newsList = []
let newsDesc = ""
let newsImg = ""
let newsSrc = ""
let totalResult = 0
let page = 1
const pageSize = 10
const groupSize = 5

// let url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
const menus = document.querySelectorAll(".menus button")
let url = new URL(`https://mapark-times.netlify.app/top-headlines?`)
console.log(menus)
menus.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

const getNews = async()=>{
    try{
        url.searchParams.set("page",page);
        url.searchParams.set("pageSize", pageSize);
        const response= await fetch(url);
        const data = await response.json();
        if(response.status===200){
            if(data.articles.length === 0){
                throw new Error("No result for this search")
            }
            newsList = data.articles;
            totalResult = data.totalResults;
            render();
            paginationRender();
        }else{
            throw new Error(data.message)
        }
    }catch(error){
        errorRender(error.message)
    }
}

const paginationRender=()=>{
    //total result
    //page
    //pgsize
    //groupsize
    //totalPages
    const totalPages = Math.ceil(totalResult/pageSize)
    //pagegroup
    const pageGroup = Math.ceil(page/groupSize)
    //lastpage
    const lastPage = pageGroup*groupSize
    if(lastPage>totalPages){
        lastPage=totalPages;
    }
    console.log("last",totalPages)
    //firstpage
    const firstPage = lastPage - (groupSize -1)<=0?1: lastPage -(groupSize-1);
    let paginationHTML = ""
    if(page===firstPage){
        ""
    }else{
        paginationHTML += `<a class="page-link" onclick="moveToPage(${firstPage})" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
    </a>`
    paginationHTML += `<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link">Previous</a></li>`
    };
    for(let i=firstPage; i<lastPage;i++){
        paginationHTML+=`<li class="page-item ${i===page?"active":""}"onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
    }
    if(page===lastPage){
        ""
    }else{
        paginationHTML+=`<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link">Next</a></li>`
        paginationHTML+=`<a class="page-link" onclick="moveToPage(${totalPages})" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>`
    }
    document.querySelector(".pagination").innerHTML=paginationHTML
    // <nav aria-label="Page navigation example">
    //     <ul class="pagination">
    //         <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //         <li class="page-item"><a class="page-link" href="#">1</a></li>
    //         <li class="page-item"><a class="page-link" href="#">2</a></li>
    //         <li class="page-item"><a class="page-link" href="#">3</a></li>
    //         <li class="page-item"><a class="page-link" href="#">Next</a></li>
    //     </ul>
    // </nav>
}

const moveToPage=(pageNum)=>{
    getNews()
    page = pageNum;
}

const getLatestNews = async ()=>{
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    url = new URL(`https://mapark-times.netlify.app/top-headlines?`);
    getNews()
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

const getNewsByCategory = async (event) =>{
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`);
    url = new URL(`https://mapark-times.netlify.app/top-headlines?category=${category}`);
    getNews()
}
const getNewsByKeyword = async ()=>{
    const keyword = document.getElementById("search-input").value;
    console.log("key", keyword);
    // url = new URL(`https://newsapi.org/v2/top-headlines?country=us&q=${keyword}&apiKey=${apiKey}`);
    url = new URL(`https://mapark-times.netlify.app/top-headlines?q=${keyword}`);
    getNews()
}

function sliceDescription(desc){
    console.log("desc",desc)
    if (desc === null){
        newDesc = "내용 없음"
    }else{
        if(desc.length >= 200){
            newsDesc = desc.substr(0,200) + "..."
        }else if(desc.length === 0){
            newsDesc = "내용 없음"
        }else{
            newsDesc = desc
        }
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

const errorRender=(errorMessage)=>{
    const errorHTML = `<div class="alert alert-danger" role="alert">
    ${errorMessage}
</div>`
document.getElementById("news-board").innerHTML = errorHTML
}
//1. 버튼들에 클릭이벤트 주기
//2. 카테고리별 뉴스 가져오기
//3. 뉴스 보여주기