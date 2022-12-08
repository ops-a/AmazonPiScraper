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
const fs = require("fs");
const downloadsDir = "/home/redstar/piScrape/downloads";
const keywords = [
  "category",
  "branded",
  "competitor",
  "generic",
  "moversandshakers",
];
const resultsDir = "/home/redstar/piScrape/results";
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");

const delay = require("./delay");

const rename = () => {
  for (let i = 0; i < keywords.length; i++) {
    const keywordDir = `${downloadsDir}/${keywords[i]}`;
    console.log("Renaming files for ", keywords[i]);

    fs.readdir(`${keywordDir}`, (err, files) => {
      if (err) throw err;
      for (let i = 0; i < files.length; i++) {
        let name = "";

        const filePath = `${keywordDir}/${files[i]}`;

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
              fs.rename(`${filePath}`, `${keywordDir}/${name}.csv`, (err) => {
                if (err) throw err;
              });
            } else {
              fs.rm(filePath, (err) => {
                if (err) throw err;
              });
            }
          });
        });
      }
    });
    console.log("Renamed files for ", keywords[i]);
  }
};

const emptyFiles = () => {
  for (let i = 0; i < keywords.length; i++) {
    console.log("FILE: ", keywords[i]);
    fs.writeFile(`${resultsDir}/${keywords[i]}`, "", (err) => {
      if (err) throw err;
      console.log("Emptied out file: ", keywords[i]);
    });
  }
};

const organize = async () => {
  for (let i = 0; i < keywords.length; i++) {
    console.log("\n\nBuilding out ", keywords[i], ".csv\n");

    for (let j = 0; j < categoryNames.length; j++) {
      console.log("Inserting for subcategory: ", categoryNames[j]);

      await delay(2000);
      try {
      fs.readFile(
        `${downloadsDir}/${keywords[i]}/${categoryNames[j]}.csv`,
        (err, data) => {
          if(err) return;
          parse(data, (err, records) => {
            if (err) console.log('error in reading file');

            console.log("Records: ", records);
            const start = (j == 0 ? 0 : 1);

            if (records.length > 1) {
              const insertionData =
                records.length > 51 ? records.slice(start, 50) : records.slice(start);

              stringify(insertionData, (err, output) => {
                if (err) throw err;

                fs.appendFile(
                  `${resultsDir}/${keywords[i]}.csv`,
                  output,
                  (err) => {
                    if (err) throw err;
                    console.log(
                      "Data appended for ",
                      categoryNames[j],
                      " in ",
                      keywords[i],
                      ".csv"
                    );
                  }
                );
              });
            }
          });
        }
      );
      } catch(e) {
        console.log('File not found: ');
      }
    }
  }
};

const buildFiles = () => {
  // rename();
  // emptyFiles();
  organize();
};

buildFiles();
