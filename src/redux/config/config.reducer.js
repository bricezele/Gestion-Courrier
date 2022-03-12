/**
 * Project YooLearn
 * File config.reducer
 * Path app/redux/config
 * Created by BRICE ZELE
 * Date: 25/08/2021
 */
import {REHYDRATE} from 'redux-persist';
import _ from 'lodash';
import {ConfigTypes} from "./config.types";

interface ConfigActions {
    payload?: any;
    repeat?: string;
    type: string;
    theme: string;
    font: string;
    force_dark: string;
    language: string;
    introSlidesShown: boolean;
    showConfetti: boolean;
    showProgressBar: boolean;
    progress: string;
    training_information: Record<any, any>;
}

export const INITIAL_CONFIG = {
    theme: null,
    font: null,
    force_dark: null,
    language: null,
    introSlidesShown: true,
    showConfetti: false,
    showProgressBar: false,
    progress: '',
    training_information: {}
};

export const configReducer = (state = INITIAL_CONFIG, action: ConfigActions) => {
    switch (action.type) {
        case REHYDRATE:
            return !_.isNil(action.payload) ? action.payload.application : INITIAL_CONFIG;
        case ConfigTypes.CHANGE_THEME:
            return {
                ...state,
                theme: action.theme,
            };
        case ConfigTypes.CHANGE_FONT:
            return {
                ...state,
                font: action.font,
            };
        case ConfigTypes.FORCE_APPEARANCE:
            return {
                ...state,
                force_dark: action.force_dark,
            };
        case ConfigTypes.SHOW_CONFETTI:
            return {
                ...state,
                showConfetti: action.showConfetti,
            };
        case ConfigTypes.SHOW_PROGRESS_BAR:
            return {
                ...state,
                showProgressBar: action.showProgressBar,
                progress: action.progress
            };
        case ConfigTypes.CHANGE_LANGUAGE:
            return {
                ...state,
                language: action.language,
            };
        case ConfigTypes.APP_INTRO:
            return {
                ...state,
                introSlidesShown: action.introSlidesShown,
            };
            case ConfigTypes.SET_TRAINING_INFORMATION:
            return {
                ...state,
                training_information: action.training_information,
            };
        default:
            return state;
    }
}

