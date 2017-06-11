import Ember from 'ember';

export default Ember.Route.extend({
	model(params) {
		return Ember.RSVP.hash({
			style: this.get('store').findRecord('style', params.style_id),
			beers: this.get('store').query('beer', {
				limit: 10,
				style: params.style_id
			})
		})
	}
});
