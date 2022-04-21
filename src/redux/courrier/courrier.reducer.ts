/**
 * Project YooLearn
 * File user.reducer
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import CourrierActionsType from './courrier.types';

interface UseActionsInterface {
    payload?: any;
    type: string;
}

const INITIAL_STATE = {
    loading: false,
    result: null,
    error: null,
};

export const getAllCourrierReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case CourrierActionsType.GET_ALL_COURRIER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case CourrierActionsType.GET_ALL_COURRIER_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case CourrierActionsType.GET_ALL_COURRIER_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case CourrierActionsType.GET_ALL_COURRIER_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const createCourrierReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case CourrierActionsType.CREATE_COURRIER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case CourrierActionsType.CREATE_COURRIER_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case CourrierActionsType.CREATE_COURRIER_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case CourrierActionsType.CREATE_COURRIER_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const updateCourrierReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case CourrierActionsType.UPDATE_COURRIER_PENDING:
            return {
                ...state,
                loading: true,
            };
        case CourrierActionsType.UPDATE_COURRIER_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case CourrierActionsType.UPDATE_COURRIER_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case CourrierActionsType.UPDATE_COURRIER_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};
