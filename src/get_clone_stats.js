import { request } from "https";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import redacted from "../data/redacted/redacted.json";
import { logger, options, user } from "./constants";

/**
 * Implements: https://developer.github.com/v3/repos/traffic/#clones
 * GET /repos/:owner/:repo/traffic/clones
 * repo: repository name
 */
function getRepoClonesStats(repo) {
  try {
    const path = `/repos/${user}/${repo}/traffic/clones`;
    options.path = path;
    options.headers["X-Github-Username"] = "xgirma";
    delete options.headers["Content-Type"];

    const req = request(options, (response) => {
      let body = "";
      response.on("error", (error) => {
        throw error;
      });

      response.on("data", (chunk) => {
        body += chunk.toString("utf8");
      });

      response.on("end", () => {
        if (response.statusCode === 200) {
          const data = JSON.parse(body);
          const content = {
            count: data.count ? data.count : "",
            uniques: data.uniques ? data.uniques : "",
          };

          const folder = "data/redacted";

          if (!existsSync(folder)) {
            mkdirSync(folder);
          }

          redacted.forEach((r, index) => {
            const { name } = r;
            if (name === repo) {
              redacted[index].clones = { ...content };
            }
          });

          writeFileSync(
            `data/redacted/redacted.json`,
            JSON.stringify(redacted, null, 2),
            "utf8"
          );
          logger.info(`GET: ${path}.`);
        } else {
          logger.warn(`Not Found: ${path}. Code: ${response.statusCode}`);
        }
      });
    });

    req.on("error", (error) => {
      logger.error(error.message);
    });

    req.end();
  } catch (error) {
    logger.error(error.message);
  }
}

export default getRepoClonesStats;
