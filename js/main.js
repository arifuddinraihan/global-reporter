// console.log("Main JS is working...!")

// loadin spinner
const loadinSpinner = document.getElementById("loading-spinner");
loadinSpinner.classList.add("visually-hidden");
// console.log(loadinSpinner)


// catagory data
const catagoryData = async () => {
    const url = "https://openapi.programming-hero.com/api/news/categories";
    const response = await fetch(url);
    const data = await response.json();
    return data.data.news_category;
}

const setCatagory = async () => {
    const data = await catagoryData();
    // console.log(data);
    const catagoryList = document.getElementById("catagory-list");
    for (const perCata of data) {
        // console.log(perCata);
        const li = document.createElement("li");
        li.classList.add('list-group-item');
        li.innerHTML = `
                <p onclick=catagoryNews("${perCata.category_id}")>${perCata.category_name}</p>
                `;
        catagoryList.appendChild(li);
    }
    // // console.log(catagoryList);

}

const catagoryNews = async(id) => {
    // console.log("yes catagory news found", id)
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    // console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    const everyNews = data.data;


    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML="";


    everyNews.forEach(news => {
        console.log(news);
       const div = document.createElement("div");
       div.classList.add("row");
       div.classList.add("my-2");
       div.classList.add("shadow-lg");
       div.classList.add("align-items-center");
    //    div.classList.add("g-0");
       div.innerHTML = `
                        <div class="col-md-2 py-2">
                            <img src=${news.thumbnail_url} class="img-fluid" alt="...">
                        </div>
                        <div class="col-md-10">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text text-secondary">${news.details.slice(0,250) ? news.details.slice(0,250) + "..." : "No Details Shared"}</p>
                                <p class="card-text">
                                    <small class="text-muted">
                                        <div class="container text-start">
                                            <div class="row row-cols-sm-1 align-items-center">
                                                <div class="col-md-4 col-xs-12">
                                                    <div class="row align-items-center">
                                                        <div class="col-3">
                                                        <img src=${news.author.img} class="img-thumbnail rounded-circle float-start" alt="...">
                                                        </div>
                                                        <div class="col-9">
                                                        ${news.author.name ? news.author.name : "No Name found"}
                                                        <br/>
                                                        ${news.author.published_date ? news.author.published_date : "No date found"}
                                                        </div>
                                                    </div>
                                                    </div>
                                                    <div class="col-md-4 col-xs-12" style="margin-top: 20px;">
                                                    <i class="fa-solid fa-eye p-2"></i>
                                                    <span class="p-2">${news.total_view}</span>
                                                    </div>
                                                    <div class="col-md-4 col-xs-12" style="margin-top: 20px;">
                                                    <button type="button" class="btn btn-outline-secondary">Read More...</button>
                                                    </div>
                                            </div>
                                        </div>
                                    </small>
                                </p>
                            </div>
                        </div>
       
       ` ;
       newsContainer.appendChild(div);
    });
    
}

setCatagory();
