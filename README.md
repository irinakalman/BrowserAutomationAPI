# Browser Automation with Puppeteer

This repository contains scripts to automate browser tasks using Puppeteer. The scripts cover a variety of use cases including generating screenshots, creating PDFs, and reuse browser sessions.

## Overview

### Scripts

1. **index.mjs**
   - **Purpose**: Fetch GitHub yearly contributions, inject custom HTML, and capture a screenshot.
   - **Usage**:
     - Navigates to a GitHub profile.
     - Extracts yearly contributions.
     - Injects a custom HTML snippet.
     - Captures a full-page screenshot including the custom content.
     - Returns the HTML content with the screenshot embedded.

2. **pdfMaker.js**
   - **Purpose**: Generate a PDF from a web page with a custom header.
   - **Usage**:
     - Navigates to Hacker News.
     - Adds a custom header to the page.
     - Generates a PDF of the page.

3. **sessionManager.js**
   - **Purpose**: Reuse browser sessions and take screenshots of specific web pages.
   - **Usage**:
     - Connects to or launches a new Puppeteer browser session.
     - Captures screenshots of Hacker News and a GitHub profile.
     - Saves the screenshots locally.

4. **screenshotMaker.js**
   - **Purpose**: Capture a screenshot of a web page.
   - **Usage**:
     - Navigates to Hacker News.
     - Captures and saves a screenshot of the page.
