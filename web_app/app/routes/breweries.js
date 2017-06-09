import Ember from 'ember';

export default Ember.Route.extend({
	model() {
		return Ember.RSVP.hash({
    	breweries: this.get('store').findAll('brewery', {})
    })
  }
});
