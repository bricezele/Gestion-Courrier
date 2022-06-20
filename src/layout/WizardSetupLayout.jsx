import React, {Fragment} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Header from "../components/header";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {layoutRoute} from "../route/layout-route";
import ThemeCustomize from "../components/theme-customizer"

const WizardSetupLayout = ({anim = ''}) => {

    return (
        <Fragment>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header displayLeft={false}/>
                <div className="page-body-wrapper">
                    <div className="page-body">
                        <TransitionGroup>
                            {layoutRoute.map(({ path, Component }) => (
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
        </Fragment>
    );
}
export default withRouter(WizardSetupLayout);
