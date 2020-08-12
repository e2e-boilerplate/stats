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
      row.push(r.stargazers_count);
      row.push(actionsStatusHome(r.name));
      clone.push(row);
    });

    const content = bubbleSort(clone);
    content.unshift(["Stargazers count", "Repository"]);

    const path = "docs/stargazers.md";
    writeFileSync(path, table(content, { align: "l" }), "utf8");
    logger.info(`Write ${path}`);
  } catch (error) {
    logger.error(error.message);
  }
}

writeClone();
