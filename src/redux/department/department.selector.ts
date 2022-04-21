/**
 * Project YooLearn
 * File user.selector
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 14/09/2021
 */
import {createSelector} from 'reselect';
import {RootReducerType} from '../index';

const selectCreateDepartmentReducer = (state: RootReducerType) => state.createDepartment;
const selectGetAllDepartmentReducer = (state: RootReducerType) => state.getAllDepartment;
const selectUpdateDepartmentReducer = (state: RootReducerType) => state.updateDepartment;

export const selectCreateDepartment = createSelector(
    [selectCreateDepartmentReducer],
    (signUp) => signUp,
);

export const selectGetAllDepartment = createSelector(
    [selectGetAllDepartmentReducer],
    getAllDepartment => getAllDepartment,
);

export const selectUpdateDepartment = createSelector(
    [selectUpdateDepartmentReducer],
    updateDepartment => updateDepartment,
);
