const puppeteer = require("puppeteer");
const {
  subChecklistContainer,
  subCategoryInputs,
  clickForPopOver,
  clickToApplySub,
  clickToClearAllSubs,
  selectCSV,
  csvOption,
  downloadBtn,
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

  await page.click(keywordBtns[2])

};

generateReports();
