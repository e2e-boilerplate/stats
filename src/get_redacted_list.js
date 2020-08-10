import { existsSync, mkdirSync, readdirSync, writeFileSync } from "fs";
import { logger } from "./constants";

export default function reposRedactedStat() {
  const list = [];
  const path = `data/redacted/`;

  try {
    const files = readdirSync("data/repos");

    for (let i = 1; i <= files.length; i += 1) {
      const details = require(`../data/repos/repo-${i}.json`);
      details.forEach((item) => {
        const {
          name,
          full_name,
          url,
          stargazers_count,
          watchers_count,
          forks_count,
          open_issues_count,
          forks,
          open_issues,
          watchers,
          size,
        } = item;

        list.push({
          name,
          full_name,
          url,
          stargazers_count,
          watchers_count,
          forks_count,
          open_issues_count,
          forks,
          open_issues,
          watchers,
          size,
          clones: {
            count: 0,
            uniques: 0,
          },
          referrers: [],
          view: {
            count: 0,
            uniques: 0,
          },
        });

        logger.info(`Redacted data from ${name}`);
      });
    }
  } catch (error) {
    logger.error(error.message);
  }

  try {
    if (!existsSync(path)) {
      mkdirSync(path);
    }

    const data = JSON.stringify(list, null, 2);
    writeFileSync(`${path}/redacted.json`, data, "utf8");
  } catch (error) {
    logger.error(error.message);
  }
}

reposRedactedStat();
