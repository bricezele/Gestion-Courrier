import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, FormGroup, Input, Label, Row} from 'reactstrap'
import {Images} from "../../assets/images/Images";
import {useTranslation} from "react-i18next";
import * as Yup from 'yup';
import {useFormik} from "formik";
import {createStructuredSelector} from "reselect";
import {connect, useDispatch} from "react-redux";
import {fetchAuthKeyReset, fetchSignIn} from "../../redux/auth/oauth.action";
import {selectAuthKey, selectUser} from "../../redux/auth/oauth.selector";
import {toast} from "react-toastify";
import * as Utils from "../../utils/Tools";
import {classes} from "../../data/layouts";
import {useHistory} from "react-router-dom";
import {Role} from "../../enum/role.enum";

const LoginPage = ({fetchSignIn, authkey, user}) => {

    const {t} = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [togglePassword, setTogglePassword] = useState(false);
    const defaultLayoutObj = classes.find(
        (item) => Object.values(item).pop(1) === "compact-wrapper"
    );
    const layout =
        localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email(t('email_invalid'))
            .required(t('required')),
        password: Yup.string()
            .required(t('required')),
    });

    const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
        useFormik({
            validationSchema: LoginSchema,
            initialValues: {email: '', password: ''},
            onSubmit: values => {
                fetchSignIn(values.email.toLowerCase(), values.password);
            },
        });

    const HideShowPassword = (tPassword) => {
        setTogglePassword(!tPassword)
    }


    useEffect(() => {
        dispatch(fetchAuthKeyReset());
    }, []);

    useEffect(() => {
        console.log("authkey", authkey);
        if (authkey.result !== null) {
            if (authkey.result.user.hasOwnProperty("firstname")){
                switch (user.roles) {
                    case Role.ADMIN:
                        history.push(`/dashboard-admin`);
                        break;
                        case Role.STANDARD:
                        history.push(`/dashboard-standard`);
                        break;
                        case Role.ASSISTANTE_DG:
                        history.push(`/dashboard-assistante-dg`);
                        break;
                        case Role.EDITOR:
                        history.push(`/dashboard-editor`);
                        break;
                }
            }
        }

        if (authkey.error) {
            console.log("Error Message", Utils.getErrorMsg(authkey));
            toast.error(Utils.getErrorMsg(authkey));
            dispatch(fetchAuthKeyReset());
        }
    }, [authkey]);

    return (
        <Container fluid={true} className="p-0">
            <Row>
                <Col xl="7" className="order-1" style={{
                    backgroundImage: `url(${Images.loginBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "block"
                }}>
                </Col>
                <Col xs="5" className="p-0">
                    <div className="login-card">
                        <div>
                            <div>
                                <a className="logo text-center" href="#javascript">
                                    <img className="img-fluid for-light" style={{width: '300px'}}
                                         src={Images.logo} alt="looginpage"/>
                                    <img className="img-fluid for-dark" style={{width: '300px'}}
                                         src={Images.logo} alt="looginpage"/></a>
                            </div>
                            <div className="login-main login-tab">

                                <Form className="theme-form content-login" onSubmit={handleSubmit}>

                                    <h4>{t('sign_in')}</h4>
                                    <p>{t('enter_email_password_to_login')}</p>

                                    <FormGroup>
                                        <Label className="col-form-label">{t('email')}</Label>
                                        <Input className="email_valid" type="email" name="email" value={values.email}
                                               placeholder={t('enter_email')}
                                               value={values.email}
                                               onChange={handleChange('email')}
                                               onBlur={handleBlur('email')}/>
                                        <span style={{color: "red"}}>{errors.email !== '' && errors.email}</span>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className="col-form-label">{t('password')}</Label>
                                        <Input className="password_valid" type={togglePassword ? "text" : "password"}
                                               value={values.password}
                                               placeholder={t('enter_password')}
                                               onChange={handleChange('password')}
                                               onBlur={handleBlur('password')}/>
                                        <span style={{color: "red"}}>{errors.password !== '' && errors.password}</span>
                                        <div className="show-hide" onClick={() => HideShowPassword(togglePassword)}>
                                            <span className={togglePassword ? "" : "show"}></span></div>

                                    </FormGroup>
                                    <FormGroup className="mb-0">
                                        <div className="checkbox ml-3">
                                            <Input id="checkbox1" type="checkbox"/>
                                            <Label className="text-muted" for="checkbox1">{t('remember_me')}</Label>
                                        </div>
                                        <a className="link" href="#javascript">{t('forgot_password')}</a>
                                        <Button color="primary" onClick={handleSubmit} disabled={authkey.loading}
                                                className="mr-3">
                                            {authkey.loading ? t('loading_dots') : t('login')}
                                        </Button>
                                    </FormGroup>

                                </Form>

                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
const mapStateToProps = createStructuredSelector({
    authkey: selectAuthKey,
    user: selectUser,
});

export default connect(mapStateToProps, {fetchSignIn})(LoginPage);
