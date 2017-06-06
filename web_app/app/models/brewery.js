import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	state: DS.attr('string'),
	beers: DS.attr(),
	liked: DS.attr(),
	unliked: DS.attr(),
	city: DS.attr('string'),
	country: DS.attr('string'),
	address: DS.attr('string'),


	// Computed properties
	beerCnt: Ember.computed('beers', function() {
		let beerProp = this.get('beers')

		return beerProp.length
	}).readOnly(),

	ratingPct: Ember.computed('liked', 'unliked', function() {
		let likedCnt = this.get('liked'),
				unlikedCnt = this.get('unliked'),
				rating = Math.round(likedCnt / ((likedCnt + unlikedCnt)/100));
    
    if (rating) {
    	return rating;
    } else {
    	return '-';
    }
  }).readOnly()
});
