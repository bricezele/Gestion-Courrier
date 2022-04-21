/**
 * Project yoolearn-mobile
 * File common.reducer
 * Path app/redux/common
 * Created by BRICE ZELE
 * Date: 30/09/2021
 */
import CommonActionsType from './common.types';

interface CommentReducerInterface {
    payload?: any;
    type: string;
}

const INITIAL_STATE = {
    loading: false,
    result: null,
    error: null,
};

export const fileUploadReducer = (
    state = INITIAL_STATE,
    action: CommentReducerInterface,
) => {
    switch (action.type) {
        case CommonActionsType.FILE_UPLOAD_PENDING:
            return {
                ...state,
                loading: true,
            };
        case CommonActionsType.FILE_UPLOAD_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case CommonActionsType.FILE_UPLOAD_ERROR:
            return {
                ...state,
                result: null,
                loading: false,
                error: action.payload,
            };

        case CommonActionsType.FILE_UPLOAD_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};

export const commentReducer = (
    state = INITIAL_STATE,
    action: CommentReducerInterface,
) => {
    switch (action.type) {
        case CommonActionsType.COMMENT_PENDING:
            return {
                ...state,
                loading: true,
            };
        case CommonActionsType.COMMENT_SUCCESS:
            return {
                loading: false,
                result: action.payload,
                error: null,
            };
        case CommonActionsType.COMMENT_ERROR:
            return {
                ...state,
                loading: false,
                result: null,
                error: action.payload,
            };

        case CommonActionsType.COMMENT_RESET:
            return INITIAL_STATE;

        default:
            return state;
    }
};
