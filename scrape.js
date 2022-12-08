const delay = require('./delay');

const {
  subChecklistContainer,
  subCategoryInputs,
  clickForPopOver,
  clickToApplySub,
  clickToClearAllSubs,
  selectCSV,
  generateExcelBtn,
  keywordBtns
} = require("./domVariables");



const generateReports = async (browser, csvOption) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1900, height: 900 });

  await page.goto("https://pi.amazon.in/#/", { waitUntil: "networkidle0" });

  // Select csv from dropdown
  await page.select(selectCSV, csvOption);

  // For each category and keyword, generate reports
  for (let i = 0; i < subCategoryInputs.length; i++) {
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

    await delay(2000);

    await page.click(generateExcelBtn);
   
    await delay(2000);
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
