//var supportedCountries = ["Germany", "Italy", "Greece", "Bulgaria", "Switzerland", "Hungary"];
//
//var width = $("#vis").width(), height = 650, centered;
//
//var projection = d3.geo.mercator().center([13, 52]).scale(700);
//var path = d3.geo.path().projection(projection);
//
//var svg = d3.select("#vis")
//			.append("svg")
//			.attr("width", width)
//			.attr("height", height);
//
//d3.json("res/europe.geojson", function(json) {
//	svg.append("svg:g").attr("class", "tracts")
//		.selectAll("path").data(json.features)
//		.enter().append("svg:path").attr("d", path)
//		.attr("fill-opacity", 1)
//		.attr("fill", generateFill)
//		.attr("stroke", "#222")
//		.on("click", zoomIn)
//		.on("mouseover", function(d3Obj) {
//			if(isCountrySupported(d3Obj)) {
//				d3.select(this)
//                    .style("fill", "#fff200")
//                    .style("cursor","pointer");
//			}
//		})
//		.on("mouseout", function(d3Obj) {
//			if(isCountrySupported(d3Obj)) {
//				d3.select(this).style("fill", "#44c0e4");
//			}
//		})
//});
//
//function generateFill(d3Obj) {
//	if(isCountrySupported(d3Obj)) {
//		return "#44c0e4";
//	}
//	return "lightgray";
//}
//
//function zoomIn(d3Obj) {
//
//	if(!isCountrySupported(d3Obj)) {
//		return;
//	}
//    $('#myModal').modal();
//}
//
//function isCountrySupported(d3Obj) {
//	return $.inArray(d3Obj.properties["NAME"], supportedCountries) != -1;
//}



// Load the fonts
Highcharts.createElement('link', {
    href: '//fonts.googleapis.com/css?family=Dosis:400,600',
    rel: 'stylesheet',
    type: 'text/css'
}, null, document.getElementsByTagName('head')[0]);

Highcharts.theme = {
    colors: ["#7cb5ec", "#f7a35c", "#90ee7e", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
        "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
    chart: {
        backgroundColor: "white",
        style: {
            fontFamily: "Dosis, sans-serif"
        }
    },
    title: {
        style: {
            fontSize: '16px',
            fontWeight: 'bold',
            textTransform: 'uppercase'
        }
    },
    tooltip: {
        borderWidth: 0,
        backgroundColor: 'rgba(219,219,216,0.8)',
        shadow: false,
        display:'none'
    },
    legend: {
        itemStyle: {
            fontWeight: 'bold',
            fontSize: '13px'
        }
    },
    xAxis: {
        gridLineWidth: 1,
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    yAxis: {
        minorTickInterval: 'auto',
        title: {
            style: {
                textTransform: 'uppercase'
            }
        },
        labels: {
            style: {
                fontSize: '12px'
            }
        }
    },
    plotOptions: {
        candlestick: {
            lineColor: '#404048'
        }
    },


    // General
    background2: '#F0F0EA'

};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);

$(function () {

    function displayCountry(data)
    {
        $("#map").addClass("activated");
        $(".country").hide();
        $("#"+data.point.code).fadeIn();
        data.point.color="#fdd017";

        var map = $('#vis').highcharts(),
            points = map.series[0].points;
        for(var i in points) {
            if (data.point.code == points[i].code)
                points[i].update({"color":"#fdd017"},false);
            else
            {
                points[i].update({"color":null},false);
            }
        }
        map.redraw();
    }

    // Instanciate the map
    $('#vis').highcharts('Map', {
        chart : {borderWidth : 0},
        title : {text : ''},
        subtitle : {text : ''},
        legend: {enabled: false},
        series : [{
            name: 'Xώρα',
            mapData: Highcharts.maps['custom/europe'],
            data: [
                {
                code: 'DE',
                value: 1,
                events:{click: displayCountry}
            }, {
                code: 'IT',
                value: 1,
                events:{click: displayCountry}
            }, {
                code: 'GR',
                value: 1,
                events:{click: displayCountry}
            }, {
                code: 'BG',
                value: 1,
                events:{click: displayCountry}
            }, {
                code: 'CH',
                value: 1,
                events:{click: displayCountry}
            },
                {
                code: 'HU',
                value: 1,
                events:{click: displayCountry}
            }],
            joinBy: ['iso-a2', 'code'],

            dataLabels: {
                enabled: true,
                color: 'black',
                formatter: function () {
                    if (this.point.value) {
                        switch (this.point.code){
                            case "DE":
                                return "Γερμανία";
                            case "IT":
                                return "Ιταλία";
                            case "GR":
                                return "Ελλάδα";
                            case "BG":
                                return "Βουλγαρία";
                            case "CH":
                                return "Ελβετία";
                            case "HU":
                                return "Ουγγαρία";
                        }
                    }
                }
            },
            tooltip: {
                enabled: false
            }
        }],
        tooltip: {
            enabled: false
        }
    });

});