const categoryNames = [
  "almonds",
  "cashews",
  "pistachios",
  "walnuts",
  "raisins",
  "dates",
  "mixednuts",
  "anjeer(figs)",
  "mixeddriedfruits",
  "cranberries",
  "apricots",
  "pumpkinseeds",
  "blueberries",
  "brazilnuts",
  "prunes",
  "chiaseeds",
  "sunflowerseeds",
  "macadamia",
  "flaxseeds",
  "pineseeds",
  "muskmelonseeds",
  "blackberries",
  "papayas",
  "nutsandseeds",
  "mangos",
  "driedfruits",
  "hazelnuts",
  "gojiberries",
  "pecans",
  "peanuts",
  "others",
  // "berries",
];
const keywords = [
  "category",
  "branded",
  "competitor",
  "generic",
  "moversandshakers",
];
const path = require("path");
const fs = require("fs");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const delay = require("../config/delay");

const resultsDir = path.join(__dirname, "../results");

const rename = () => {
  for (let i = 0; i < keywords.length; i++) {
    const keyword = keywords[i];

    const keywordDir = path.join("/home/redstar/piScrape/downloads", keyword);

    console.log("\n\nRenaming files for ", keyword, "\n");

    fs.readdir(keywordDir, (err, files) => {
      if (err) throw err;

      for (let i = 0; i < files.length; i++) {
        let name = "";

        const filePath = path.join(keywordDir, files[i]);

        fs.readFile(filePath, async (err, data) => {
          if (err) throw err;
          parse(data, (err, records) => {
            if (err) throw err;

            if (records.length > 1) {
              name =
                records[1][3]
                  .replace(/\s*/g, "")
                  .replace("&", "and")
                  .toLowerCase() || "";

              fs.rename(
                filePath,
                path.join(keywordDir, `${name}.csv`),
                (err) => {
                  if (err) throw err;
                  console.log("\t", files[i], " renamed to ", name);
                }
              );
            } else {
              fs.rm(filePath, (err) => {
                if (err) throw err;
                console.log("\tEmpty file removed: ", filePath);
              });
            }
          });
        });
      }
    });
    console.log("\nRenamed files for ", keywords[i]);
  }
};

const emptyOutFile = (filePath) => {
    console.log("\n\tEmptying FILE: ", filePath);
    fs.writeFile(filePath, "", (err) => {
      if (err) throw err;
      console.log("Emptied out file: ", filePath, '\n');
    });
}

const organize = async () => {
  for (let i = 0; i < keywords.length; i++) {
    console.log("\n\nBuilding out ", keywords[i], ".csv\n");
    const keywordFilePath = path.join(resultsDir, `/${keywords[i]}.csv`);
    // await emptyOutFile(keywordFilePath);
    console.log('Keyword file path: ',keywordFilePath);

    for (let j = 0; j < categoryNames.length; j++) {
      console.log("\tInserting for subcategory: ", categoryNames[j]);
      const currDataFile = path.join(
        "/home/redstar/piScrape/downloads",
        keywords[i],
        `${categoryNames[j]}.csv`
      );

      await delay(2000);
      try {
        fs.readFile(currDataFile, (err, data) => {
          if (err) return;
          parse(data, (err, records) => {
            if (err) console.log("error in reading file");

            console.log("\n\tRecords: ", records);
            const start = j == 0 ? 0 : 1;

            if (records.length > 1) {
              const insertionData =
                records.length > 51
                  ? records.slice(start, 50)
                  : records.slice(start);

              stringify(insertionData, (err, output) => {
                if (err) throw err;

                fs.appendFile(keywordFilePath, output, (err) => {
                  if (err) throw err;
                  console.log(
                    "\n\tData appended for ",
                    categoryNames[j],
                    " in ",
                    keywords[i],
                    ".csv"
                  );
                });
              });
            }
          });
        });
      } catch (e) {
        console.log("File not found: ");
      }
    }
  }
};

const buildFiles = () => {
  rename();
  organize();
};

buildFiles();
module.exports = buildFiles;
