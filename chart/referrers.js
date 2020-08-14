import barChartSvg from "./bar_chart";

const count = require("../data/chart/referrer/count.json");
const unique = require("../data/chart/referrer/unique.json");

const c = JSON.parse(JSON.stringify(count));
const u = JSON.parse(JSON.stringify(unique));

barChartSvg(c, "./chart/referrers/count.svg");
barChartSvg(u, "./chart/referrers/unique.svg");
