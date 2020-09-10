//  create a scatter plot between two of the data variables


// Define SVG area dimensions
var svgWidth = 800;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 40,
  right: 40,
  bottom: 120,
  left: 120
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
        d.poverty = +d.poverty;
    });

    // Create a linear scale for the horizontal axis 
    var xscale = d3.scaleLinear()
        .domain([3, d3.max(healthData, d => d.healthcare)])
        .range([0, chartWidth]);

    // Create a linear scale for the vertical axis.
    var yscale = d3.scaleLinear()
        .domain([20, d3.max(healthData, d => d.obesity)])
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
    
    //   // Create one SVG circle per piece of healthdata
    
    // append initial circles 
    // source: https://stackoverflow.com/questions/49882951/labels-for-circles-not-showing-up-in-d3-data-visualization
    var circlesGroup = chartGroup.selectAll("circle")
      .data(healthData)
      .enter()
      .append('g')

      
      circlesGroup.append("circle")
      .attr("cx", d => xscale(d.healthcare))
      .attr("cy", d => yscale(d.obesity))
      .attr("r", 10)
      .attr("fill", "lightblue")
      .attr("opacity", "1");

    // add text to circles 
    // source: https://stackoverflow.com/questions/49882951/labels-for-circles-not-showing-up-in-d3-data-visualization
   
    circlesGroup.append("text")
      // .classed("center", true)
      .text( d => d.abbr)
      .attr("transform", d => `translate(${xscale(d.healthcare) - 6}, ${yscale(d.obesity)+4})`)
      // .attr("y", d => yscale(d.obesity))
      .attr("font-family", "sans-serif")
      .attr("font-size", "10px")
      .attr("fill", "white");

    // // append y axis labels
    // // source: http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
    var y_axis_labels = ["Obesity (%)", "Smokes (%)", "In Poverty (%)"];
    var y_axis_classes = ["obesity", "smokes", "poverty"];

    for (var i = 0; i<y_axis_labels.length; i++) {
      if (i>0) {

      chartGroup.append("text")
      .text(y_axis_labels[i])
      .attr("transform", "rotate(-90)")
      .attr("y", 30*[i] - (chartMargin.left))
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("value", y_axis_classes[i])
      .classed("inactive", true);
      }
      // start with one x axis label active
      else {
      chartGroup.append("text")
      .text(y_axis_labels[i])
      .attr("transform", "rotate(-90)")
      .attr("y", 30*[i] - (chartMargin.left))
      .attr("x", 0 - (chartHeight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr("value", y_axis_classes[i])
      .classed("active", true);

      }
   }

    // // append x axis labels
    // // source: http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
    var x_axis_labels = ["Healthcare (%)", "Household Income (Median)", "Age (Median)"];
    var x_axis_classes = ["healthcare", "income", "age"];

    for (var i = 0; i<x_axis_labels.length; i++) {
      
      if (i>0) {
      chartGroup.append("text")
      .attr("transform", `translate(${chartWidth/2}, ${chartHeight + (chartMargin.top+30*i) })`)
      .style("text-anchor", "middle")
      .text(x_axis_labels[i])
      .attr("value", x_axis_classes[i])
      .classed("inactive", true);
      }
      // start with one x axis label active
      else {
        chartGroup.append("text")
      .attr("transform", `translate(${chartWidth/2}, ${chartHeight + (chartMargin.top+30*i) })`)
      .style("text-anchor", "middle")
      .text(x_axis_labels[i])
      .attr("value", x_axis_classes[i])
      .classed("active", true);

      }

      
    }

    // d3.select("#age").on("click", updateData);

    // function updateData() {
    //   console.log("clicked")
    // }

})