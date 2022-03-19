import React, {Fragment, useEffect, useState} from 'react';
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../redux/config/config.selector";
import {selectAuthKey, selectUser} from "../redux/auth/oauth.selector";
import {selectCheckUserExist} from "../redux/user/user.selector";
import {connect, useDispatch} from "react-redux";
import {toast} from 'react-toastify';
import {fetchCheckUserExist, fetchCheckUserExistReset} from "../redux/user/user.action";
import {fetchAuthKey} from "../redux/auth/oauth.action";
import {useTranslation} from "react-i18next";
import {store} from "../store";


const Loader = ({fetchAuthKey, authkey, fetchCheckUserExist, checkUserExist}) => {

    const [show, setShow] = useState(true);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    console.log("Process", process.env.JWT_SECRET_LOGIN);
    useEffect(() => {
        dispatch(fetchCheckUserExistReset());
        console.log('authkey', authkey.result);
        const auth = store.getState().authkey;
        const authKey = auth !== null ? auth.result : null;
        if (authKey == null) fetchAuthKey();
    }, []);

    useEffect(() => {
        if (authkey.result !== null)
            fetchCheckUserExist();

        /*        if (authkey.error !== null) {
                    toast.error(t('error_loading_app_check_internet_connection_and_rest'));
                }*/
    }, [authkey]);

    useEffect(() => {
        if (checkUserExist.result !== null) {
            dispatch(fetchCheckUserExistReset());
            setShow(false);
        }

        if (checkUserExist.error !== null) {
            dispatch(fetchCheckUserExistReset());
            toast.error(t('error_loading_app_check_internet_connection_and_rest'));
        }

    }, [checkUserExist]);

    return (
        <Fragment>
            <div className={`loader-wrapper ${show ? '' : 'loderhide'}`}>
                <div className="loader-index"><span></span></div>
                <svg>
                    <defs></defs>
                    <filter id="goo">
                        <fegaussianblur in="SourceGraphic" stdDeviation="11" result="blur"></fegaussianblur>
                        <fecolormatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                                       result="goo"></fecolormatrix>
                    </filter>
                </svg>
            </div>
        </Fragment>
    );
}
const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
    user: selectUser,
    checkUserExist: selectCheckUserExist,
    authkey: selectAuthKey
});

export default connect(mapStateToProps, {
    fetchCheckUserExist,
    fetchAuthKey
})(Loader);
