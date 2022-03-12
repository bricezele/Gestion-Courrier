/**
 * Project YooLearn
 * File oauth.selector
 * Path app/redux/oauth
 * Created by BRICE ZELE
 * Date: 13/09/2021
 */
import {createSelector} from 'reselect';
import {RootReducerType} from '../index';

const selectAuthReducer = (state: RootReducerType) => state.authkey;

export const selectAuthKey = createSelector(
    [selectAuthReducer],
    authkey => authkey,
);

export const selectUser = createSelector(
    [selectAuthReducer],
    authkey => authkey?.result?.user,
);
