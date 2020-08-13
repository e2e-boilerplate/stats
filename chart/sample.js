import { writeFileSync } from "fs";
import { logger } from "../src/constants";

function prepareSample(obj) {
  const sample = [];
  const names = Object.getOwnPropertyNames(obj);
  names.forEach((name) => {
    sample.push({
      name,
      value: obj[name],
    });
  });

  return sample;
}

function getSample() {
  try {
    const redacted = require(`../data/redacted/redacted.json`);
    const countData = {};
    const uniqueData = {};

    redacted.forEach((r) => {
      const { referrers } = r;
      referrers.forEach((item) => {
        const { referrer, count, uniques } = item;

        if (countData.hasOwnProperty(referrer)) {
          countData[referrer] += count;
          uniqueData[referrer] += uniques;
        } else {
          countData[referrer] = count;
          uniqueData[referrer] = uniques;
        }
      });
    });

    const formattedCount = prepareSample(countData);
    formattedCount.sort((a, b) => (a.value > b.value ? 1 : -1));
    const contentCount = JSON.stringify(formattedCount, null, 2);


    const formattedUnique = prepareSample(uniqueData);
    formattedUnique.sort((a, b) => (a.value > b.value ? 1 : -1));
    const contentUnique = JSON.stringify(formattedUnique, null, 2);

    writeFileSync("data/chart/referrer/count.json", contentCount, "utf8");
    writeFileSync("data/chart/referrer/unique.json", contentUnique, "utf8");
  } catch (error) {
    logger.error(error.message);
  }
}

getSample();
