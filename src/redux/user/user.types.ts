/**
 * Project YooLearn
 * File user.types
 * Path app/redux/user
 * Created by BRICE ZELE
 * Date: 26/08/2021
 */
const UserActionsType = {
    SIGN_UP_PENDING: 'SIGN_UP_PENDING',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_ERROR: 'SIGN_UP_ERROR',
    SIGN_UP_RESET: 'SIGN_UP_RESET',

    GET_ALL_USER_PENDING: 'GET_ALL_USER_PENDING',
    GET_ALL_USER_SUCCESS: 'GET_ALL_USER_SUCCESS',
    GET_ALL_USER_ERROR: 'GET_ALL_USER_ERROR',
    GET_ALL_USER_RESET: 'GET_ALL_USER_RESET',

    FIND_BY_EMAIL_PENDING: 'FIND_BY_EMAIL_PENDING',
    FIND_BY_EMAIL_SUCCESS: 'FIND_BY_EMAIL_SUCCESS',
    FIND_BY_EMAIL_ERROR: 'FIND_BY_EMAIL_ERROR',
    FIND_BY_EMAIL_RESET: 'FIND_BY_EMAIL_RESET',

    UPDATE_USER_PENDING: 'UPDATE_USER_PENDING',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
    UPDATE_USER_RESET: 'UPDATE_USER_RESET',

    CHECK_IF_USER_EXIST_PENDING: 'CHECK_IF_USER_EXIST_PENDING',
    CHECK_IF_USER_EXIST_SUCCESS: 'CHECK_IF_USER_EXIST_SUCCESS',
    CHECK_IF_USER_EXIST_ERROR: 'CHECK_IF_USER_EXIST_ERROR',
    CHECK_IF_USER_EXIST_RESET: 'CHECK_IF_USER_EXIST_RESET',

    UPDATE_ONESIGNAL_PLAYER_ID_PENDING: 'UPDATE_ONESIGNAL_PLAYER_ID_PENDING',
    UPDATE_ONESIGNAL_PLAYER_ID_SUCCESS: 'UPDATE_ONESIGNAL_PLAYER_ID_SUCCESS',
    UPDATE_ONESIGNAL_PLAYER_ID_ERROR: 'UPDATE_ONESIGNAL_PLAYER_ID_ERROR',
    UPDATE_ONESIGNAL_PLAYER_ID_RESET: 'UPDATE_ONESIGNAL_PLAYER_ID_RESET',
};
export default UserActionsType;