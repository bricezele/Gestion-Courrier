/**
 * Project YooLearn
 * File config.selector
 * Path app/redux/config
 * Created by BRICE ZELE
 * Date: 14/09/2021
 */
import {createSelector} from "reselect";
import {RootReducerType} from "../index";

const selectAppReducer = (state) => state.application;

export const selectAppConfig = createSelector(
    [selectAppReducer],
    (appConfig) => appConfig
)
