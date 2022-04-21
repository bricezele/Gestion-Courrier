/**
 * Project yoolearn-mobile
 * File common.selector
 * Path app/redux/common
 * Created by BRICE ZELE
 * Date: 30/09/2021
 */
import {createSelector} from 'reselect';
import {RootReducerType} from '../index';

const selectFileUploadReducer = (state: RootReducerType) => state.fileupload;
const selectGetAllWorkshopReducer = (state: RootReducerType) => state.comment;

export const selectFileUpload = createSelector(
    [selectFileUploadReducer],
    fileupload => fileupload,
);

export const selectCommentWorkshop = createSelector(
    [selectGetAllWorkshopReducer],
    (comment) => comment
);
