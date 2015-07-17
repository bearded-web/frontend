//TODO make export const
const all = 'registered|approved|waiting|paused|unavailable|blocked'.split('|');
export default all.reduce((a, s) => {
    a[s.toUpperCase()] = s;
    return a;
}, {});
