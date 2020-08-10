import { request } from "https";
import { writeFileSync } from "fs";
import { logger, options, user } from "./constants";
import redacted from "../data/redacted/redacted.json";

/**
 * https://developer.github.com/v3/repos/traffic/#list-referrers
 * GET /repos/:owner/:repo/traffic/popular/referrers
 * repo: repository name
 */
export default  function getReferrersStats(repo) {
  try {
    const path = `/repos/${user}/${repo}/traffic/popular/referrers`;
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
        const isOk = response.statusCode === 200;
        const content = isOk ? JSON.parse(body) : "[]";
        if (isOk) {
          redacted.forEach((r, index) => {
            const { name } = r;
            if (name === repo) {
              redacted[index].referrers = content;
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

getReferrersStats();
