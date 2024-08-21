export async function get() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/table');
    return await response.json();
}