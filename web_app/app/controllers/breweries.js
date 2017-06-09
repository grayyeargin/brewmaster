import Ember from 'ember';

export default Ember.Controller.extend({
	topBreweries: Ember.computed('model.breweries', function(){
		return this.get('model.breweries').sortBy('name').slice(0,10)
	})
});
