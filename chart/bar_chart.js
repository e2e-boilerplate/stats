#!/usr/bin/env node
const d3 = require("d3");
const jsdom = require("jsdom");
const { writeFileSync } = require("fs");

function barChartSvg(data, path) {
  const { JSDOM } = jsdom;

  const { document } = new JSDOM("").window;
  global.document = document;

  const body = d3.select(document).select("body");

  const margin = { top: 20, right: 30, bottom: 40, left: 90 };
  const width = 700 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const y = d3.scaleBand().range([height, 0]).padding(0.1);
  const x = d3.scaleLinear().range([0, width]);

  const svg = body
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("xmlns", "http://www.w3.org/2000/svg")
    .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  x.domain([0, d3.max(data, (d) => d.value)]);
  y.domain(data.map((d) => d.name));

  svg
    .selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", (d) => x(d.value))
    .attr("y", (d) => y(d.name))
    .attr("height", y.bandwidth())
    .style("fill", "#f4c63d")
    .style("text-anchor", "end");

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x));

  svg.append("g").call(d3.axisLeft(y));

  writeFileSync(path, body.node().innerHTML);
}

export default barChartSvg;
