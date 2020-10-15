# D3-challenge

## Challenge Details

This challenge was to create an interactive scatter plot comparing different health and demographic factors for all the states in the country. D3.js was utilized to pull in data from a csv and plot this data. In order to plot this information, data binding was employed, which dictated where the data points would be plotted.

## About the Scatter Plot

Each state is plotted in the chart with a circle data marker and the specifc state abbreviation is shown.

When examining the plot, the user can hover over any point and a pop-up will appear, showing the full state name, as well as the specific values for both the x and y axis. When the user moves their mouse off of the data point, the pop-up will disappear.

The user can also choose which data to see. There are 3 choices for both the x and y axes. Clicking on a grayed-out (or inactive) axis label will cause the plot (both the axis and the circles) to transition to the desired data. This action will happen when any of the inactive axis labels (on either the x or y axis) is selected.

## About the page

In addition to the plot updating when the user selects new axes, the information below the plot will also update when a new x-axis label is chosen. The section that is highlighted in blue (active state) will reflect the information that can be seen in the plot.

If the user selects the D3 Times in the upper left corner of the page, the page will refresh.

## Files included

All files in this challenge can be found in the D3_data_journalism folder. This includes:

* index.html file which can be viewed using a live server or by using command python -m http.server in command line
* app.js which holds all the functions in order to display the scatter plot and update the data inside as the user makes different selections
* css folder which holds all the css files to make the page appear as seen by the user, as well as the tool tips details (needed for plot pop-ups)
* data folder, which holds the data csv for this project - based on 2014 ACS 1-year estimates from data.census.gov
