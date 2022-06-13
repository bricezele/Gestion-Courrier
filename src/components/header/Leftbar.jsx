import React, {Fragment} from 'react';
import {Col} from 'reactstrap'
import {Link} from 'react-router-dom'
import {Images} from '../../constant'
import {useTranslation} from "react-i18next";
import {Briefcase, Home, List, Mail, Users} from "react-feather";
import {Role} from "../../enum/role.enum";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../../redux/config/config.selector";
import {selectUser} from "../../redux/auth/oauth.selector";
import {connect} from "react-redux";

const Leftbar = ({user}) => {
    const {t} = useTranslation();
    
    const homeUrl = () => {
        if (user) {
            if (user.hasOwnProperty("firstname")) {
                switch (user.roles) {
                    case Role.ADMIN:
                        return `${process.env.PUBLIC_URL}/dashboard-admin`;
                    case Role.STANDARD:
                        return `${process.env.PUBLIC_URL}/dashboard-standard`;
                    case Role.ASSISTANTE_DG:
                        return `${process.env.PUBLIC_URL}/dashboard-assistant-dg`;
                    case Role.DGA:
                        return `${process.env.PUBLIC_URL}/dashboard-dga`;
                    case Role.EDITOR:
                        return `${process.env.PUBLIC_URL}/dashboard-editor`;
                    case Role.DG:
                        return `${process.env.PUBLIC_URL}/dashboard-direction`;

                }
            } else
                return `${process.env.PUBLIC_URL}/login`;
        } else
            return `${process.env.PUBLIC_URL}/login`;
    }

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
                    <li className="level-menu outside">
                        <Link className="nav-link active" to={homeUrl()}>
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
                    {(user.roles === Role.ADMIN || user.roles === Role.DGA) && (
                        <>
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
                            <li className="level-menu outside">
                                <Link className="nav-link active"
                                      to={`${process.env.PUBLIC_URL}/society-management`}>
                                    <Briefcase/>
                                    <span>{t('society')}</span>
                                </Link>
                            </li>
                        </>)
                    }
                    {user.roles === Role.DG && (
                        <li className="level-menu outside">
                            <Link className="nav-link active" to={`${process.env.PUBLIC_URL}/user-dg-management`}>
                                <Users/>
                                <span>{t('collaborators')}</span>
                            </Link>
                        </li>
                    )}
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

