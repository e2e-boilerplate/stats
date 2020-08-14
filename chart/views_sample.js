import { logger } from "../src/constants";

const { appendFileSync, writeFileSync } = require("fs");

function writeToFile(header, data) {
    const content = ["name,count,uniques"];
    const file = "chart/views/views.csv";

    data.forEach((element) => content.push(element));

    writeFileSync(file, "", "utf8");

    try {
        content.forEach((line) => {
            appendFileSync(file, `${line}\n`, "utf8");
        });
    } catch (error) {
        console.error("Error writing csv to file");
    }
}

function createCSv() {
  try {
    const redacted = require(`../data/redacted/redacted.json`);
    const data = [];

    redacted.forEach( r => {
        const { views, name } = r;
        const { count, uniques } = views;
        if( count === 0 && uniques === 0) {
            data.push(`${r.name},${r.views.count},${r.views.uniques}`);
        }
    });

    console.log(data);


    writeToFile();

  } catch (error) {
    logger.error(error.message);
  }
}

createCSv();
