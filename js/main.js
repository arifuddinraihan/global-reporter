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
    //    div.classList.add("g-0");
       div.innerHTML = `
                        <div class="col-md-2">
                            <img src=${news.thumbnail_url} class="img-fluid" alt="...">
                        </div>
                        <div class="col-md-10">
                            <div class="card-body">
                                <h5 class="card-title">${news.title}</h5>
                                <p class="card-text text-secondary">${news.details}</p>
                                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
       
       ` ;
       newsContainer.appendChild(div);
    });
    
}

setCatagory();
