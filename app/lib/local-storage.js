function getItem() {
    if (typeof window === 'undefined') return '';
    return window.localStorage.getItem.apply(window.localStorage, arguments);
}
function setItem() {
    if (typeof window === 'undefined') return;
    return window.localStorage.setItem.apply(window.localStorage, arguments);
}

export default {
    getItem,
    setItem
};
