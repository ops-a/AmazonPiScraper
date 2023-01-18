const wsEndpointUrl = require("./config/wsEndpointUrl");
const puppeteer = require("puppeteer");
const generateReports = require("./scripts/scrape");
const downloadSheets = require("./scripts/download");
const buildFiles = require("./scripts/buildFiles");
const delay = require("./config/delay");
const path = require('path');
const options = ['option-2', 'option-3', 'option-5', 'option-7', 'option-9'];
const downloadSubDirs = ['category', 'branded', 'competitor', 'generic', 'moversandshakers'];

const scrapeAndDownload = async () => {

  // Generate and download all the files
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpointUrl,
    args: ["-start-fullscreen"],
  });

  const downloadsParentDir = path.join('/home/redstar/piScrape/downloads')

  for (let i = 0; i < options.length; i++) {
    const downloadSubDir = downloadSubDirs[i]

    console.log('Generating reports for ', downloadSubDir)
    await generateReports(browser, options[i]);

    console.log('\n\nWaiting 20 seconds for downloads to be ready...\n')
    await delay(20 * 1000);

    console.log('\tDownloading reports for ', downloadSubDir)
    await downloadSheets(browser, downloadsParentDir, downloadSubDir);
    console.log('\tDownload completed for ', downloadSubDir)

    console.log('Waiting for 10 seconds before moving forward.\n\n')
    await delay(10 * 1000);
  }

  // Wait 10 seconds before building out files
  await delay(10 * 1000)

  // Build out the downloaded files
  buildFiles(downloadsParentDir);
};


scrapeAndDownload();