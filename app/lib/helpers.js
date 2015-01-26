module.exports = {
    dispatchBuilder: function dispatchBuilder(event, self) {
        return function(data) {
            self.dispatch(event, data);
        };
    }
};
