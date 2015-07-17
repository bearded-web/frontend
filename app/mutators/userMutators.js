/**
 * userMutators contain methods for work with users and
 * user data
 */

import { captureException } from '../lib/raven';
import wait from '../lib/wait';
import populate from '../lib/populate';

export async function fetchRecentUsers({ tree, api }) {
    try {
        const { results } = await api.users.list({
            limit: 5,
            sort: '-created'
        });
        populate(tree.select('users'), results);
        tree.commit();
    } catch (e) {
        captureException();
    }
}

export async function setPickerValue({ tree, api }, email) {
    const picker = tree.select('userPicker');
    picker.select('value').set(email);
    tree.commit();

    const usersCursor = tree.select('users');
    const listCursor = picker.select('users');
    const fetchDelay = picker.select('fetchDelay').get();


    if (!email) {
        listCursor.set([]);
        tree.commit();
        return;
    }

    const mark = Symbol('userPickerFetch');
    picker.select('symbol').set(mark);

    await wait(fetchDelay);
    if (picker.select('symbol').get() !== mark) {
        return;
    }

    try {
        const data = await api.users.list({ email });
        listCursor.set([]);
        data.results.forEach(t => {
            usersCursor.update({ [t.id]: { $set: t } });
            listCursor.push(t.id);
        });
    }
    catch (e) {
        captureException(e);
    }

    tree.commit();
}
