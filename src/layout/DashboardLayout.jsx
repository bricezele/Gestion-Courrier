import React, {Fragment} from 'react';
import {ToastContainer} from 'react-toastify';
import {Route, withRouter} from 'react-router-dom';
import Header from "../components/header";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {dashboardLayoutRoute} from "../route/layout-route";
import ThemeCustomize from "../components/theme-customizer"

const DashboardLayout = ({anim = ''}) => {

    return (
        <Fragment>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header displayLeft={true} />
                <div className="page-body-wrapper">
                    <div className="page-body">
                        <TransitionGroup>
                            {dashboardLayoutRoute.map(({ path, Component }) => (
                                <Route key={path}  exact  path={`${path}`}>
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
export default withRouter(DashboardLayout);
