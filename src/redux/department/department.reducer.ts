/**
 * Project YooLearn
 * File user.reducer
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import DepartmentActionsType from './department.types';

interface UseActionsInterface {
    payload?: any;
    type: string;
}

const INITIAL_STATE = {
    loading: false,
    result: null,
    error: null,
};

export const createDepartmentReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case DepartmentActionsType.CREATE_DEPARTMENT_PENDING:
            return {
                ...state,
                loading: true,
            };
        case DepartmentActionsType.CREATE_DEPARTMENT_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case DepartmentActionsType.CREATE_DEPARTMENT_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case DepartmentActionsType.CREATE_DEPARTMENT_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const getAllDepartmentReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case DepartmentActionsType.GET_ALL_DEPARTMENT_PENDING:
            return {
                ...state,
                loading: true,
            };
        case DepartmentActionsType.GET_ALL_DEPARTMENT_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case DepartmentActionsType.GET_ALL_DEPARTMENT_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case DepartmentActionsType.GET_ALL_DEPARTMENT_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const updateDepartmentReducer = (
    state = INITIAL_STATE,
    action: UseActionsInterface,
) => {
    switch (action.type) {
        case DepartmentActionsType.UPDATE_DEPARTMENT_PENDING:
            return {
                ...state,
                loading: true,
            };
        case DepartmentActionsType.UPDATE_DEPARTMENT_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case DepartmentActionsType.UPDATE_DEPARTMENT_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case DepartmentActionsType.UPDATE_DEPARTMENT_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};