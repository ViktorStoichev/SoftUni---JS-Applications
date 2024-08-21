import { api } from "../utility/requester.js"


const endpoints = {
    allBooks: 'http://localhost:3030/jsonstore/collections/books',
    idBooks: 'http://localhost:3030/jsonstore/collections/books/'
}

async function getAllBooks() {
    return await api.get(endpoints.allBooks);
}

async function createBook(data) {
    return await api.post(endpoints.allBooks, data);
}

async function getBook(id) {
    return await api.get(endpoints.idBooks + id);
}

async function updateBook(id, data) {
    return await api.put(endpoints.idBooks + id, data);
}

async function deleteBook(id) {
    return await api.del(endpoints.idBooks + id);
}

export const dataService = {
    getAllBooks,
    createBook,
    getBook,
    updateBook,
    deleteBook
}