const puppeteer = require("puppeteer");
const {
  subChecklistContainer,
  subCategoryInputs,
  clickForPopOver,
  clickToApplySub,
  clickToClearAllSubs,
  selectCSV,
  csvOption,
  generateExcelBtn,
  keywordBtns
} = require("./domVariables");

const wsEndpointUrl =
  "ws://127.0.0.1:5501/devtools/browser/3c582466-27d3-48ad-b1d7-af8016c2313b";

const generateReports = async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpointUrl,
    args: ["-start-fullscreen"],
  });
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

   
    // Now generate the report
    if(i == 0) {
      break;
    }
  }
};

// const downloadPage = await browser.newPage();
// await downloadPage.setViewport({ width: 1900, height: 900 });
// await downloadPage.goto("https://pi.amazon.in/#/download-center", {
//   waitUntil: "networkidle0",
// });
// await downloadPage.click(`table.aue-custom-table tr button`);

// await browser.close();

const loopAndPrint = async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: wsEndpointUrl,
    args: ["-start-fullscreen"],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1900, height: 900 });
  await page.goto("https://pi.amazon.in/#/", { waitUntil: "networkidle0" });
  await page.click(clickForPopOver);

  // clear all subcategories
  await page.waitForSelector(clearAllSubs);
  await page.click(clearAllSubs);
  const optionsContainer = await page.$(
    "div#subcategories-checklist-container"
  );
  console.log("Options Container: ", optionsContainer);
  // const options = await optionsContainer.$$('input');

  // Method 1
  // const input = await page.waitForSelector('div.subcategories-item input[value="10227"]');
  // await input.click();

  // Method 2
  // await page.$eval('input[value="10227"]', e => e.click());
  // await page.$eval('input[value="11843"]', e => e.click());

  await page.focus(`${subcategoryDiv} ${almond}`);

  await page.keyboard.press("Space", { delay: 1000 });

  const apply = await page.waitForSelector(
    "input#modal-save-button-subcategories"
  );
  await apply.click();
};

generateReports();
// Loop through all the subcategories and print them
// Loop through all the keywords and print them

// Log on to pi.amazon.in
// Set download CSV to the first option
// Select the first subcategory
// For each subcategory, select the keyword one by one
// For each such combination download the report
