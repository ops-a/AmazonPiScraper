const delay = require('./delay');
const { subCategoryInputs } = require("./domVariables");

const downloadSheets = async (browser, downloadFolder) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1900, height: 900 });

  // Set download destination
  const client = await page.target().createCDPSession()
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: `/home/redstar/piScrape/downloads/${downloadFolder}`,
  })
  
  await page.goto("https://pi.amazon.in/#/download-center", { waitUntil: "networkidle0" });

  
  const downloads = await page.$$(`table.aue-custom-table tr > td button`);

  for(let i = 0; i < subCategoryInputs.length; i++) {
    await downloads[i].click();
    await delay(1500);
  }

  return;
};

module.exports = downloadSheets;
