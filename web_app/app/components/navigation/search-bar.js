import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		searchClick(e) {
			this.fireSearch();
		}
	},

	keyPress(e) {
		if (e.which == 13) {
			e.preventDefault();
			this.fireSearch();
		}
	},

	fireSearch() {
		window.location = 'search?query=' + this.$('input').val()
	}
});
