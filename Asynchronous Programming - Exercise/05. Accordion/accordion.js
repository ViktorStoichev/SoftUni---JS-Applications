document.addEventListener('DOMContentLoaded', async function () {
    const data = await getData();
    console.log(data);
    const main = document.getElementById("main");
    for (let obj of data) {
        const details = await getIdDetails(obj._id);
        console.log(details);
        main.appendChild(createArticle(details));
    }
})
async function getData() {
    const response = await fetch("http://localhost:3030/jsonstore/advanced/articles/list");
    return response.json();
}

async function getIdDetails(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
    return response.json();
}

function createArticle(data) {
    const accordionDiv = document.createElement("div");
    accordionDiv.classList.add("accordion");
    const headDiv = document.createElement("div");
    headDiv.classList.add("head");
    accordionDiv.appendChild(headDiv);
    const titleSpan = document.createElement("span");
    titleSpan.textContent = data.title;
    const button = document.createElement("button");
    button.classList.add("button");
    button.id = data._id;
    button.textContent = "More";
    headDiv.append(titleSpan, button);

    const extraDiv = document.createElement('div');
    extraDiv.classList.add("extra");
    extraDiv.style.display = "none";
    const p = document.createElement("p");
    p.textContent = data.content;
    extraDiv.appendChild(p);
    accordionDiv.appendChild(extraDiv);
    
    button.addEventListener("click", function() {
        if (extraDiv.style.display === "none") {
            extraDiv.style.display = "block";
            button.textContent = "Less";
        } else if (extraDiv.style.display = "block") {
            extraDiv.style.display = "none";
            button.textContent = "More";
        }
    })

    return accordionDiv;
}
