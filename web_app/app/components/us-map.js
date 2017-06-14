import Ember from 'ember';
import * as d3 from 'd3';

export default Ember.Component.extend({
	didInsertElement() {
		this._super(...arguments);
		this.setMapWidth();
		this.drawMap();
	},

	mapWidth: null,
	scale: null,
	
	// Sets mapWidth value to use in sizing initial map and on window resize
	setMapWidth() {
		let windowWidth = window.innerWidth;
		switch(true) {
			case windowWidth >= 1200:
				this.mapWidth = 950;
				this.scale = 950;
				return;
			case windowWidth >= 992:
				this.mapWidth = 850;
				this.scale = 850;
				return;
			default:
				this.mapWidth = 670;
				this.scale = 670;
				return;
		}
	},

	// Draws the map of US
	drawMap() {
		let width = this.mapWidth,
				height = width / 2,
				scale = this.scale;

		let projection = d3.geoAlbers()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([scale]);          // scale things down so see entire US
        
		// Define path generator
		let path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
				  	 .projection(projection);  // tell path generator to use albersUsa projection


		let svg = d3.select("#us-map-d3")
								.append("svg")
								.attr("width", width)
								.attr("height", height);


		d3.json("us-states.json", function(us) {

		  svg.selectAll("path")
				.data(us.features)
				.enter()
				.append("path")
				.attr("class", "states")
				.attr("d", path)
				.style("stroke", "#fff")
				.style("stroke-width", "1")
				.on("click", function(){
					let stateName = this.__data__.properties.name;
					window.location = 'breweries/state?state=' + stateName;
				})

		});

	}

});
