/**
 * Project YooLearn
 * File Api
 * Path app/middleware
 * Created by BRICE ZELE
 * Date: 13/09/2021
 */
import axios from 'axios';
import {API} from '../redux';
import ServerUrl from "../config/ServerUrl";

const ApiMiddleware =
    ({dispatch}) =>
    next =>
    action => {
        next(action);

        if (action.type !== API) return;

        const {
            url,
            method,
            data,
            accessToken,
            onLoading,
            onSuccess,
            timeout,
            onError,
            ...rest
        } = action.payload;
        const dataOrParams = ['GET', 'DELETE'].includes(method)
            ? 'params'
            : 'data';
        // axios default configs
        axios.defaults.baseURL = ServerUrl.base|| '';
        // axios.defaults.baseURL = 'https://second.yoolearn.co:3001/api/v1/';
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        if (accessToken)
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        dispatch(onLoading());

        axios
            .request({
                url,
                method,
                timeout: timeout || Number(process.env.API_TIMEOUT),
                [dataOrParams]: data,
                ...rest,
            })
            .then(response => {
                console.log('Data response', response);
                console.log('Data response data', response.config.data);
                dispatch(onSuccess(response.data));
            })
            .catch(error => {
                if (error.response) {
                    console.warn('Data error response', error.response);
                    dispatch(onError(error.response?.data));
                } else if (error.request) {
                    console.warn('Data error request', error.request);
                    dispatch(onError(error.request));
                } else {
                    console.warn('Data error message', error.message);
                    dispatch(onError(error.message));
                }

                /*            if (error.response && error.response.status === 403) {
                                                                                                                                                                                                                                                                                    dispatch(accessDenied());
                                                                                                                                                                                                                                                                                } */
            });
    };

export default ApiMiddleware;
