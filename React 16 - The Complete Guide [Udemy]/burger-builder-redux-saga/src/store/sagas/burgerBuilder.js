import { put } from 'redux-saga/effects';
import Axios from '../../axios-orders';

import * as actions from '../actions';

export function* initIngredientsSaga(action) {
    try {
        const response = yield Axios.get('/ingredients.json');
        yield put(actions.setIngredients(response.data));
    } catch (error) {
        yield put(actions.fetchIngredientsFailed());
    }
}
