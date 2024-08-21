import { showMonths } from "./monthList.mjs";

export function showDays(monthSection, monthText) {
    let count = 0;
    monthSection.querySelectorAll("td.day").forEach(month => {
        count++;
        month.id = count;
        month.addEventListener("click", function () {
            document.querySelectorAll("section").forEach(section => { section.style.display = "none" });
            const daysSection = document.querySelector(`section#month-${monthText}-${month.id}`);
            daysSection.style.display = "block";
            const daysCaption = daysSection.querySelector("caption");
            daysCaption.addEventListener("click", function() {
                document.querySelectorAll("section").forEach(section => { section.style.display = "none" });
                monthSection.style.display = "block";
            })
        })
    })
}