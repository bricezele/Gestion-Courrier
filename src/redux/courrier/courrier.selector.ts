/**
 * Project YooLearn
 * File user.selector
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 14/09/2021
 */
import {createSelector} from 'reselect';
import {RootReducerType} from '../index';

const selectGetAllCourrierReducer = (state: RootReducerType) => state.getAllCourrier;
const selectCreateCourrierReducer = (state: RootReducerType) => state.createCourrier;
const selectUpdateCourrierReducer = (state: RootReducerType) => state.updateCourrier;

export const selectGetAllCourrier = createSelector(
    [selectGetAllCourrierReducer],
    (getAllCourrier) => getAllCourrier,
);

export const selectCreateCourrier = createSelector(
    [selectCreateCourrierReducer],
    createCourrier => createCourrier,
);

export const selectUpdateCourrier = createSelector(
    [selectUpdateCourrierReducer],
    updateCourrier => updateCourrier,
);
