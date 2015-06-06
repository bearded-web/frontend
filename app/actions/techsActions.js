import { techs } from '../lib/api3';
import { dispatch } from '../lib/disp';
import C from '../constants';
import { captureException } from '../lib/raven';

export async function fetchForTarget(target) {
    try {
        const data = await techs.list({ target: target.get('id') });
        dispatch(C.TECHS_FETCH_SUCCESS, data);
    }
    catch (error) {
        captureException(error);
    }

}
