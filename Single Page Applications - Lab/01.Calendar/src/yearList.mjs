export function showYears() {
    document.querySelectorAll("section").forEach(section => { section.style.display = "none" });
    document.getElementById("years").style.display = "block"
}