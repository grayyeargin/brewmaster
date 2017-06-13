import Ember from 'ember';

export default Ember.Controller.extend({
	topBeers: Ember.computed('model.beers', function(){
		return this.get('model.beers').sortBy('name').slice(0,10)
	})
});
