export function dispatchBuilder(event, self) {
    return function(data) {
        self.dispatch(event, data);
    };
}

export  function extractor(data) {
    return data.results ? data.results : [data];
}

export function nextTick(foo) {
	setTimeout(foo, 0);
}