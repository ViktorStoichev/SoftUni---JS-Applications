document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const submitButton = document.getElementById('submit');
    const tbody = document.querySelector('#results tbody');

    const BASE_URL = 'http://localhost:3030/jsonstore/collections/students';

    async function loadStudent(student) {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        return response.json();
    }

    async function fetchStudents() {
        const response = await fetch(BASE_URL);
        return response.json();
    }

    function renderStudents(students) {
        tbody.innerHTML = '';
        Object.values(students).forEach(student => {
            const tr = document.createElement('tr');

            const firstNameTd = document.createElement('td');
            firstNameTd.textContent = student.firstName;
            tr.appendChild(firstNameTd);

            const lastNameTd = document.createElement('td');
            lastNameTd.textContent = student.lastName;
            tr.appendChild(lastNameTd);

            const facultyNumberTd = document.createElement('td');
            facultyNumberTd.textContent = student.facultyNumber;
            tr.appendChild(facultyNumberTd);

            const gradeTd = document.createElement('td');
            gradeTd.textContent = student.grade;
            tr.appendChild(gradeTd);

            tbody.appendChild(tr);
        });
    }

    async function loadStudents() {
        const students = await fetchStudents();
        renderStudents(students);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const student = {
            firstName: formData.get('firstName').trim(),
            lastName: formData.get('lastName').trim(),
            facultyNumber: formData.get('facultyNumber').trim(),
            grade: formData.get('grade').trim(),
        };

        if (!student.firstName || !student.lastName || !student.facultyNumber || !student.grade) {
            alert('All fields are required.');
            return;
        }

        await loadStudent(student);
        form.reset();
        loadStudents();
    });

    loadStudents();
});