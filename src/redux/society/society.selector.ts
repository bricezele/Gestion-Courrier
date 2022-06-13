/**
 * Project YooLearn
 * File user.selector
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 14/09/2021
 */
import {createSelector} from 'reselect';
import {RootReducerType} from '../index';

const selectCreateSocietyReducer = (state: RootReducerType) => state.createSociety;
const selectGetAllSocietyReducer = (state: RootReducerType) => state.getAllSociety;
const selectUpdateSocietyReducer = (state: RootReducerType) => state.updateSociety;

export const selectCreateSociety = createSelector(
    [selectCreateSocietyReducer],
    (signUp) => signUp,
);

export const selectGetAllSociety = createSelector(
    [selectGetAllSocietyReducer],
    getAllSociety => getAllSociety,
);

export const selectUpdateSociety = createSelector(
    [selectUpdateSocietyReducer],
    updateSociety => updateSociety,
);
