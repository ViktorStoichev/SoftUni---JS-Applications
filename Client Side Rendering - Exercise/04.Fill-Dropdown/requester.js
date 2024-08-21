const endPoint = 'http://localhost:3030/jsonstore/advanced/dropdown'

async function get() {
    const response = await fetch(endPoint);
    return await response.json();
}

async function post(data) {
    const option = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    await fetch(endPoint, option);
}

export const services = {
    get,
    post
}