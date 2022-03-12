import React, {Fragment, useState} from 'react';
import {ToastContainer} from 'react-toastify';
import {Route, withRouter} from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import Loader from "../components/LoaderComponent";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {routes} from "../route";
import {wizardLayoutRoute} from "../route/wizard-layout-route";
import ConfigDB from "../data/customizer/config";
import Taptop from "../components/tap-top";
import ThemeCustomize from "../components/theme-customizer"
import Sidebar from "../components/sidebar";
const WizardSetupLayout = ({anim = ''}) => {

    return (
        <Fragment>
            <Taptop/>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header displayLeft={false}/>
                <div className="page-body-wrapper">
                    <div className="page-body">
                        <TransitionGroup>
                            {wizardLayoutRoute.map(({ path, Component }) => (
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
                    </div>
                </div>

            </div>
            <ThemeCustomize/>
            <ToastContainer/>
        </Fragment>
    );
}
export default withRouter(WizardSetupLayout);
