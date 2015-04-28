var supportedCountries = ["Germany", "Italy", "Greece", "Bulgaria", "Switzerland", "Hungary"];

var width = $("#vis").width(), height = 650, centered;

var projection = d3.geo.mercator().center([28, 45]).scale(700);
var path = d3.geo.path().projection(projection);

var svg = d3.select("#vis")
			.append("svg")
			.attr("width", width)
			.attr("height", height);

d3.json("res/europe.geojson", function(json) {
	svg.append("svg:g").attr("class", "tracts")
		.selectAll("path").data(json.features)
		.enter().append("svg:path").attr("d", path)
		.attr("fill-opacity", 1)
		.attr("fill", generateFill)
		.attr("stroke", "#222")
		.on("click", zoomIn)
});

function generateFill(d3Obj) {
	if(isCountrySupported(d3Obj)) {
		return "#44c0e4";
	}
	return "lightgray";
}

function zoomIn(d3Obj) {
	if(!isCountrySupported(d3Obj)) {
		return;
	}
	var x, y, k;

	if (d3Obj && centered !== d3Obj) {
		var centroid = path.centroid(d3Obj);
		x = centroid[0];
		y = centroid[1];
		k = 2;
		centered = d3Obj;
	} else {
		x = width / 2;
		y = height / 2;
		k = 1;
		centered = null;
	}

	svg.selectAll("path")
		.classed("active", centered && function(d3Obj) { return d3Obj === centered; });

	svg.transition()
		.duration(750)
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")scale(" + k + ")translate(" + -x + "," + -y + ")")
		.style("stroke-width", 1.5 / k + "px");
	
}

function isCountrySupported(d3Obj) {
	return $.inArray(d3Obj.properties["NAME"], supportedCountries) != -1;
}
