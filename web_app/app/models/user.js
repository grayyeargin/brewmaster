import DS from 'ember-data';

export default DS.Model.extend({
	username: DS.attr('string'),
	firstName: DS.attr('string'),
	lastName: DS.attr('string'),
	admin: DS.attr('boolean'),
	likedBeers: DS.hasMany('beer'),
	profileImg: DS.attr('string')
});
