import React, {Fragment, useEffect, useState} from "react";
import "./index.scss";
import {firebase_app} from "./data/config";
import {Redirect, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {Detector} from "react-detect-offline";
import ConfigDB from "./data/customizer/config";
import {authHeader, configureFakeBackend, handleResponse,} from "./services/fack.backend";

// Signin page
// Authentication
import LoginWithValidation from "./pages/authentication/loginwithValidation";

// Error page
// Comming soo
// Maintenanc
import {classes} from "./data/layouts";
import WizardSetupLayout from "./layout/WizardSetupLayout";
import Loader from "./components/LoaderComponent";
import {bindActionCreators} from "redux";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "./redux/config/config.selector";
import {selectUser} from "./redux/auth/oauth.selector";
import useNetwork from "./hooks/UseNetwork";
import {useTranslation} from "react-i18next";

// setup fake backend
configureFakeBackend();

const App = ({application, user}) => {

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

    /*
        useEffect(() => {
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
        }, [online]);
    */

    useEffect(() => {
        const requestOptions = {method: "GET", headers: authHeader()};
        fetch("/users", requestOptions).then(handleResponse);
        setAnim(animation);
        firebase_app.auth().onAuthStateChanged(setCurrentUser);
        setAuthenticated(JSON.parse(localStorage.getItem("authenticated")));
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
                        {/*          <Route  path={`${process.env.PUBLIC_URL}/login`} component={Signin} />
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/login`} component={Login}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/loginWithBgImg1`} component={LoginWithBgImage}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/loginWithBgImg2`} component={LoginWithBgVideo}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/signup`} component={Register}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/signupWithImg1`} component={RegisterWithBgImage}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/signupWithImg2`} component={RegisterWithBgVideo}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/forgetPwd`} component={Forgetpwd}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/unlockUser`} component={UnlockUser}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/auth/resetPwd`} component={Resetpwd}></Route>

              <Route  path={`${process.env.PUBLIC_URL}/pages/errors/error400`} component={Error400}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/errors/error401`} component={Error401}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/errors/error403`} component={Error403}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/errors/error404`} component={Error404}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/errors/error500`} component={Error500}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/errors/error503`} component={Error503}></Route>

              <Route  path={`${process.env.PUBLIC_URL}/pages/comingsoon/comingsoon`} component={Comingsoon}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/comingsoon/comingsoonImg`} component={ComingsoonImg}></Route>
              <Route  path={`${process.env.PUBLIC_URL}/pages/comingsoon/comingsoonVideo`} component={ComingsoonVideo}></Route>

              <Route  path={`${process.env.PUBLIC_URL}/pages/maintenance`} component={Maintenance}></Route>

              <Route  path={`${process.env.PUBLIC_URL}/callback`} render={() => <Callback/>} />*/}

                        <Route
                            path={`${process.env.PUBLIC_URL}/pages/auth/login`}
                            component={LoginWithValidation}
                        ></Route>

                        <Route
                            exact
                            path={`${process.env.PUBLIC_URL}/`}
                            render={() => {

                                console.log("application", application.introSlidesShown === true);
                                console.log("user", user);

                                if (application.introSlidesShown)
                                    return <Redirect to={`${process.env.PUBLIC_URL}/wizard-setup`}/>;
                                else if (user) {
                                    if (user.hasOwnProperty("firstname"))
                                        return (
                                            <Redirect
                                                to={`${process.env.PUBLIC_URL}/dashboard/default/${layout}`}
                                            />
                                        );
                                    else
                                        return (
                                            <Redirect
                                                to={`${process.env.PUBLIC_URL}/pages/auth/login`}
                                            />
                                        );
                                } else
                                    return (
                                        <Redirect
                                            to={`${process.env.PUBLIC_URL}/pages/auth/login`}
                                        />
                                    );
                            }}
                        />

                        <WizardSetupLayout anim={anim}/>


                        {/*
                  currentUser !== null || authenticated || jwt_token  ?
                  <App>
                  <Route exact path={`${process.env.PUBLIC_URL}/`} render={() => {
                      return (<Redirect to={`${process.env.PUBLIC_URL}/dashboard/default/${layout}`} />)
                  }} />
                  <TransitionGroup>
                      {routes.map(({ path, Component }) => (
                        <Route key={path}  exact  path={`${process.env.PUBLIC_URL}${path}`}>
                            {({ match }) => (
                                <CSSTransition
                                  in={match != null}
                                  timeout={100}
                                  classNames={anim}
                                  unmountOnExit>
                                  <div>
                                      <Component/>
                                  </div>
                                </CSSTransition>
                            )}
                        </Route>
                        ))}
                  </TransitionGroup>

                  </App>
                  :
                  <Redirect to={`${process.env.PUBLIC_URL}/login`} />
              */}
                    </Switch>

                </Fragment>
            )}>

        </Detector>
    );
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
    user: selectUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
