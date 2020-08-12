import minimist from "minimist";

const { pages = 3, task, token, user = "e2e-boilerplate" } = minimist(
  process.argv.slice(2)
);

let authToken;

if (token) {
  authToken = token;
}
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
  authToken = process.env.TOKEN;
}

// if (authToken) {
//   options.headers.Authorization = `token ${authToken}`;
// }

export { logger, options, pages, task, token, user };
