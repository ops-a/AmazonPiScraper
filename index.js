const wsEndpointUrl = require('./wsEndpointUrl')
const puppeteer = require("puppeteer");
const generateReports = require('./scrape');
const downloadSheets = require('./download');
const delay = require('./delay');

const scrapeAndDownload = async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpointUrl,
    args: ["-start-fullscreen"],
  });
  
//   await generateReports(browser);
//   await delay(30 * 1000);
  await downloadSheets(browser);
  await delay(2000);
  process.exit(200);

}

scrapeAndDownload();