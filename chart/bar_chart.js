#!/usr/bin/env node
const d3 = require("d3");
const jsdom = require("jsdom");
const { writeFileSync } = require("fs");

function barchartChartSvg(data, path) {
  const { JSDOM } = jsdom;

  const max = Math.max.apply(
    Math,
    data.map(function (o) {
      return o.value;
    })
  );

  const { document } = new JSDOM("").window;
  global.document = document;

  const body = d3.select(document).select("body");

  const margin = { top: 20, right: 30, bottom: 40, left: 90 };
  const width = 700 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = body
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([0, max]).range([0, width]);
  //
  // svg
  //     .attr("xmlns", "http://www.w3.org/2000/svg")
  //     .attr("xmlns:xlink", "http://www.w3.org/1999/xlink");

  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .style("text-anchor", "end");

  const y = d3
    .scaleBand()
    .range([0, height])
    .domain(data.map((d) => d.name))
    .padding(0.1);

  svg.append("g").call(d3.axisLeft(y));

  svg
    .selectAll("myRect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x", x(0))
    .attr("y", (d) => y(d.name))
    .attr("width", (d) => x(d.value))
    .attr("height", y.bandwidth())
    // .attr("font-family", "sans-serif")
    // .attr("font-size", "14px")
    // .attr("fill", "#f4c63d")
    // .attr("text-anchor", "middle");

  writeFileSync(path, body.node().innerHTML);
}

export default barchartChartSvg;
