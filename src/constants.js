import minimist from "minimist";

let { pages = 3, task, token, user = "e2e-boilerplate" } = minimist(
  process.argv.slice(2)
);

const options = {
  host: "api.github.com",
  method: "GET",
  headers: {
    "user-agent": "node.js",
    "Content-Type": "application/json",
  },
};

const logger = require("pino")({
  prettyPrint: { colorize: true },
});

if (process.env.GITHUB_ACTIONS) {
  token = process.env.TOKEN;
}

if (token) {
  options.headers.Authorization = `token ${token}`;
}

export { logger, options, pages, task, token, user };
