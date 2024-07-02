import puppeteer from 'puppeteer';
import { Response } from 'node-fetch';
import fs from 'fs';

export default {
    async fetch(request, env) {
        console.log("Starting the fetch function");

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setViewport({
            width: 1280,
            height: 800,
        });

        console.log(`Navigating to ${env.GITHUB_URL}`);
        await page.goto(env.GITHUB_URL, { waitUntil: 'networkidle2' });

        let yearlyContributions;
        try {
            yearlyContributions = await page.$eval('.js-yearly-contributions h2', el => el.innerText);
            console.log('Yearly contributions:', yearlyContributions);
        } catch (error) {
            console.log("The page isn't available");
            yearlyContributions = "The page isn't available";
        }

        console.log("Injecting custom HTML content");
        const customHtmlContent = `
        <div id="custom-content" style="margin-top: 20px; text-align: center; padding: 20px;">
            <h1>Screenshot of My yearly contributions</h1>
            <h2>Yearly contributions are: ${yearlyContributions}</h2>
        </div>
        `;
        await page.evaluate((html) => {
            const customContentDiv = document.createElement('div');
            customContentDiv.innerHTML = html;
            document.body.prepend(customContentDiv); 
        }, customHtmlContent);

        console.log("Taking screenshot");
        const screenshot = await page.screenshot({ encoding: 'base64', fullPage: true });

        
        fs.writeFileSync('screenshot.png', Buffer.from(screenshot, 'base64'));
        console.log("Screenshot saved as screenshot.png");

        
        console.log(`Screenshot Base64 length: ${screenshot.length}`);

        console.log("Closing browser");
        await browser.close();

        console.log("Returning response");
        const responseHtml = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Screenshot of My yearly contributions</title>
        </head>
        <body>
        <h1>Screenshot of My yearly contributions</h1>
        <img src='data:image/png;base64,${screenshot}' />
        </body>
        </html>
        `;

        return new Response(responseHtml, {
            headers: {
                'Content-Type': 'text/html',
            }
        });
    }
};

// To test the function
(async () => {
    const env = {
        GITHUB_URL: 'https://github.com/irinakalman' 
    };

    const request = {}; // Mock request object
    const response = await (await import('./index.mjs')).default.fetch(request, env);

    // console.log(await response.text());
})();
