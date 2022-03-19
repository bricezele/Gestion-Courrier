/**
 * Project YooLearn
 * File user.reducer
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import UserActionsType from './user.types';

interface UseActionsInterface {
    payload?: any;
    type: string;
}

const INITIAL_STATE = {
    loading: false,
    result: null,
    error: null,
};

export const signUpReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case UserActionsType.SIGN_UP_PENDING:
            return {
                ...state,
                loading: true,
            };
        case UserActionsType.SIGN_UP_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case UserActionsType.SIGN_UP_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case UserActionsType.SIGN_UP_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const getAllUserReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case UserActionsType.GET_ALL_USER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case UserActionsType.GET_ALL_USER_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case UserActionsType.GET_ALL_USER_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case UserActionsType.GET_ALL_USER_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const findByEmailReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case UserActionsType.FIND_BY_EMAIL_PENDING:
            return {
                ...state,
                loading: true,
            };
        case UserActionsType.FIND_BY_EMAIL_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case UserActionsType.FIND_BY_EMAIL_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case UserActionsType.FIND_BY_EMAIL_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const updateUserReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case UserActionsType.UPDATE_USER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case UserActionsType.UPDATE_USER_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case UserActionsType.UPDATE_USER_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case UserActionsType.UPDATE_USER_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const checkUserExistReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case UserActionsType.CHECK_IF_USER_EXIST_PENDING:
            return {
                ...state,
                loading: true,
            };
        case UserActionsType.CHECK_IF_USER_EXIST_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case UserActionsType.CHECK_IF_USER_EXIST_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case UserActionsType.CHECK_IF_USER_EXIST_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};
