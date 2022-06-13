/**
 * Project YooLearn
 * File user.reducer
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */

import SocietyActionsType from "./society.types";

interface UseActionsInterface {
    payload?: any;
    type: string;
}

const INITIAL_STATE = {
    loading: false,
    result: null,
    error: null,
};

export const createSocietyReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case SocietyActionsType.CREATE_SOCIETY_PENDING:
            return {
                ...state,
                loading: true,
            };
        case SocietyActionsType.CREATE_SOCIETY_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case SocietyActionsType.CREATE_SOCIETY_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case SocietyActionsType.CREATE_SOCIETY_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const getAllSocietyReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case SocietyActionsType.GET_ALL_SOCIETY_PENDING:
            return {
                ...state,
                loading: true,
            };
        case SocietyActionsType.GET_ALL_SOCIETY_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case SocietyActionsType.GET_ALL_SOCIETY_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case SocietyActionsType.GET_ALL_SOCIETY_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const updateSocietyReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case SocietyActionsType.UPDATE_SOCIETY_PENDING:
            return {
                ...state,
                loading: true,
            };
        case SocietyActionsType.UPDATE_SOCIETY_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case SocietyActionsType.UPDATE_SOCIETY_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case SocietyActionsType.UPDATE_SOCIETY_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};