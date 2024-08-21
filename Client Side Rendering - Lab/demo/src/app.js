import { catArticles } from "./database.js";

const templateCache = {};

async function loadTemplate(name) {
    if (templateCache[name]) {
        return templateCache[name];
    }

    const response = await fetch(`./views/${name}.html`);

    if (!response.ok) {
        return alert('Error Loading Template');
    }

    const templateContent = await response.text();

    templateCache[name] = templateContent;
    return templateContent;
}

function renderTemplate(template, content) {
    return template.replace(/%%(.+?)%%/g, (match, name) => {
        return content[name];
    })
}

async function start() {
    const template = await loadTemplate('article');

    const content = catArticles.map(a => renderTemplate(template, a)).join('\n');
    
    const main = document.getElementById('content');
    
    main.innerHTML = content;
}

window.start = start;