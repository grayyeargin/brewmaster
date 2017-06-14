import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
    	beers: this.get('store').query('beer', {
    		limit: 50
    	}),
    	styles: this.get('store').findAll('style')
    })
  }
});
