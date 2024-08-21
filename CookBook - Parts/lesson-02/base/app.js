window.addEventListener('load', async function () {
    const main = document.querySelector("main");
    main.removeChild(main.children[0]);

    const recipes = await getRecipes();
    console.log(recipes);

    Object.values(recipes).forEach(data => {
        async function result() {
            const previewArticle = createPreview(data);
            const hiddenArticle = await createInfo(data);
            main.append(previewArticle, hiddenArticle);

            previewArticle.addEventListener("click", function () {
                previewArticle.style.display = "none";
                hiddenArticle.style.display = "block";
            }) 
        }
        result();
    })
})

function createPreview(data) {
    const previewArticle = document.createElement("article");
    previewArticle.classList.add("preview");
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    const titleH2 = document.createElement("h2");
    titleH2.textContent = data.name;
    titleDiv.appendChild(titleH2);
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("small");
    const img = document.createElement("img");
    img.src = data.img;
    imgDiv.appendChild(img);
    previewArticle.append(titleDiv, imgDiv);
    return previewArticle;
}

async function createInfo(data) {
    const info = await getRecipeInfo(data._id);
    console.log(info);

    const article = document.createElement("article");
    const h2 = document.createElement("h2");
    h2.textContent = info.name;

    const bandDiv = document.createElement("div");
    bandDiv.classList.add("band");

    const thumbDiv = document.createElement("div");
    thumbDiv.classList.add("thumb");
    const img = document.createElement("img");
    img.src = info.img
    thumbDiv.appendChild(img);

    const ingredientsDiv = document.createElement("div");
    ingredientsDiv.classList.add("ingredients");
    const h3 = document.createElement("h3");
    h3.textContent = "Ingredients:";
    ingredientsDiv.appendChild(h3);
    const ul = document.createElement("ul");
    info.ingredients.forEach(el => {
        const li = document.createElement("li");
        li.textContent = el;
        ul.appendChild(li);
    })
    ingredientsDiv.appendChild(ul);
    bandDiv.append(thumbDiv, ingredientsDiv);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.classList.add("description");
    const descriptionH3 = document.createElement("h3");
    descriptionH3.textContent = "Preparation:";
    descriptionDiv.appendChild(descriptionH3);

    info.steps.forEach(step => {
        const p = document.createElement("p");
        p.textContent = step;
        descriptionDiv.appendChild(p);
    })

    article.append(h2, bandDiv, descriptionDiv);
    article.style.display = "none";
    console.log(article);
    return article;
}

async function getRecipes() {
    const response = await fetch('http://localhost:3030/jsonstore/cookbook/recipes');
    return response.json();
}

async function getRecipeInfo(id) {
    const response = await fetch(`http://localhost:3030/jsonstore/cookbook/details/${id}`);
    return response.json();
}