import { writeFileSync } from "fs";
import table from "markdown-table";
import { logger } from "./constants";
import { actionsStatusHome, bubbleSort } from "./utils";

function writeClone() {
  try {
    const redacted = require(`../data/redacted/redacted.json`);
    const clone = [];

    redacted.forEach((r) => {
      const row = [];
      const { count, uniques } = r.clones;
      row.push(count);
      row.push(uniques);
      row.push(actionsStatusHome(r.name));
      clone.push(row);
    });

    const content = bubbleSort(clone);
    content.unshift(["Clone counts", "Unique clones", "repository"]);

    const path = "docs/clone.md";
    writeFileSync(path, table(content, { align: "l" }), "utf8");
    logger.info(`Write ${path}`);
  } catch (error) {
    logger.error(error.message);
  }
}

writeClone();
