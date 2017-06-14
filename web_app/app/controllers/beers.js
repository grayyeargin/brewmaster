import Ember from 'ember';

export default Ember.Controller.extend({
	topBeers: Ember.computed('model.beers', function(){
		return this.get('model.beers').sortBy('name').slice(0,10)
	}),

	chartData: Ember.computed('model.styles', function(){
		let styles = this.get('model.styles'),
			dataArr = [];

		styles.forEach(function(style, idx){
			let styleId = style.get('id')

			if (style.get('beers.length') > 3) {
				dataArr.push({
					name: style.get('name'),
					total: style.get('beers.length'),
					id: idx + 1,
					styleId: styleId,
					group: 'medium'
				})
			}
		})

		return dataArr;
	})
});
