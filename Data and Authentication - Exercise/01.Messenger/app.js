function attachEvents() {
    const sendBtn = document.getElementById("submit");
    const refreshBtn = document.getElementById("refresh");
    const newAuthor = document.querySelector('input[name="author"]');
    const newContent = document.querySelector('input[name="content"]');
    const textArea = document.getElementById("messages");

    sendBtn.addEventListener("click", onSend);
    refreshBtn.addEventListener("click", onRefresh);

    async function onSend() {
        const data = { author: newAuthor.value, content: newContent.value };
        await fetch("http://localhost:3030/jsonstore/messenger", {
            method: "post",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
    }

    async function onRefresh() {
        const response = await fetch("http://localhost:3030/jsonstore/messenger");
        const data = await response.json();
        textArea.value = "";

        const messages = Object.values(data).map(msg => `${msg.author}: ${msg.content}`).join('\n');
        textArea.value = messages;
        
        newAuthor.value = "";
        newContent.value = "";
    }
}

attachEvents();