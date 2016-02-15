import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

    _modelToItem(inputModel, name) {
        const model = inputModel;

        if (model.attributes.oauth) {
            model.attributes.oauth = JSON.parse(model.attributes.oauth);
        }

        if (model.attributes.sync) {
            model.attributes.sync = JSON.parse(model.attributes.sync);
        }

        if (model.attributes.windows) {
            model.attributes.windows = JSON.parse(model.attributes.windows);
        }

        return this._super(model, name);
    },

    _serializeIfNecessary(inputData) {
        const data = inputData;

        if (data.events && data.events.length === 1 && data.events[0] === null) {
            data.events = [];
        }

        data.oauth = (data.oauth) ? JSON.stringify(data.oauth) : data.oauth;
        data.sync = (data.sync) ? JSON.stringify(data.sync) : data.sync;
        data.windows = (data.windows) ? JSON.stringify(data.windows) : data.windows;

        return this._super(data);
    },

    deleteRecord(store, type, snapshot) {
        const record = snapshot.record;
        return record.deleteAllEvents()
            .then(() => this._super(...arguments));
    }
});
