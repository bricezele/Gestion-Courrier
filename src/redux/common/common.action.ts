/**
 * Project yoolearn-mobile
 * File common.action
 * Path app/redux/common
 * Created by BRICE ZELE
 * Date: 30/09/2021
 */

import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import CommonActionsType from './common.types';
import {store} from '../../store';
import {ApiAction} from '../index';
import ServerUrl from '../../config/ServerUrl';
import {EntityType} from '../../enum/entitytype.enum';

export const fetchUploadMediaPending = () => ({
    type: CommonActionsType.FILE_UPLOAD_PENDING,
});
export const fetchUploadMediaReset =
    () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) =>
        dispatch({
            type: CommonActionsType.FILE_UPLOAD_RESET,
        });
export const fetchUploadMediaSuccess = (user: any) => ({
    type: CommonActionsType.FILE_UPLOAD_SUCCESS,
    payload: user,
});
export const fetchUploadMediaError = (error: any) => ({
    type: CommonActionsType.FILE_UPLOAD_ERROR,
    payload: error,
});
export const fetchUploadMediaProgress = (progress: any) => ({
    type: CommonActionsType.FILE_UPLOAD_PROGRESS,
    payload: progress,
});
export const fetchUploadMedia = (data: any, params: any) => {
    console.log('fetch call');
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.singleFile,
        accessToken: authKey,
        params,
        method: 'POST',
        data,
        onLoading: fetchUploadMediaPending,
        // @ts-ignore
        onSuccess: fetchUploadMediaSuccess,
        // @ts-ignore
        onError: fetchUploadMediaError,
    });
};
export const fetchUploadMedias = (data: any, params: any) => {
    console.log('fetch call');
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';
    return ApiAction({
        url: ServerUrl.multipleFile,
        accessToken: authKey,
        params,
        method: 'POST',
        data,
        onUploadProgress: (progressEvent) => {
            let percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
            console.log('percentCompleted', percentCompleted);
            /*            if(percentCompleted < 100)
                            store.dispatch(onShowProgressBar(true, percentCompleted));
                        else
                            store.dispatch(onShowProgressBar(false, percentCompleted));*/
        },
        onLoading: fetchUploadMediaPending,
        // @ts-ignore
        onSuccess: fetchUploadMediaSuccess,
        // @ts-ignore
        onError: fetchUploadMediaError,
    });
};

export const fetchCommentPending = () => ({
    type: CommonActionsType.COMMENT_PENDING,
});
export const fetchCommentReset = () => ({
    type: CommonActionsType.COMMENT_RESET,
});
export const fetchCommentSuccess = (authkey: any) => ({
    type: CommonActionsType.COMMENT_SUCCESS,
    payload: authkey,
});
export const fetchCommentError = (error: any) => ({
    type: CommonActionsType.COMMENT_ERROR,
    payload: error,
});
export const fetchComment = (id, type, data) => {
    const auth = store.getState().authkey;
    const authKey = auth !== null ? `${auth.result?.accessToken}` : '';

    let url = '';

    switch (type) {
        case EntityType.EVENT:
            url = `${ServerUrl.workshop}/comment/${id}`;
            break;

        default:
            url = `${ServerUrl.training}/comment/${id}`;
    }
    return ApiAction({
        url,
        accessToken: authKey,
        data,
        method: 'POST',
        onLoading: fetchCommentPending,
        // @ts-ignore
        onSuccess: fetchCommentSuccess,
        // @ts-ignore
        onError: fetchCommentError,
    });
};
