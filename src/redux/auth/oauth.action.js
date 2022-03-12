/**
 * Project YooLearn
 * File oauth.action
 * Path app/redux/oauth
 * Created by BRICE ZELE
 * Date: 13/09/2021
 */

import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import AuthActions from './oauth.types';
import {ApiAction} from '../index';
import ServerUrl from '../../config/ServerUrl';
import {store} from '../../store';

export const fetchAuthKeyPending = () => ({
    type: AuthActions.AUTH_KEY_PENDING,
});

export const fetchAuthKeyReset =
    () => (dispatch) =>
        dispatch({
            type: AuthActions.AUTH_KEY_RESET,
        });

export const fetchAuthKeySuccess = (authkey) => ({
    type: AuthActions.AUTH_KEY_SUCCESS,
    payload: authkey,
});

export const fetchAuthKeyError = (error) => ({
    type: AuthActions.AUTH_KEY_ERROR,
    payload: error,
});

export const fetchAuthKey = () =>
    ApiAction({
        url: ServerUrl.oauth,
        method: 'POST',
        auth: {
            username: process.env.JWT_SECRET_LOGIN,
            password: process.env.JWT_SECRET_KEY,
        },
        onLoading: fetchAuthKeyPending,
        // @ts-ignore
        onSuccess: fetchAuthKeySuccess,
        // @ts-ignore
        onError: fetchAuthKeyError,
    });

/**
 * ********************************************************
 */
export const fetchSignIn = (email, password) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.signin,
        accessToken: authKey,
        method: 'POST',
        data: {
            email,
            password,
        },
        onLoading: fetchAuthKeyPending,
        // @ts-ignore
        onSuccess: fetchAuthKeySuccess,
        // @ts-ignore
        onError: fetchAuthKeyError,
    });
};
