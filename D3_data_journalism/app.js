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

// starting x axis selection and y axis selections
var xaxis_choice = "healthcare";
var yaxis_choice = "obesity";

function show_toolTip(circlesGroup, xaxis_choice, yaxis_choice) {
  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .html(function(d) {
      return (`${d.state}<br>${xaxis_choice}: ${d[xaxis_choice]}<br>${yaxis_choice}: ${d[yaxis_choice]}`);
  })

  circlesGroup.call(toolTip);

  circlesGroup.on("mouseover", function(d) {
    toolTip.show(d);
  })

  circlesGroup.on("mouseout", function(d) {
    toolTip.hide(d);
  })
}


// pull in data from csv

d3.csv("data/data.csv")
.then((healthData) => {
    console.log(healthData);

    // Cast the healthcare value to a number for all data
    healthData.forEach(function(d) {
        d.healthcare = +d.healthcare;
        d.income = +d.income;
        d.age = +d.age;
        d.obesity = +d.obesity;
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
      
    });

    // Create a linear scale for the horizontal axis 
    var xscale = d3.scaleLinear()
        .domain([0.9*(d3.min(healthData, d => d[xaxis_choice])), 1.1*(d3.max(healthData, d => d[xaxis_choice]))])
        .range([0, chartWidth]);
    
    // Create a linear scale for the vertical axis.
    var yscale = d3.scaleLinear()
        .domain([0.9*(d3.min(healthData, d => d[yaxis_choice])),1.1*(d3.max(healthData, d => d[yaxis_choice]))])
        .range([chartHeight, 0]);
       

    var bottomAxis = d3.axisBottom(xscale);
    var leftAxis = d3.axisLeft(yscale);
    
    //   // Append two SVG group elements to the chartGroup area,
    //   // and create the bottom and left axes inside of them
    var y_axis = chartGroup.append("g")
        .call(leftAxis);
  
    var x_axis = chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    
    //   // Create one SVG circle per piece of healthdata
    
    // append initial circles 
    // source: https://stackoverflow.com/questions/49882951/labels-for-circles-not-showing-up-in-d3-data-visualization
    var circlesGroup = chartGroup.selectAll("circle")
      .data(healthData)
      .enter()
      .append('g')

      
     var circles_append = circlesGroup.append("circle")
      .attr("cx", d => xscale(d[xaxis_choice]))
      .attr("cy", d => yscale(d[yaxis_choice]))
      .attr("r", 10)
      .attr("class", "stateCircle");
   

    // add text to circles 
    // source: https://stackoverflow.com/questions/49882951/labels-for-circles-not-showing-up-in-d3-data-visualization
   
    var circle_text = circlesGroup.append("text")
      .text( d => d.abbr)
      .attr("transform", d => `translate(${xscale(d[xaxis_choice])}, ${yscale(d[yaxis_choice])})`)
      .attr("dy", 4)
      .attr("class", "stateText")
      .attr("font-size", "10px");

      // Create group for two x-axis labels
    var xlabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${chartWidth / 2}, ${chartHeight})`);

    var ylabelsGroup = chartGroup.append("g")
      .attr("transform", `translate(0, ${chartHeight/2})`);


    // // append y axis labels
    // // source: http://www.d3noob.org/2012/12/adding-axis-labels-to-d3js-graph.html
    var y_axis_labels = ["Obesity (%)", "Smokes (%)", "In Poverty (%)"];
    var y_axis_classes = ["obesity", "smokes", "poverty"];

    for (var i = 0; i<y_axis_labels.length; i++) {
      if (i>0) {

        ylabelsGroup.append("text")
      .text(y_axis_labels[i])
      .attr("transform", "rotate(-90)")
      .attr("y", 30*[i] - (chartMargin.left))
      .attr("x", 0)
      .attr("dy", "1em")
      // .style("text-anchor", "middle")
      .attr("value", y_axis_classes[i])
      .classed("inactive", true);
      }
      // start with one x axis label active
      else {
        ylabelsGroup.append("text")
      .text(y_axis_labels[i])
      .attr("transform", "rotate(-90)")
      .attr("y", 30*[i] - (chartMargin.left))
      .attr("x",0)
      .attr("dy", "1em")
      // .style("text-anchor", "middle")
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
        xlabelsGroup.append("text")
          .attr("transform", `translate(0, ${ (chartMargin.top+30*i) })`)
          // .style("text-anchor", "middle")
          .text(x_axis_labels[i])
          .attr("value", x_axis_classes[i])
          .classed("inactive", true);
      }
      // start with one x axis label active
      else {
        xlabelsGroup.append("text")
          .attr("transform", `translate(0, ${(chartMargin.top+30*i) })`)
          // .style("text-anchor", "middle")
          .text(x_axis_labels[i])
          .attr("value", x_axis_classes[i])
          .classed("active", true);
      }
      
    }

    var circles_tip = show_toolTip(circlesGroup, xaxis_choice, yaxis_choice);

     // x axis labels event listener
     xlabelsGroup.selectAll("text")
      .on("click", function() {

        var x_selection = d3.select(this).attr("value");
        
        if (x_selection !== xaxis_choice) {
          // update x axis based on selection
          xscale = d3.scaleLinear()
            .domain([0.9*(d3.min(healthData, d => d[x_selection])), 1.1*(d3.max(healthData, d => d[x_selection]))])
            .range([0, chartWidth]);

          bottomAxis = d3.axisBottom(xscale);
          x_axis.transition()
          .duration(300)
          .call(bottomAxis);

          // make chosen axis 'active' and old axis 'inactive'
          // source: https://stackoverflow.com/questions/20414980/d3-select-by-attribute-value/20415013
          var old_x_axis = d3.select(`[value = ${xaxis_choice}]`);
          old_x_axis.attr("class", "inactive");

          var chosen_x_axis = d3.select(this);
          chosen_x_axis.attr("class", "active");

          // reset xaxis choice to new selection
          xaxis_choice = x_selection;

          // update circles and text
          circles_append.transition()
          .duration(500)
          .attr("cx", d => xscale(d[xaxis_choice]));

          circle_text.transition()
          .duration(500)
          .attr("transform", d => `translate(${xscale(d[xaxis_choice])}, ${yscale(d[yaxis_choice])})`)

          circles_tip = show_toolTip(circlesGroup, xaxis_choice, yaxis_choice);
        }

      })

    // y axis labels event listener
    ylabelsGroup.selectAll("text")
      .on("click", function() {

        var y_selection = d3.select(this).attr("value");
        
        if (y_selection !== yaxis_choice) {
          // update y axis based on selection
          yscale = d3.scaleLinear()
          .domain([0.9*(d3.min(healthData, d => d[y_selection])), 1.1*(d3.max(healthData, d => d[y_selection]))])
          .range([chartHeight, 0]);

          leftAxis = d3.axisLeft(yscale);
          y_axis.transition()
          .duration(1000)
          .call(leftAxis);

          // make chosen axis 'active' and old axis 'inactive'
          // source: https://stackoverflow.com/questions/20414980/d3-select-by-attribute-value/20415013
          var old_y_axis = d3.select(`[value = ${yaxis_choice}]`);
          old_y_axis.attr("class", "inactive");

          var chosen_y_axis = d3.select(this);
          chosen_y_axis.attr("class", "active");

          // reset xaxis choice to new selection
          yaxis_choice = y_selection;

          // update circles and text
          circles_append.transition()
          .duration(1000)
          .attr("cy", d => yscale(d[yaxis_choice]));

          circle_text.transition()
          .duration(1000)
          .attr("transform", d => `translate(${xscale(d[xaxis_choice])}, ${yscale(d[yaxis_choice])})`)

          circles_tip = show_toolTip(circlesGroup, xaxis_choice, yaxis_choice);
        }
      })


})