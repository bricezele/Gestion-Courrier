import React, {Fragment} from 'react';
import {Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Images} from '../../constant'
import {useTranslation} from "react-i18next";
import {Home, List, Mail, Users} from "react-feather";
import {Role} from "../../enum/role.enum";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../../redux/config/config.selector";
import {selectUser} from "../../redux/auth/oauth.selector";
import {connect} from "react-redux";

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
                    {(user.roles === Role.ADMIN || user.roles === Role.DGA) && (
                        <>
                            <li className="level-menu outside">
                                <Link className="nav-link active" to={`${process.env.PUBLIC_URL}/dashboard-admin`}>
                                    <Home/>
                                    <span>{t('dashboard')}</span>
                                </Link>
                            </li>
                            <li className="level-menu outside">
                                <Link className="nav-link active" to={`${process.env.PUBLIC_URL}/dashboard-courrier`}>
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
                            <li className="level-menu outside">
                                <Link className="nav-link active"
                                      to={`${process.env.PUBLIC_URL}/department-management`}>
                                    <List/>
                                    <span>{t('department')}</span>
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

