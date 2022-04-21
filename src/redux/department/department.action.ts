/**
 * Project YooLearn
 * File user.action
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import DepartmentActionsType from './department.types';
import {ApiAction} from '../index';
import {store} from '../../store';
import ServerUrl from "../../config/ServerUrl";

export const fetchCreateDepartmentPending = () => ({
    type: DepartmentActionsType.CREATE_DEPARTMENT_PENDING,
});
export const fetchCreateDepartmentReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: DepartmentActionsType.CREATE_DEPARTMENT_RESET,
        });
export const fetchCreateDepartmentSuccess = (user: any) => ({
    type: DepartmentActionsType.CREATE_DEPARTMENT_SUCCESS,
    payload: user,
});
export const fetchCreateDepartmentError = (error: any) => ({
    type: DepartmentActionsType.CREATE_DEPARTMENT_ERROR,
    payload: error,
});
export const fetchCreateDepartment = (user: any) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.department,
        accessToken: authKey,
        method: 'POST',
        data: user,
        onLoading: fetchCreateDepartmentPending,
        // @ts-ignore
        onSuccess: fetchCreateDepartmentSuccess,
        // @ts-ignore
        onError: fetchCreateDepartmentError,
    });
};
/**
 * ********************************************************
 */
export const fetchGetAllDepartmentPending = () => ({
    type: DepartmentActionsType.GET_ALL_DEPARTMENT_PENDING,
});
export const fetchGetAllDepartmentReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: DepartmentActionsType.GET_ALL_DEPARTMENT_RESET,
        });
export const fetchGetAllDepartmentSuccess = (user: any) => ({
    type: DepartmentActionsType.GET_ALL_DEPARTMENT_SUCCESS,
    payload: user,
});
export const fetchGetAllDepartmentError = (error: any) => ({
    type: DepartmentActionsType.GET_ALL_DEPARTMENT_ERROR,
    payload: error,
});
export const fetchGetAllDepartment = () => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.department,
        accessToken: authKey,
        method: 'GET',
        onLoading: fetchGetAllDepartmentPending,
        // @ts-ignore
        onSuccess: fetchGetAllDepartmentSuccess,
        // @ts-ignore
        onError: fetchGetAllDepartmentError,
    });
};


/**
 * ********************************************************
 */
export const fetchUpdateDepartmentPending = () => ({
    type: DepartmentActionsType.UPDATE_DEPARTMENT_PENDING,
});
export const fetchUpdateDepartmentReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: DepartmentActionsType.UPDATE_DEPARTMENT_RESET,
        });
export const fetchUpdateDepartmentSuccess = (user: any) => ({
    type: DepartmentActionsType.UPDATE_DEPARTMENT_SUCCESS,
    payload: user,
});
export const fetchUpdateDepartmentError = (error: any) => ({
    type: DepartmentActionsType.UPDATE_DEPARTMENT_ERROR,
    payload: error,
});
export const fetchUpdateDepartment = (
    id: string,
    isUpdate: boolean = true,
    otherParam: string = '',
    user: Record<any, any>,
) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: `${ServerUrl.department}/${id}${otherParam}`,
        data: user,
        accessToken: authKey,
        method: isUpdate ? 'PUT' : 'DELETE',
        onLoading: fetchUpdateDepartmentPending,
        // @ts-ignore
        onSuccess: fetchUpdateDepartmentSuccess,
        // @ts-ignore
        onError: fetchUpdateDepartmentError,
    });
};
