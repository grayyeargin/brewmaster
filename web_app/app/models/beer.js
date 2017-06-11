import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	logoImg: DS.attr(),
	_brewery: DS.belongsTo('brewery'),
	style: DS.belongsTo('style'),
	abv: DS.attr('string'),
	ibu: DS.attr('number'),
	calories: DS.attr('number'),
	description: DS.attr('string'),
	liked: DS.attr(),
	unliked: DS.attr()
});
