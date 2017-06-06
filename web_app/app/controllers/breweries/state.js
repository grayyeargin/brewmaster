import Ember from 'ember';

export default Ember.Controller.extend({
	queryParams: ['state'],
	state: null,
	stateName: Ember.computed('state', function() {
		return this.get('state')
	})
});
