import barChartSvg from "./bar_chart";

const count = require("./referrers/count.json");
const unique = require("./referrers/unique.json");

const c = JSON.parse(JSON.stringify(count));
const u = JSON.parse(JSON.stringify(unique));

barChartSvg(c, "./chart/referrers/count.svg");
barChartSvg(u, "./chart/referrers/unique.svg");
