function getInfo() {
    const input = document.getElementById("stopId").value;
    const BASE_URL = `http://localhost:3030/jsonstore/bus/businfo/${input}`;
    const stopName = document.getElementById("stopName");
    const result = document.getElementById("buses");
    result.innerHTML = "";
    stopName.textContent = "";

    async function onCheck() {
        try {
            const response = await fetch(BASE_URL);
            const data = await response.json();

            stopName.textContent = data.name;
            Object.entries(data.buses).forEach(bus => {
                const li = document.createElement("li");
                li.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
                result.appendChild(li);
            })
        } catch (err) {
            stopName.textContent = "Error";
        }
    }

    onCheck();
}