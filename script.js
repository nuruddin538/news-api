// let count = 0;
const handleCategory = async () => {
    const response = await fetch("https://openapi.programming-hero.com/api/news/categories");
    const data = await response.json();

    const tabContainer = document.getElementById("tab-container");
    // console.log(data.data.category_name);
    // const trineData = data.data.news_category.slice(0, 3);
    data.data.news_category.slice(0, 3).forEach((category) => {
        // count = count + 1;
        // console.log(category)
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        `;
        tabContainer.appendChild(div);
    })
    // console.log(data.data.news_category);
    
};

// const handleLoadNews = (categoryId) => {
//     console.log(categoryId);
// };

const handleLoadNews = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    // console.log(data.data);
    // console.log(data);
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    data.data?.forEach((news) => {
        // console.log(news);
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card w-96 mx-auto bg-base-100 shadow-xl">
            <figure><img src=${news?.image_url} alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${news.title.slice(0, 40)}</h2>
                <p>${news.details
            .slice(0, 60)}</p>
                <div class="badge badge-secondary p-5">${news?.rating?.badge}</div>
                <h3>total views: ${news.total_view ? news.total_view : "No view"}
                <div class="card-actions justify-start">
                    <button onclick="handleModal('${news._id}')" class="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    })
};

const handleModal = async (newsID) => {
    // console.log(newsID);

    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsID}`);
    const data = await response.json();
    console.log(data.data[0]);
    
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg">Hello!</h3>
            <p class="py-4">${data?.newsID?.image_url}</p>
            <div class="modal-section">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
            </div>
        </form>
    </dialog>
    `;
    modalContainer.appendChild(div);

    const modal = document.getElementById("my_modal_1");

    modal.showModal();
};

handleCategory();
handleLoadNews("01")