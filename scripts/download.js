const delay = require('../config/delay');
const path = require('path');
const { subCategoryInputs } = require('../config/domVariables')

const downloadSheets = async (browser, downloadsParentDir, downloadSubDirs) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1900, height: 900 });

  // Set download destination
  const client = await page.target().createCDPSession()
  await client.send('Page.setDownloadBehavior', {
    behavior: 'allow',
    downloadPath: path.join(__dirname, "..", "downloads", downloadSubDirs)
  })
  
  await page.goto("https://pi.amazon.in/download-center", { waitUntil: "networkidle0" });

  console.log('\n\nStarting download...\n')
  
  const downloads = await page.$$(`table.aue-custom-table tr > td button`);

  for(let i = 0; i < subCategoryInputs.length; i++) {
    await downloads[i].click();
    await delay(1500);
    console.log('\tDownloaded file for ', subCategoryInputs[i])
  }

  await delay(2000);
  page.close();

  return;
};

module.exports = downloadSheets;
