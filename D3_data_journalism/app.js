//  create a scatter plot between two of the data variables


// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);


// pull in data from csv

d3.csv("data/data.csv")
.then((healthData) => {
    console.log(healthData);

// Cast the healthcare value to a number for all data
healthData.forEach(function(d) {
    d.healthcare = +d.healthcare;
    d.obesity = +d.obesity;
  });

  //  Configure a linear scale for the horizontal axis 
var xscale = d3.scaleLinear()
    .domain(healthData.map(d => d.healthcare))
    .range([0, chartWidth]);

// Create a linear scale for the vertical axis.
var yscale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.obesity)])
    .range([chartHeight, 0]);

var bottomAxis = d3.axisBottom(xscale);
var leftAxis = d3.axisLeft(yscale);
  
  //   // Append two SVG group elements to the chartGroup area,
  //   // and create the bottom and left axes inside of them
chartGroup.append("g")
    .call(leftAxis);
  
chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
  



})