/**
 * Project YooLearn
 * File config.action
 * Path app/redux/config
 * Created by BRICE ZELE
 * Date: 25/08/2021
 */
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {ConfigTypes} from './config.types';

const changeTheme = (theme) => ({
    type: ConfigTypes.CHANGE_THEME,
    theme,
});

const changeFont = (font) => ({
    type: ConfigTypes.CHANGE_FONT,
    font,
});

const forceTheme = (force_dark) => ({
    type: ConfigTypes.FORCE_APPEARANCE,
    force_dark,
});

const changeLanguge = (language) => ({
    type: ConfigTypes.CHANGE_LANGUAGE,
    language,
});

const changeCurrency = (currency) => ({
    type: ConfigTypes.CHANGE_CURRENCY,
    currency,
});

const appIntroduction = (introSlidesShown) => ({
    type: ConfigTypes.APP_INTRO,
    introSlidesShown,
});

const showConfettiAction = (showConfetti) => ({
    type: ConfigTypes.SHOW_CONFETTI,
    showConfetti,
});

const showProgressBarAction = (showProgressBar, progress) => ({
    type: ConfigTypes.SHOW_PROGRESS_BAR,
    showProgressBar,
    progress,
});

const setTrainingInformationAction = (training_information) => ({
    type: ConfigTypes.SET_TRAINING_INFORMATION,
    training_information,
});

export const onAppIntroduction = (introSlidesShown) => (dispatch) => {
        try {
            dispatch(appIntroduction(introSlidesShown));
        } catch (error) {
            // log.error('appIntroduction', error);
        }
    };

export const onSetTrainingInformationAction = (training_information) => (dispatch) => {
        dispatch(setTrainingInformationAction(training_information));
    };

export const onShowProgressBar = (isProgressBarShow, progress) => (dispatch) => {
        dispatch(showProgressBarAction(isProgressBarShow, progress));
    };

export const onShowConfetti =
    (isConfettiShow) =>
    (dispatch) => {
        dispatch(showConfettiAction(isConfettiShow));
    };

export const onChangeTheme =
    (theme) => (dispatch) => {
        dispatch(changeTheme(theme));
    };

export const onForceTheme =
    (mode) => (dispatch) => {
        dispatch(forceTheme(mode));
    };

export const onChangeFont =
    (font) => (dispatch) => {
        dispatch(changeFont(font));
    };

export const onChangeLanguage =
    (language) => (dispatch) => {
        dispatch(changeLanguge(language));
    };

export const onChangeCurrency =
    (currency) => (dispatch) => {
        dispatch(changeCurrency(currency));
    };
