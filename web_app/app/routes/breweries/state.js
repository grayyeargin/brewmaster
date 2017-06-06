import Ember from 'ember';

export default Ember.Route.extend({
	queryParams: {
    state: {
      refreshModel: true
    }
  },

  model(params) {
		return this.get('store').query('brewery', params);
	}
});
