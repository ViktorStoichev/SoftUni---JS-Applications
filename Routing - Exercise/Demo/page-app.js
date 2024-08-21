import page from './node_modules/page/page.mjs'

page('/first', () => showView('1'))
page('/second', () => showView('2'))
page('/third', () => showView('3'))

page.start()

function showView(id) {
    document.querySelectorAll('section').forEach(s => {
        s.style.display = s.id === id ? 'block' : 'none';
    })
}