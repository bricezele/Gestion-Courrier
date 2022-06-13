/**
 * Project YooLearn
 * File user.action
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import SocietyActionsType from './society.types';
import {ApiAction} from '../index';
import {store} from '../../store';
import ServerUrl from "../../config/ServerUrl";

export const fetchCreateSocietyPending = () => ({
    type: SocietyActionsType.CREATE_SOCIETY_PENDING,
});
export const fetchCreateSocietyReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: SocietyActionsType.CREATE_SOCIETY_RESET,
        });
export const fetchCreateSocietySuccess = (user: any) => ({
    type: SocietyActionsType.CREATE_SOCIETY_SUCCESS,
    payload: user,
});
export const fetchCreateSocietyError = (error: any) => ({
    type: SocietyActionsType.CREATE_SOCIETY_ERROR,
    payload: error,
});
export const fetchCreateSociety = (user:any) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.society,
        accessToken: authKey,
        method:'POST',
        data: user,
        onLoading: fetchCreateSocietyPending,
        // @ts-ignore
        onSuccess: fetchCreateSocietySuccess,
        // @ts-ignore
        onError: fetchCreateSocietyError,
    });
};
/**
 * ********************************************************
 */
export const fetchGetAllSocietyPending = () => ({
    type: SocietyActionsType.GET_ALL_SOCIETY_PENDING,
});
export const fetchGetAllSocietyReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: SocietyActionsType.GET_ALL_SOCIETY_RESET,
        });
export const fetchGetAllSocietySuccess = (user: any) => ({
    type: SocietyActionsType.GET_ALL_SOCIETY_SUCCESS,
    payload: user,
});
export const fetchGetAllSocietyError = (error: any) => ({
    type: SocietyActionsType.GET_ALL_SOCIETY_ERROR,
    payload: error,
});
export const fetchGetAllSociety = () => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.society,
        accessToken: authKey,
        method: 'GET',
        onLoading: fetchGetAllSocietyPending,
        // @ts-ignore
        onSuccess: fetchGetAllSocietySuccess,
        // @ts-ignore
        onError: fetchGetAllSocietyError,
    });
};


/**
 * ********************************************************
 */
export const fetchUpdateSocietyPending = () => ({
    type: SocietyActionsType.UPDATE_SOCIETY_PENDING,
});
export const fetchUpdateSocietyReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: SocietyActionsType.UPDATE_SOCIETY_RESET,
        });
export const fetchUpdateSocietySuccess = (user: any) => ({
    type: SocietyActionsType.UPDATE_SOCIETY_SUCCESS,
    payload: user,
});
export const fetchUpdateSocietyError = (error: any) => ({
    type: SocietyActionsType.UPDATE_SOCIETY_ERROR,
    payload: error,
});
export const fetchUpdateSociety = (
    id: string,
    isUpdate: boolean = true,
    otherParam: string = '',
    user: Record<any, any>,
) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: `${ServerUrl.society}/${id}${otherParam}`,
        data: user,
        accessToken: authKey,
        method: isUpdate ? 'PUT' : 'DELETE',
        onLoading: fetchUpdateSocietyPending,
        // @ts-ignore
        onSuccess: fetchUpdateSocietySuccess,
        // @ts-ignore
        onError: fetchUpdateSocietyError,
    });
};
