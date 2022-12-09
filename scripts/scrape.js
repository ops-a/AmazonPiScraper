const delay = require('../config/delay');

const {
  subChecklistContainer,
  subCategoryInputs,
  clickForPopOver,
  clickToApplySub,
  clickToClearAllSubs,
  selectCSV,
  generateExcelBtn,
  keywordBtns
} = require("../config/domVariables");



const generateReports = async (browser, csvOption) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1900, height: 900 });

  await page.goto("https://pi.amazon.in/#/", { waitUntil: "networkidle0" });

  // Select csv from dropdown
  await page.select(selectCSV, csvOption);
  console.log('Selected csv option ', csvOption)

  // For each category and keyword, generate reports
  for (let i = 0; i < (subCategoryInputs.length - subCategoryInputs.length + 2); i++) {
    // Access popover
    await page.click(clickForPopOver);

    // Get subcategories container
    const checklistContainer = await page.waitForSelector(
      subChecklistContainer
    );

    // Clear all categories
    const clearAllSubsE = await page.waitForSelector(clickToClearAllSubs);
    await clearAllSubsE.click();

    // Select a category and apply
    await page.focus(`${subChecklistContainer} ${subCategoryInputs[i]}`);
    await page.keyboard.press("Space", { delay: 1000 });

    const apply = await page.waitForSelector(clickToApplySub);
    await apply.click();

    await delay(3000);

    await page.click(generateExcelBtn);
   
    console.log('Generated report for ', subCategoryInputs[i])
    await delay(3000);
  }
};

module.exports = generateReports;

// Loop through all the subcategories and print them
// Loop through all the keywords and print them

// Log on to pi.amazon.in
// Set download CSV to the first option
// Select the first subcategory
// For each subcategory, select the keyword one by one
// For each such combination download the report
