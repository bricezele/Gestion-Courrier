/**
 * Project YooLearn
 * File oauth.reducer
 * Path app/redux/oauth
 * Created by BRICE ZELE
 * Date: 13/09/2021
 */
import AuthActions from "./oauth.types";


const INITIAL_STATE = {
    loading: false,
    result: null,
    error: null,
};

export const oauthReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /*        case REHYDRATE:
                    return !_.isNil(action.payload) ? action.payload.authKeyReducer : INITIAL_STATE;*/

        case AuthActions.AUTH_KEY_PENDING:
            return {
                ...state,
                loading: true
            }
        case AuthActions.AUTH_KEY_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null
            }
        case AuthActions.AUTH_KEY_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload
            }

        case AuthActions.AUTH_KEY_RESET:
            return INITIAL_STATE;

        default:
            return state

    }
};
