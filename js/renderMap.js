/*
 * COSI 116A: Information Visualization
 * In-class programming: D3 map of U.S. state borders
 * Author: Dylan Cashman
 */

var svgStates = d3.select("svg #states"),
    svgBoundary = d3.select("svg #boundary"),
    states = {},
    startYear = 1790,
    currentYear = startYear;

var width = 1200, // (1)
  height = 800;
var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]);  // (2)

var path = d3.geoPath()
    .projection(projection);  // (3)


d3.json("data/usa.json").then(function(boundary) {
 svgBoundary.selectAll("path")
     .data(boundary.features)
     .enter()
   .append("path")
     .attr("d", path)
});

let renderFunc = (yearIndex) => {
	d3.json("data/states.json").then(function(topologies) {  // (4)

	  var state = topojson.feature(topologies[yearIndex], topologies[yearIndex].objects.stdin);  // (5)
	  svgStates.selectAll("path").remove(); // cleanup
	  svgStates.selectAll("path")  // (6)
	      .data(state.features)
	      .enter()
	    .append("path")
	      .attr("d", path)
				.style("fill", function(d, i) { 
		      // console.log("d is ", d)
		      var name = d.properties.STATENAM.replace(" Territory", ""); 
		      return colors[name]; 
		    })
		    .append("svg:title")
			  .text(function(d) { return d.properties.STATENAM; });
	});
}

renderFunc(0)

let yearSelector=d3.select('#year-selector');

yearSelector.on("input", (event) => {
	let year = yearSelector.property("value");
	console.log("year selector changed to ", year);
	renderFunc(mapping[year]);
	d3.select('#year').html(year);
})

let mapping = {
	"1790": 0,
	"1800": 1,
	"1810": 2,
	"1820": 3,
	"1830": 4,
	"1840": 5,
	"1850": 6,
	"1860": 7,
	"1870": 8,
	"1880": 9,
	"1890": 10,
	"1900": 11,
	"1910": 12,
}
