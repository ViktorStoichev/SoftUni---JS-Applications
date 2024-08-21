const main = document.querySelector('main');
const homeSection = document.querySelector('div[data-section=home]');
const getStartedRef = document.querySelector('a[data-tag="a"]');

let context = null
export function showHomeView(ctx) {
    context = ctx;
    main.replaceChildren(homeSection);
}

getStartedRef.addEventListener('click', (event) => {
    event.preventDefault();
    const url = new URL(event.target.href);
    const href = url.pathname;
    context.goTo(href);
    
})