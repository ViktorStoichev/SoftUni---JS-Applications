const loadBooksBtn = document.getElementById("loadBooks");
loadBooksBtn.addEventListener("click", onLoad);
const tbody = document.querySelector("tbody");
const submitBtn = document.querySelector("form button");
const titleInput = document.querySelector('input[name="title"]');
const authorInput = document.querySelector('input[name="author"]');
submitBtn.addEventListener("click", onSubmit);
let editKey;

// window.addEventListener("load", () => {
//     authorInput.value = "";
//     titleInput.value = "";
// })

async function onLoad() {
    tbody.innerHTML = "";
    const response = await fetch("http://localhost:3030/jsonstore/collections/books");
    const data = await response.json();
    Object.entries(data).forEach(entry => {
        const [key, book] = entry;
        const tr = document.createElement("tr");
        const titleTd = document.createElement("td");
        titleTd.textContent = book.title;
        const authorTd = document.createElement("td");
        authorTd.textContent = book.author;
        const buttonsTd = document.createElement("td");
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        buttonsTd.append(editBtn, deleteBtn);
        tr.append(titleTd, authorTd, buttonsTd);
        tbody.appendChild(tr);
        editBtn.addEventListener("click", async function() {
            submitBtn.textContent = "Save";
            document.querySelector("form h3").textContent = "Edit FORM";
            authorInput.value = book.author;
            titleInput.value = book.title;
            editKey = key;
        })
        deleteBtn.addEventListener("click", async function() {
            await fetch(`http://localhost:3030/jsonstore/collections/books/${key}`, {
                method: "delete",
                body: JSON.stringify(key)
            })
            tbody.removeChild(tr);
        })
    })
}

async function onSubmit(event) {
    event.preventDefault();
    if (submitBtn.textContent === "Submit") {
        if (authorInput.value.length === 0 || titleInput.value.length === 0) {
            return;
        }
        const data = {
            author: authorInput.value,
            title: titleInput.value
        }
        await fetch("http://localhost:3030/jsonstore/collections/books", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        // authorInput.value = "";
        // titleInput.value = "";
    } else if(submitBtn.textContent === "Save") {
        // if (authorInput.value.length === 0 || titleInput.value.length === 0) {
        //     return;
        // }
        const data = {
            author: authorInput.value,
            title: titleInput.value
        }
        await fetch(`http://localhost:3030/jsonstore/collections/books/${editKey}`, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        // submitBtn.textContent = "Submit";
        // document.querySelector("form h3").textContent = "FORM";
        // authorInput.value = "";
        // titleInput.value = "";
    }
}