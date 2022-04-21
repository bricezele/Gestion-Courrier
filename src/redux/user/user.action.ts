/**
 * Project YooLearn
 * File user.action
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import UserActionsType from './user.types';
import {ApiAction} from '../index';
import {store} from '../../store';
import ServerUrl from "../../config/ServerUrl";

export const fetchSignUpPending = () => ({
    type: UserActionsType.SIGN_UP_PENDING,
});
export const fetchSignUpReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: UserActionsType.SIGN_UP_RESET,
        });
export const fetchSignUpSuccess = (user: any) => ({
    type: UserActionsType.SIGN_UP_SUCCESS,
    payload: user,
});
export const fetchSignUpError = (error: any) => ({
    type: UserActionsType.SIGN_UP_ERROR,
    payload: error,
});
export const fetchSignUp = (user:any) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.signup,
        accessToken: authKey,
        method:'POST',
        data: user,
        onLoading: fetchSignUpPending,
        // @ts-ignore
        onSuccess: fetchSignUpSuccess,
        // @ts-ignore
        onError: fetchSignUpError,
    });
};
/**
 * ********************************************************
 */
export const fetchGetAllUserPending = () => ({
    type: UserActionsType.GET_ALL_USER_PENDING,
});
export const fetchGetAllUserReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: UserActionsType.GET_ALL_USER_RESET,
        });
export const fetchGetAllUserSuccess = (user: any) => ({
    type: UserActionsType.GET_ALL_USER_SUCCESS,
    payload: user,
});
export const fetchGetAllUserError = (error: any) => ({
    type: UserActionsType.GET_ALL_USER_ERROR,
    payload: error,
});
export const fetchGetAllUser = () => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.signup,
        accessToken: authKey,
        method: 'GET',
        onLoading: fetchGetAllUserPending,
        // @ts-ignore
        onSuccess: fetchGetAllUserSuccess,
        // @ts-ignore
        onError: fetchGetAllUserError,
    });
};

/**
 * ********************************************************
 */
export const fetchCheckUserExistPending = () => ({
    type: UserActionsType.CHECK_IF_USER_EXIST_PENDING,
});
export const fetchCheckUserExistReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: UserActionsType.CHECK_IF_USER_EXIST_RESET,
        });
export const fetchCheckUserExistSuccess = (user: any) => ({
    type: UserActionsType.CHECK_IF_USER_EXIST_SUCCESS,
    payload: user,
});
export const fetchCheckUserExistError = (error: any) => ({
    type: UserActionsType.CHECK_IF_USER_EXIST_ERROR,
    payload: error,
});
export const fetchCheckUserExist = () => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.checkUserExist,
        accessToken: authKey,
        method: 'GET',
        onLoading: fetchCheckUserExistPending,
        // @ts-ignore
        onSuccess: fetchCheckUserExistSuccess,
        // @ts-ignore
        onError: fetchCheckUserExistError,
    });
};

/**
 * ********************************************************
 */
export const fetchUpdateUserPending = () => ({
    type: UserActionsType.UPDATE_USER_PENDING,
});
export const fetchUpdateUserReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: UserActionsType.UPDATE_USER_RESET,
        });
export const fetchUpdateUserSuccess = (user: any) => ({
    type: UserActionsType.UPDATE_USER_SUCCESS,
    payload: user,
});
export const fetchUpdateUserError = (error: any) => ({
    type: UserActionsType.UPDATE_USER_ERROR,
    payload: error,
});
export const fetchUpdateUser = (
    id: string,
    isUpdate: boolean = true,
    otherParam: string = '',
    user: Record<any, any>,
) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: `${ServerUrl.signup}/${id}${otherParam}`,
        data: user,
        accessToken: authKey,
        method: isUpdate ? 'PUT' : 'DELETE',
        onLoading: fetchUpdateUserPending,
        // @ts-ignore
        onSuccess: fetchUpdateUserSuccess,
        // @ts-ignore
        onError: fetchUpdateUserError,
    });
};
