import React, {Fragment, useEffect, useState} from "react";
import "./index.scss";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {Detector} from "react-detect-offline";
import ConfigDB from "./data/customizer/config";
import {configureFakeBackend,} from "./services/fack.backend";
import LoginPage from "./pages/authentication/LoginPage";
import {classes} from "./data/layouts";
import Loader from "./components/LoaderComponent";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "./redux/config/config.selector";
import {selectAuthKey, selectUser} from "./redux/auth/oauth.selector";
import useNetwork from "./hooks/UseNetwork";
import {useTranslation} from "react-i18next";
import {selectCheckUserExist} from "./redux/user/user.selector";
import {fetchCheckUserExist} from "./redux/user/user.action";
import DashboardLayout from "./layout/DashboardLayout";
import WizardSetupPage from "./pages/WizardSetupPage/WizardSetupPage";
import {ToastContainer} from "react-toastify";
import {Role} from "./enum/role.enum";

// setup fake backend
configureFakeBackend();

const App = ({application, user, checkUserExist, fetchCheckUserExist}) => {

    const {t} = useTranslation();
    const [anim, setAnim] = useState("");
    const animation =
        localStorage.getItem("animation") ||
        ConfigDB.data.router_animation ||
        "fade";
    const abortController = new AbortController();
    const [currentUser, setCurrentUser] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const jwt_token = localStorage.getItem("token");
    const defaultLayoutObj = classes.find(
        (item) => Object.values(item).pop(1) === "compact-wrapper"
    );
    const layout =
        localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

    const {
        online,
        since,
        downLink,
        downLinkMax,
        effectiveType,
        rtt,
        saveData,
        type,
    } = useNetwork();


    /*    useEffect(() => {
            if (!online)
                SweetAlert.fire({
                    title: t('error'),
                    text: t('no_connection_internet'),
                    icon: "error",
                    showCloseButton: false,
                    showCancelButton: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                });
            else
                SweetAlert.close();
        }, [online]);*/

    useEffect(() => {
        setAnim(animation);
        /*        const requestOptions = {method: "GET", headers: authHeader()};
                fetch("/users", requestOptions).then(handleResponse);
                firebase_app.auth().onAuthStateChanged(setCurrentUser);
                setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));*/
        console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
        console.disableYellowBox = true;
        return function cleanup() {
            abortController.abort();
        };

        // eslint-disable-next-line
    }, []);

    return (
        <Detector
            polling={true}
            onChange={(online) => {
                console.log("Connection change", online);
            }}
            render={({online}) => (
                <Fragment>
                    <Loader/>

                    <Switch>
                        <Route
                            path={`${process.env.PUBLIC_URL}/login`}
                            component={LoginPage}/>
                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/wizard-setup`}
                            component={WizardSetupPage}/>

                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/`}
                            render={() => {

                                if (checkUserExist.result !== null) {
                                    if (checkUserExist.result.count === 0)
                                        return <Redirect to={`${process.env.PUBLIC_URL}/wizard-setup`}/>;
                                    else if (user) {
                                        if (user.hasOwnProperty("firstname")) {
                                            switch (user.roles) {
                                                case Role.ADMIN:
                                                    return (
                                                        <Redirect
                                                            to={`${process.env.PUBLIC_URL}/dashboard-admin`}
                                                        />
                                                    );
                                                case Role.STANDARD:
                                                    return (
                                                        <Redirect
                                                            to={`${process.env.PUBLIC_URL}/dashboard-standard`}
                                                        />
                                                    );
                                                case Role.ASSISTANTE_DG:
                                                    return (
                                                        <Redirect
                                                            to={`${process.env.PUBLIC_URL}/dashboard-assistant-dg`}
                                                        />
                                                    );
                                                case Role.DGA:
                                                    return (
                                                        <Redirect
                                                            to={`${process.env.PUBLIC_URL}/dashboard-dga`}
                                                        />
                                                    );
                                                case Role.EDITOR:
                                                    return (
                                                        <Redirect
                                                            to={`${process.env.PUBLIC_URL}/dashboard-editor`}
                                                        />
                                                    );
                                            }
                                        } else
                                            return (
                                                <Redirect
                                                    to={`${process.env.PUBLIC_URL}/login`}
                                                />
                                            );
                                    } else
                                        return (
                                            <Redirect
                                                to={`${process.env.PUBLIC_URL}/login`}
                                            />
                                        );
                                }
                            }}
                        />

                        <DashboardLayout anim={anim}/>
                    </Switch>
                    <ToastContainer/>
                </Fragment>
            )}>

        </Detector>
    );
};

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
    user: selectUser,
    checkUserExist: selectCheckUserExist,
    authkey: selectAuthKey
});

export default connect(mapStateToProps, {
    fetchCheckUserExist
})(App);
