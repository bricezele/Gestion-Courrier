import React, {Fragment, useLayoutEffect, useState} from 'react';
import {Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Images} from '../../constant'
import {DefaultLayout} from '../theme-customizer';
import {useTranslation} from "react-i18next";
import {Home, Mail, Users} from "react-feather";
import {Role} from "../../enum/role.enum";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../../redux/config/config.selector";
import {selectUser} from "../../redux/auth/oauth.selector";
import {connect} from "react-redux";
import {fetchSignUp} from "../../redux/user/user.action";

const Leftbar = ({user}) => {
    const {t} = useTranslation();

    return (
        <Fragment>
            <div className="header-logo-wrapper" id="out_side_click">
                <div className="logo-wrapper">
                    <Link to={`${process.env.PUBLIC_URL}/dashboard`}>
                        <img className="img-fluid for-light" src={Images.logo} alt=""/>
                        <img className="img-fluid for-dark" src={Images.logo} alt=""/>
                    </Link>
                </div>
            </div>
            <Col className="left-header horizontal-wrapper pl-0">
                <ul className="horizontal-menu">
                    {user.roles === Role.ADMIN && (
                        <>
                        <li className="level-menu outside">
                            <Link className="nav-link active" to={`${process.env.PUBLIC_URL}/dashboard`}>
                                <Home/>
                                <span>{t('dashboard')}</span>
                            </Link>
                        </li>
                        <li className="level-menu outside">
                            <Link className="nav-link active" to={`${process.env.PUBLIC_URL}/dashboard`}>
                                <Mail/>
                                <span>{t('courriers')}</span>
                            </Link>
                        </li>
                        <li className="level-menu outside">
                            <Link className="nav-link active" to={`${process.env.PUBLIC_URL}/user-management`}>
                                <Users/>
                                <span>{t('users')}</span>
                            </Link>
                        </li>
                        </>)
                    }
                </ul>
            </Col>
        </Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
    user: selectUser
});

export default connect(mapStateToProps, {})(Leftbar);

