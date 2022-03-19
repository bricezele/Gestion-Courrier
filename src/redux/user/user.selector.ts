/**
 * Project YooLearn
 * File user.selector
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 14/09/2021
 */
import {createSelector} from 'reselect';
import {RootReducerType} from '../index';

const selectSignUpReducer = (state: RootReducerType) => state.signUp;
const selectCheckUserExistReducer = (state: RootReducerType) => state.checkUserExist;
const selectGetAllUserReducer = (state: RootReducerType) => state.getAllUser;
const selectUpdateUserReducer = (state: RootReducerType) => state.updateUser;

export const selectSignUp = createSelector(
    [selectSignUpReducer],
    (signUp) => signUp,
);

export const selectCheckUserExist = createSelector(
    [selectCheckUserExistReducer],
    checkUserExist => checkUserExist,
);

export const selectGetAllUserExist = createSelector(
    [selectGetAllUserReducer],
    getAllUser => getAllUser,
);

export const selectUpdateUser = createSelector(
    [selectUpdateUserReducer],
    updateUser => updateUser,
);
