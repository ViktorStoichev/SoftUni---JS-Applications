
import { chromium } from 'playwright-chromium';
import { expect } from 'chai';
let browser, page; // Declare reusable variables
describe('E2E tests', async function () {
    this.timeout(6000);
    before(async () => browser = await chromium.launch({ headless: false, slowMo: 2000 }));
    after(async () => await browser.close());

    beforeEach(async () => page = await browser.newPage());
    afterEach(async () => await page.close());

    it('load titles', async () => {
        await page.goto('http://localhost:5500/JS Applications/Architecture and Testing - Lab/01. Accordion/index.html');
        
        const content = await page.textContent('div.head span');

        console.log(content);
    })

    it('visible content onMore', async () => {
        await page.goto('http://localhost:5500/JS Applications/Architecture and Testing - Lab/01. Accordion/index.html');

        await page.click('text=more');

        const visible = await page.isVisible('.accordion .extra');

        expect(visible).to.be.true;
    })

    it('button text content should be Less', async () => {
        await page.goto('http://localhost:5500/JS Applications/Architecture and Testing - Lab/01. Accordion/index.html');

        await page.click('text=more');

        const btnText = await page.textContent('button.button');
        console.log(btnText);
        expect(btnText).to.be.equal('Less');
    })

    it('hide content onLess', async () => {
        await page.goto('http://localhost:5500/JS Applications/Architecture and Testing - Lab/01. Accordion/index.html');

        await page.click('text=less');

        const visible = await page.isVisible('.accordion .extra');
        console.log(visible);

        expect(visible).to.be.false;
    })
});