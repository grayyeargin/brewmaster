import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('breweries');

  this.route('breweries/brewery', { path: '/breweries/:brewery_id' })

  this.route('breweries/state')
});

export default Router;
