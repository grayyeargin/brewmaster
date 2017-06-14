import Ember from 'ember';
import * as d3 from 'd3';

export default Ember.Component.extend({
	didInsertElement() {
		this._super(...arguments);
		this.setChartWidth();
		let setUp = this.setUpChart();
		setUp(this.get('chartData'));
	},

	chartWidth: null,
	beers: null,

	setChartWidth() {
		let windowWidth = window.innerWidth;
		switch(true) {
			case windowWidth >= 1200:
				this.chartWidth = 950;
				return;
			case windowWidth >= 992:
				this.chartWidth = 850;
				return;
			default:
				this.chartWidth = 670;
				return;
		}
	},

	setUpChart() {
		let width = this.chartWidth,
				height = Math.round(width * .66),
				center = { x: width / 2, y: height / 2 },
				forceStrength = 0.03;

		let svg = null;
	  let bubbles = null;
	  let nodes = [];
	  let texts = null;

	  let precRound = d3.precisionRound(0.01, 1.01);
	  let numFormat = d3.format("." + precRound + "r");

	  let charge = (d) => {
    	return -Math.pow(d.radius, 2.1) * forceStrength;
  	}

  	let simulation = d3.forceSimulation()
	    .velocityDecay(0.2)
	    .force('x', d3.forceX().strength(forceStrength).x(center.x))
	    .force('y', d3.forceY().strength(forceStrength).y(center.y))
	    .force('charge', d3.forceManyBody().strength(charge))
	    .on('tick', ticked);

	  function ticked() {
	    bubbles
	      .attr('cx', function (d) { 
	      	let thisNode = d3.select('#text-' + d.id),
	      	transWidth = thisNode.node().getBBox().width ? thisNode.node().getBBox().width / 2 : 0;

	      		thisNode.attr('x', d.x)
	      		.style('font-size', numFormat(d.radius / 60) + 'em')
	      		.attr('transform', 'translate(-'+ transWidth +', 2)')
	      	return d.x; 
	      })
	      .attr('cy', function (d) {
	      	d3.select('#text-' + d.id)
	      		.attr('y', d.y) 
	      	return d.y; 
	      });
	  }

	  simulation.stop();

	  let fillColor = d3.scaleOrdinal()
    	.domain(['low', 'medium', 'high'])
    	.range(['#d84b2a', '#beccae', '#7aa25c']);


    let createNodes = (rawData) => {
    	let maxAmount = d3.max(rawData, function (d) { return +d.total; });

    	let radiusScale = d3.scalePow()
	      .exponent(0.5)
	      .range([10, 85])
	      .domain([0, maxAmount]);

	    let myNodes = rawData.map(function (d) {
	      return {
	        id: d.id,
	        styleId: d.styleId,
	        radius: radiusScale(+d.total),
	        value: +d.total,
	        name: d.name,
	        group: d.group,
	        x: Math.random() * 900,
	        y: Math.random() * 800
	      };
		  });

		  myNodes.sort(function (a, b) { return b.value - a.value; });

    	return myNodes;
    }

    let chart = (styleData) => {
    	if (!styleData) {
    		console.warn('BUBBLE-CHART: No data passed to chart');
    		return;
    	}

    	nodes = createNodes(styleData);

    	svg = d3.select('#style-bubble-d3')
	      .append('svg')
	      .attr('width', width)
	      .attr('height', height);

	    bubbles = svg.selectAll('.bubble')
      	.data(nodes, function (d) { return d.id; });

      texts = svg.selectAll('.texts')
      	.data(nodes, function (d) { return d.id; });

      let bubblesE = bubbles.enter().append('circle')
	      .classed('bubble', true)
	      .attr('r', 0)
	      .attr('data-id', function(d){ return d.styleId })
	      .attr('fill', function (d) { return fillColor(d.group); })
	      .attr('stroke', function (d) { return d3.rgb(fillColor(d.group)).darker(); })
	      .attr('stroke-width', 2)
	      .on('click', function(e){
					window.location = 'styles/'+e.styleId;
	      })

	    texts.enter().append('text')
	    	.classed('circle-text', true)
	    	.attr('id', function(d){return 'text-' + d.id})
	    	.text(function(d){return d.name})

	    bubbles = bubbles.merge(bubblesE);

	    bubbles.transition()
	      .duration(2000)
	      .attr('r', function (d) { return d.radius; });

	    simulation.nodes(nodes);

	    groupBubbles();

    } // end of chart function

 		let groupBubbles = () => {
 			simulation.force('x', d3.forceX().strength(forceStrength).x(center.x));

	    simulation.alpha(1).restart();
 		}

 		return chart;
	}
});
