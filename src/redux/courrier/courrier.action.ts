/**
 * Project YooLearn
 * File user.action
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import CourrierActionsType from './courrier.types';
import {ApiAction} from '../index';
import {store} from '../../store';
import ServerUrl from "../../config/ServerUrl";

export const fetchGetAllCourrierPending = () => ({
    type: CourrierActionsType.GET_ALL_COURRIER_PENDING,
});
export const fetchGetAllCourrierReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: CourrierActionsType.GET_ALL_COURRIER_RESET,
        });
export const fetchGetAllCourrierSuccess = (user: any) => ({
    type: CourrierActionsType.GET_ALL_COURRIER_SUCCESS,
    payload: user,
});
export const fetchGetAllCourrierError = (error: any) => ({
    type: CourrierActionsType.GET_ALL_COURRIER_ERROR,
    payload: error,
});
export const fetchGetAllCourrier = () => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.courriers,
        accessToken: authKey,
        method: 'GET',
        onLoading: fetchGetAllCourrierPending,
        // @ts-ignore
        onSuccess: fetchGetAllCourrierSuccess,
        // @ts-ignore
        onError: fetchGetAllCourrierError,
    });
};
/**
 * ********************************************************
 */
export const fetchCreateCourrierPending = () => ({
    type: CourrierActionsType.CREATE_COURRIER_PENDING,
});
export const fetchCreateCourrierReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: CourrierActionsType.CREATE_COURRIER_RESET,
        });
export const fetchCreateCourrierSuccess = (user: any) => ({
    type: CourrierActionsType.CREATE_COURRIER_SUCCESS,
    payload: user,
});
export const fetchCreateCourrierError = (error: any) => ({
    type: CourrierActionsType.CREATE_COURRIER_ERROR,
    payload: error,
});
export const fetchCreateCourrier = (user) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.courriers,
        accessToken: authKey,
        method: 'POST',
        data: user,
        onLoading: fetchCreateCourrierPending,
        // @ts-ignore
        onSuccess: fetchCreateCourrierSuccess,
        // @ts-ignore
        onError: fetchCreateCourrierError,
    });
};

/**
 * ********************************************************
 */
export const fetchUpdateCourrierPending = () => ({
    type: CourrierActionsType.UPDATE_COURRIER_PENDING,
});
export const fetchUpdateCourrierReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: CourrierActionsType.UPDATE_COURRIER_RESET,
        });
export const fetchUpdateCourrierSuccess = (user: any) => ({
    type: CourrierActionsType.UPDATE_COURRIER_SUCCESS,
    payload: user,
});
export const fetchUpdateCourrierError = (error: any) => ({
    type: CourrierActionsType.UPDATE_COURRIER_ERROR,
    payload: error,
});
export const fetchUpdateCourrier = (
    id: string,
    isUpdate: boolean = true,
    data: Record<any, any>,
) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: `${ServerUrl.courriers}/${id}`,
        data: data,
        accessToken: authKey,
        method: isUpdate ? 'PUT' : 'DELETE',
        onLoading: fetchUpdateCourrierPending,
        // @ts-ignore
        onSuccess: fetchUpdateCourrierSuccess,
        // @ts-ignore
        onError: fetchUpdateCourrierError,
    });
};
