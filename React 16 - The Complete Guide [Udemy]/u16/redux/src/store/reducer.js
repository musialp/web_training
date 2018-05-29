import * as actionTypes from './actions/actions';

const initialState = {
    counter: 0,
    results: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1,
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1,
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.value,
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.value,
            }
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({value: state.counter, id: new Date()}),
            }
        case actionTypes.DELETE_RESULT:
            return {
                ...state,
                results: state.results.filter(result => result.id !== action.id),
            }
        default:
            return state;
    }
};

export default reducer;