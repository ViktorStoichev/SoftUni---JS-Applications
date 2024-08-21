import { html } from '../node_modules/lit-html/lit-html.js';
import { dataService } from '../service/dataService.js';

let loadBooksIsClicked = false;
let editIsClicked = false;
const homeTemplate = (books) => html`
    <button id="loadBooks" @click=${onLoad}>LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            ${loadBooksIsClicked ? books.map(book => bookTemplate(book)) : ''}
        </tbody>
    </table>

    ${editIsClicked
        ? html`
        <form id="edit-form">
            <input type="hidden" name="id">
            <h3>Edit book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Save">
            </form>`
        : html`
        <form id="add-form" @submit=${onAddSubmit}>
            <h3>Add book</h3>
            <label>TITLE</label>
            <input type="text" name="title" placeholder="Title...">
            <label>AUTHOR</label>
            <input type="text" name="author" placeholder="Author...">
            <input type="submit" value="Submit">
        </form>`
    }`

const bookTemplate = (book) => html`
            <tr>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button data-id=${book._id} @click=${onEdit}>Edit</button>
                    <button data-id=${book._id} @click=${onDelete}>Delete</button>
                </td>
            </tr>`

let context = null;
export async function showHomeView(ctx) {
    context = ctx;
    const data = await dataService.getAllBooks();
    const books = Object.values(data);
    ctx.render(homeTemplate(books));
}

async function onLoad() {
    loadBooksIsClicked = true;
    const data = await dataService.getAllBooks();
    const books = Object.values(data);
    context.render(homeTemplate(books));
    // loadBooksIsClicked = false;
}

async function onAddSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { title, author } = Object.fromEntries(formData);

    if (!title || !author) {
        return alert('Opa! nema input');
    }

    await dataService.createBook({ title, author });
}

async function onEdit(e) {
    const id = e.target.dataset.id;
    const bookData = await dataService.getBook(id);
    editIsClicked = true;
    let data = await dataService.getAllBooks();
    let books = Object.values(data);
    context.render(homeTemplate(books));
    const formRef = document.getElementById('edit-form');
    formRef.querySelector('input[name="title"]').value = bookData.title;
    formRef.querySelector('input[name="author"]').value = bookData.author;
    console.log(formRef);
    formRef.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const { title, author } = Object.fromEntries(formData);

        if (!title || !author) {
            return alert('pa nema input');
        }

        await dataService.updateBook(id, { title, author, _id: id });
        data = await dataService.getAllBooks();
        books = Object.values(data);
        editIsClicked = false;
        context.render(homeTemplate(books));
    })
}

async function onDelete(e) {
    const id = e.target.dataset.id;
    await dataService.deleteBook(id);
    const data = await dataService.getAllBooks();
    const books = Object.values(data);
    context.render(homeTemplate(books));
}