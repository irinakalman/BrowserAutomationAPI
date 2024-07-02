const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    console.log('Going to the Hacker News page');


    await page.goto("https://news.ycombinator.com", {
      waitUntil: "networkidle2",
      timeout: 60000, // Increase the timeout to 60 seconds
    });

    // Add a header with the title "Created by Kalma Labs"
    await page.evaluate(() => {
      const header = document.createElement("div");
      header.textContent = "Created by Kalma Labs";
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.width = "100%";
      header.style.textAlign = "center";
      header.style.fontSize = "16px";
      header.style.fontWeight = "bold";
      header.style.backgroundColor = "white";
      header.style.padding = "10px";
      header.style.zIndex = "1000";
      document.body.insertBefore(header, document.body.firstChild);
    });

    await page.pdf({
      path: "pdfMaker.pdf",
      format: "a3",
      margin: {
        top: "50px",
        right: "10mm",
        bottom: "10mm",
        left: "10mm",
      },
    });

    console.log('PDF generated successfully');
  } catch (error) {
    console.error("failed to generate pdf:", error);
  } finally {
    await browser.close();
  }
})();
