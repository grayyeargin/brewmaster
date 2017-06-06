import Ember from 'ember';

export default Ember.Controller.extend({
	showNavs: Ember.computed('currentRouteName', function() {
		if (this.get('currentRouteName') != 'index') {
			return true
		}
	})
});
