import React, {Fragment} from 'react';
import Loader from "./LoaderComponent";
import Taptop from "./tap-top";
import Header from './header'
import Sidebar from './sidebar'
import Footer from './footer'
import ThemeCustomize from "./theme-customizer";
import {ToastContainer} from 'react-toastify'
import {withRouter} from 'react-router-dom'

const App = ({children}) => {
    return (
        <Fragment>
            <Loader/>
            <Taptop/>
            <div className="page-wrapper compact-wrapper" id="pageWrapper">
                <Header/>
                <div className="page-body-wrapper">
                    <Sidebar/>
                    <div className="page-body">
                        {children}
                    </div>
                    <Footer/>
                </div>

            </div>
            <ThemeCustomize/>
            <ToastContainer/>
        </Fragment>
    );
}
export default withRouter(App);
