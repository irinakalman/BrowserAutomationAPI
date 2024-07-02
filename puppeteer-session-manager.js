const puppeteer = require('puppeteer');
require('dotenv').config();
const fs = require('fs');

// Function to get a random session
async function getRandomSession(myBrowser) {
  return null; 
}

async function main(env) {
  let sessionId = await getRandomSession(env.MYBROWSER);
  let browser, launched;

  if (sessionId) {
    try {
      browser = await puppeteer.connect({ browserWSEndpoint: `${env.MYBROWSER}/${sessionId}` });
    } catch (e) {
      // Another worker may have connected first
      console.log(`Failed to connect to ${sessionId}. Error ${e}`);
    }
  }

  if (!browser) {
    // No open sessions, launch new session
    browser = await puppeteer.launch({ headless: true }); // Add your launch options here
    launched = true;
  }

  if (browser) {
    sessionId = browser.wsEndpoint().split('/').pop(); // Get current session id

    try {
      // Screenshot of Hacker News
      const page1 = await browser.newPage();
      await page1.goto(env.HACKER_NEWS_URL);
      await page1.screenshot({ path: 'hacker_news.png', fullPage: true });
      console.log('Screenshot of Hacker News saved as hacker_news.png');
      await page1.close();

      // Screenshot of my GitHub profile
      const page2 = await browser.newPage();
      await page2.goto(env.GITHUB_URL);
      await page2.screenshot({ path: 'github_irina_kalman.png', fullPage: true });
      console.log('Screenshot of my GitHub saved as github_irina_kalman.png');
      await page2.close();
      
    } catch (error) {
      console.error(`Error during page operations: ${error}`);
    } finally {
      // Disconnect browser
      if (launched) {
        await browser.close();
      } else {
        await browser.disconnect();
      }
    }
  } else {
    console.error('Failed to launch or connect to a browser instance.');
  }
}

// Call the main function with environment variables
main(process.env);
