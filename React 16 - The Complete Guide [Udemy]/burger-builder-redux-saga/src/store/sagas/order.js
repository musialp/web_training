import { put } from 'redux-saga/effects';
import Axios from '../../axios-orders';

import * as actions from '../actions';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield Axios.post(`/orders.json?auth=${action.token}`, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch(error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* fetchOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`
    try {
        const response = yield Axios.get(`orders.json${queryParams}`)
        const orders = [];
        for (let key in response.data) {
            orders.push({
                ...response.data[key],
                id: key,
            });
        }
        yield put(actions.fetchOrdersSuccess(orders));
    } catch(error) {
        yield put(actions.fetchOrdesFail(error));
    }
}
