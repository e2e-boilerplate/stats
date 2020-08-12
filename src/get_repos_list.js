import { writeFileSync, existsSync, mkdirSync } from "fs";
import { request } from "https";
import isNumeric from "./utils";

import { user, pages, logger, options } from "./constants";

/**
 * Implements: https://developer.github.com/v3/repos/#list-repositories-for-the-authenticated-user
 * GET /users/:username/repos
 */
export default function getReposList() {
  try {
    const count = isNumeric(pages) ? pages : 2;

    for (let i = 0; i < count; i += 1) {
      const path = `/users/${user}/repos?page=${i + 1}&per_page=100`;
      options.path = path;

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
          const content = isOk ? JSON.parse(JSON.stringify(body)) : "[]";
          if (isOk && content !== "[]") {
            const folder = "data/repos";
            if (!existsSync(folder)) {
              mkdirSync(folder);
            }

            writeFileSync(`${folder}/repo-${i + 1}.json`, content, "utf8");
            logger.info(`GET: ${path}.`);
          } else {
            logger.warn(`Not Found: ${path}.`);
          }
        });
      });

      req.on("error", (error) => {
        throw error;
      });

      req.end();
    }
  } catch (error) {
    logger.error(error.message);
  }
  
  if(process.env.GITHUB_ACTIONS) {
    console.log('start')
    console.log(process.env.token)
    console.log('end')
  }
}

getReposList();
