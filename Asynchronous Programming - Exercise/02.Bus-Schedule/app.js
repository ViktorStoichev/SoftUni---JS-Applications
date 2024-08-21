function solve() {
    let currentStop = { name: "Not Connected", next: "depot" };
    const info = document.querySelector(".info");
    const departBtn = document.getElementById("depart");
    const arriveBtn = document.getElementById("arrive");


    async function depart() {
        try {
            const BASE_URL = `http://localhost:3030/jsonstore/bus/schedule/${currentStop.next}`;
            
            const response = await fetch(BASE_URL);
            const data = await response.json();
            
            currentStop = { name: data.name, next: data.next };
            info.textContent = `Next stop ${currentStop.name}`;

            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch (err) {
            info.textContent = "Error";
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }

    function arrive() {
        info.textContent = `Arriving at ${currentStop.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();