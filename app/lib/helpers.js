module.exports = {
    dispatchBuilder: function dispatchBuilder(event, self) {
        return function(data) {
            self.dispatch(event, data);
        };
    },

    extractor: function extractor(data) {
        return data.results ? data.results : [data];
    }
};
