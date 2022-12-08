// Sub category variables
const subChecklistContainer = "div#subcategories-checklist-container";

const subCategoryValues = [
  10227, 11843, 18022, 21733, 18684, 12891, 16946, 10283, 16941, 12708, 10331,
  18560, 11155, 11376, 18517, 12075, 20523, 16531, 14190, 17995, 17197, 11113,
  17691, 17374, 13333, 16610, 15176, 14800, 17827, 17819, 17505, 10997,
];
const keywordNames = ['CATEGORY', 'BRAND', 'COMPETITOR', 'GENERIC', 'MOVERS_AND_SHAKERS'];

const subCategoryInputs = subCategoryValues.map((v) => `input[value="${v}"]`);
const keywordBtns = keywordNames.map(k => `li[data-a-tab-name="${k}"] a`);

const clickForPopOver =
  "section#aue-subcategory-option div.a-icon-section-expand";
const clickToClearAllSubs = "a#clear-all-subcategories";
const clickToApplySub = "input#modal-save-button-subcategories";

// Keyword variables

// CSV dropdown
const selectCSV = "#download-dropdown";

// Generate excel button
const generateExcelBtn = '#aue-report-download a[role="button"]';

module.exports = {
  subChecklistContainer,
  subCategoryInputs,
  clickForPopOver,
  clickToApplySub,
  clickToClearAllSubs,
  selectCSV,
  generateExcelBtn,
  keywordBtns
};
