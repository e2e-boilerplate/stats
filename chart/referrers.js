const count = require("../data/chart/referrer/count.json");
const unique = require("../data/chart/referrer/unique.json");
import barchartChartSvg from "./bar_chart";

const c = JSON.parse(JSON.stringify(count));
const u = JSON.parse(JSON.stringify(unique));

barchartChartSvg(c, './chart/referrers/count.svg');
barchartChartSvg(u, './chart/referrers/unique.svg');
