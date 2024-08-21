import { html, render } from './node_modules/lit-html/lit-html.js';
import { get } from './requester.js';

export async function renderStudents() {
    const tbody = document.querySelector('tbody');

    const data = await get();
    const students = Object.values(data);

    render(students.map(studentsInfoTemplate), tbody);

    function studentsInfoTemplate(data) {
        return html`
    <tr>
        <td>${data.firstName} ${data.lastName}</td>
        <td>${data.email}</td>
        <td>${data.course}</td>
    </tr>`
    }
}