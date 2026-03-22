const { chromium } = require('playwright-extra');
const stealth = require('puppeteer-extra-plugin-stealth')();
const fs = require('fs');

chromium.use(stealth);

async function runLukasGhost() {
    while (true) {
        console.log(`\n[${new Date().toLocaleTimeString()}] --- انطلاق "لوًڪٰـآس الشبح" (24/7 Mode) ---`);
        let browser;

        try {
            browser = await chromium.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-blink-features=AutomationControlled']
            });

            const contextOptions = {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                viewport: { width: 1920, height: 1080 }
            };

            if (fs.existsSync('state.json')) {
                console.log("جاري استئناف الجلسة السابقة (Bypassing VPN check)...");
                contextOptions.storageState = 'state.json';
            }

            const context = await browser.newContext(contextOptions);
            const page = await context.newPage();

            console.log("التوجه للموقع...");
            await page.goto('https://sada1.chat/', { waitUntil: 'networkidle', timeout: 90000 });

            const loginNeeded = await page.getByText('الدخول بعضوية').isVisible().catch(() => false);

            if (loginNeeded) {
                console.log("جاري تسجيل الدخول بمحاكاة بشرية...");
                await page.click('text="الدخول بعضوية"');
                await page.waitForTimeout(3000);

                await page.locator('input[name="user"]').first().pressSequentially('لـــوگــــــاس', { delay: 100 });
                await page.locator('input[name="pass"]').first().pressSequentially('wfhskfaA@134/حمو', { delay: 100 });

                await page.click('input[type="submit"], button[type="submit"]');
                await page.waitForTimeout(10000);

                await context.storageState({ path: 'state.json' });
                console.log("تم حفظ الجلسة بنجاح.");
            }

            console.log("[SUCCESS] - لـــوگــــــاس is online, active, and staring for gold.");
            
            let logTimer = Date.now();
            while (true) {
                await page.mouse.move(Math.floor(Math.random() * 10), Math.floor(Math.random() * 10));
                await page.evaluate(() => window.scrollBy(0, Math.random() * 20 - 10));
                
                if (Date.now() - logTimer > 300000) {
                    console.log(`[SUCCESS] - [${new Date().toLocaleTimeString()}] لـــوگــــــاس is still online.`);
                    logTimer = Date.now();
                }
                await page.waitForTimeout(90000);
            }

        } catch (err) {
            console.error(`[ERROR]: ${err.message}`);
            if (browser) await browser.close();
            await new Promise(r => setTimeout(r, 15000));
        }
    }
}
runLukasGhost();
