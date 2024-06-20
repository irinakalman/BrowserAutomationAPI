import puppeteer from 'puppeteer';

export default {
    async fetch (request: Request, env: Env, ctx: ExecutionContext) : Promise<Response> {
        const browser = await puppeteer.launch(env.MYBROWSER);
        const page = await browser.newPage();

        await page.setViewport({
            width: 1280,
            height: 800,
        });

        await page.goto(env.OURDOMAIN_DIEMEN, { waitUntil: 'networkidle2'});

        let availability;
        try {
            availability = await page.$eval('.applyButton', (el: HTMLElement) => el.innerText);
            console.log('Appartment availability:', availability);
        } catch (error){
            console.log('No appartments available at this time!, try again later');
            availability = 'No appartments available at this time!, try again later'
        }

        const screenshot = await page.screenshot({ encoding: 'base64'});
        await browser.close();

        // create html content 
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
        <title>Apartment availability</title>
        </head>
        <body>
        <h1>You're lucky! Current status of Available Apartments: ${availability}</h1>
        <img scr='data:image/png;base64, ${screenshot}'
        </body>
        </html>
        `

        return new Response (htmlContent, {
            headers: {
                'Content-Type': 'text/html',
            }
        })
    }
}