import DS from 'ember-data';

export default DS.JSONSerializer.extend(DS.EmbeddedRecordsMixin, {
	primaryKey: '_id',
  attrs: {
    brewery: { embedded: 'always' },
    style: { embedded: 'always' }
  }
});