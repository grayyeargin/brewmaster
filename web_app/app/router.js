import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  // Brewery routes
  this.route('breweries');
  this.route('breweries/state');
  this.route('breweries/brewery', { path: '/breweries/:brewery_id' });

  // Beer routes
  this.route('beers');
  this.route('beers/beer', { path: '/beers/:beer_id' });
  this.route('beers/style', { path: '/styles/:style_id' });
  this.route('login');
});

export default Router;
