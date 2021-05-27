import { GET_CONSULT_SUCCESS, GET_CONSULT_REQUEST, GET_CONSULT_FAILURE, VIEW_CONSULT } from "../actions/consultAction";

// Initial State
const initialState = {

};

const consultListReducer = (state = initialState, action) => {
    console.log(' consult list reducer', action.type);

    switch (action.type) {
        case GET_CONSULT_REQUEST: {
            return {
                ...state,
                loading: true
            }
        };
        case GET_CONSULT_FAILURE: {
            return {
                ...state,
                loading: false
            }
        };
        case GET_CONSULT_SUCCESS: {
            return {
                ...state,
                loading: false,
                consultList: action.payload
            }
        };
        default: {
            return state;
        }
    }
};

export default consultListReducer;