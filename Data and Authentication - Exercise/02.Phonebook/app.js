function attachEvents() {
    const phonebook = document.getElementById("phonebook");
    const loadBtn = document.getElementById("btnLoad");
    const createBtn = document.getElementById("btnCreate");

    loadBtn.addEventListener("click", onLoad);
    createBtn.addEventListener("click", onCreate);

    async function onLoad() {
        const response = await fetch("http://localhost:3030/jsonstore/phonebook");
        const data = await response.json();
        phonebook.innerHTML = "";

        Object.values(data).forEach(info => {
            const li = document.createElement("li");
            li.textContent = `${info.person}: ${info.phone}`;
            const button = document.createElement("button");
            button.textContent = "Delete";
            button.addEventListener("click", async function () {
                await fetch(`http://localhost:3030/jsonstore/phonebook/${info._id}`, {
                    method: "delete",
                    body: JSON.stringify(info.id)
                });
                phonebook.removeChild(li);
            })
            phonebook.appendChild(li);
            li.insertAdjacentElement("beforeend", button);
        })
    }

    async function onCreate() {
        const person = document.getElementById("person").value;
        const phone = document.getElementById("phone").value;
        const data = {person, phone};
        await fetch("http://localhost:3030/jsonstore/phonebook", {
            method: "post",
            headers: { "Content-Type": "application/json " },
            body: JSON.stringify(data)
        });
        document.getElementById("person").value = "";
        document.getElementById("phone").value = "";
        onLoad();
    }
}

attachEvents();