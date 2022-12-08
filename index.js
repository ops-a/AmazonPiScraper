const wsEndpointUrl = require("./wsEndpointUrl");
const puppeteer = require("puppeteer");
const generateReports = require("./scrape");
const downloadSheets = require("./download");
const delay = require("./delay");

const options = ['option-2', 'option-3', 'option-5', 'option-7', 'option-9'];
const downloadFolders = ['category', 'branded', 'competitor', 'generic', 'moversandshakers'];

const scrapeAndDownload = async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpointUrl,
    args: ["-start-fullscreen"],
  });

  for (let i = 0; i < 5; i++) {
    await generateReports(browser, options[i]);
    await delay(30 * 1000);
    await downloadSheets(browser, downloadFolders[i]);
    await delay(20 * 1000);
  }

  await delay(5 * 1000)
  process.exit()
};

scrapeAndDownload();
