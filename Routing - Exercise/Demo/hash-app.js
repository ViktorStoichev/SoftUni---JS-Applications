window.addEventListener('hashchange', onHashChange);

function onHashChange() {
    const { hash } = window.location;
    if (hash === '#first') {
        showView('1');
    } else if (hash === '#second') {
        showView('2');
    } else if (hash === '#third') {
        showView('3');
    }
}

function showView(id) {
    document.querySelectorAll('section').forEach(s => {
        s.style.display = s.id === id ? 'block' : 'none';
    })
}

onHashChange();