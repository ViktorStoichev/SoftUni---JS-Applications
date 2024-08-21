import { showDays } from "./daysList.mjs";
import { showYears } from "./yearList.mjs";

export function showMonths() {
    document.querySelectorAll("#years td.day").forEach(currentSection => {
        currentSection.addEventListener("click", (event) => {
            console.log("neshto");
            document.querySelectorAll("section").forEach(section => { section.style.display = "none" });
            const monthText = currentSection.querySelector("div.date").textContent;
            const monthSection = document.querySelector(`section#year-${monthText}`);
            monthSection.style.display = "block";
            const monthCaption = monthSection.querySelector("caption");
            monthCaption.addEventListener("click", (e) => {
                showYears();
            })
            showDays(monthSection, monthText);
        })
    })
}