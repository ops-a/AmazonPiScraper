const wsEndpointUrl = require("./config/wsEndpointUrl");
const puppeteer = require("puppeteer");
const generateReports = require("./scripts/scrape");
const downloadSheets = require("./scripts/download");
const buildFiles = require("./scripts/buildFiles");
const delay = require("./config/delay");

const options = ['option-2', 'option-3', 'option-5', 'option-7', 'option-9'];
const downloadFolders = ['category', 'branded', 'competitor', 'generic', 'moversandshakers'];

const scrapeAndDownload = async () => {

  // Generate and download all the files
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpointUrl,
    args: ["-start-fullscreen"],
  });

  for (let i = 0; i < options.length; i++) {
    const downloadFolder = downloadFolders[i]

    console.log('Generating reports for ', downloadFolder)
    await generateReports(browser, options[i]);

    console.log('\n\nWaiting 30 seconds for downloads to be ready...\n')
    await delay(30 * 1000);

    console.log('\tDownloading reports for ', downloadFolder)
    await downloadSheets(browser, downloadFolder);
    console.log('\tDownload completed for ', downloadFolder)

    console.log('Waiting for 10 seconds before moving forward.\n\n')
    await delay(10 * 1000);
  }

  // Wait 20 seconds before building out files
  await delay(20 * 1000)

  // Build out the downloaded files
  buildFiles();
};

scrapeAndDownload();
