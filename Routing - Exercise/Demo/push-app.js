window.addEventListener('popstate', onPopState);

document.addEventListener('click', onClick);

function onClick(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();

        window.history.pushState({}, '', event.target.href);
        onPopState();
    }
}

const views = {
    '/first': () => showView('1'),
    '/second': () => showView('2'),
    '/third': () => showView('3'),
}

function onPopState(event) {
    console.log(window.location.pathname);
    const { pathname } = window.location;

    const view = views[pathname];
    
    if (view) {
        view();
    }
}

function showView(id) {
    document.querySelectorAll('section').forEach(s => {
        s.style.display = s.id === id ? 'block' : 'none';
    })
}

onPopState();