const {
  author = "Girma Nigusse <xgirma@gmail.com>",
  command,
  keywords,
  message,
  module,
  pages,
  task,
  token,
  user = "e2e-boilerplate",
} = minimist(process.argv.slice(2));

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

export {
  author,
  command,
  keywords,
  logger,
  message,
  module,
  options,
  pages,
  task,
  user,
};
