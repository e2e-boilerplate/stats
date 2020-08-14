import { logger } from "../src/constants";

const { appendFileSync, writeFileSync } = require("fs");

function writeToFile(data, path) {
  const content = ["name,count,uniques"];

  data.forEach((element) => content.push(element));

  writeFileSync(path, "", "utf8");

  try {
    content.forEach((line) => {
      appendFileSync(path, `${line}\n`, "utf8");
    });
  } catch (error) {
    console.error("Error writing csv to file");
  }
}

function createCSv() {
  try {
    const redacted = require(`../data/redacted/redacted.json`);
    const view = [];
    const clone = [];

    redacted.forEach((r) => {
      const { views, name } = r;
      const { count, uniques } = views;
      if (count !== 0 && uniques !== 0) {
          view.push(`${name},${count},${uniques}`);
      }
    });

      redacted.forEach((r) => {
          const { clones, name } = r;
          const { count, uniques } = clones;
          if (count !== 0 && uniques !== 0) {
              clone.push(`${name},${count},${uniques}`);
          }
      });

    writeToFile(view, "chart/views/views.csv");
    writeToFile(clone, "chart/clones/clones.csv");
  } catch (error) {
    logger.error(error.message);
  }
}

createCSv();
