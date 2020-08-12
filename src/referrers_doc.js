import { writeFileSync } from "fs";
import table from "markdown-table";
import { logger } from "./constants";
import { actionsStatusHome, bubbleSort } from "./utils";

function getCount(stat) {
  let count = 0;
  stat.forEach((c) => {
    count += c.count;
  });
  return count;
}

function getUniques(temp) {
  let count = 0;
  temp.forEach((t) => {
    count += t.uniques;
  });
  return count;
}

function getReferrers(stat) {
  const refs = [];
  stat.sort();
  stat.forEach((ref) => {
    refs.push(ref.referrer);
  });
  return refs.join(", ");
}

function writeReferrers() {
  try {
    const redacted = require(`../data/redacted/redacted.json`);
    const clone = [];

    redacted.forEach((r) => {
      const row = [];
      const data = r.referrers;
      row.push(getCount(data));
      row.push(getUniques(data));
      row.push(getReferrers(data));
      row.push(actionsStatusHome(r.name));
      clone.push(row);
    });

    const content = bubbleSort(clone);
    content.unshift(["Count", "Unique", "Referrers", "Repository"]);

    const path = "docs/referrers.md";
    writeFileSync(path, table(content, { align: "l" }), "utf8");
    logger.info(`Write ${path}`);
  } catch (error) {
    logger.error(error.message);
  }
}

writeReferrers();
