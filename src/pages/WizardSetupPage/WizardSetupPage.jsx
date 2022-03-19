import React, {Fragment, useEffect, useState} from 'react';
import StepZilla from "react-stepzilla";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Media, Row} from 'reactstrap'
import Breadcrumb from "../../components/breadcrumb";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../../redux/config/config.selector";
import {connect, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import Tour from "reactour";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Images} from "../../assets/images/Images";
import './styles.scss'
import {selectSignUp} from "../../redux/user/user.selector";
import {fetchSignUp, fetchSignUpReset} from "../../redux/user/user.action";
import {toast} from "react-toastify";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {useHistory} from "react-router-dom";
import * as Utils from "../../utils/Tools";
import Header from "../../components/header";
import {Role} from "../../enum/role.enum";

const WizardSetupPage = ({signUp, fetchSignUp}) => {

    const {t} = useTranslation();
    const [picture, setPicture] = useState(1);
    let history = useHistory();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchSignUpReset());
    }, []);

    useEffect(() => {
        if (signUp.result !== null) {
            history.push('/login');
            toast.success(t('account_created_you_can_login'));
            dispatch(fetchSignUpReset());
        }
        if (signUp.error !== null) {
            toast.error(Utils.getErrorMsg(signUp));
            dispatch(fetchSignUpReset());
        }
    }, [signUp]);

    const RegisterSchema = Yup.object().shape({
        firstname: Yup.string().required(t('name_required')),
        lastname: Yup.string(),
        email: Yup.string()
            .email(t('email_invalid'))
            .required(t('email_required')),
        password: Yup.string()
            .required(t('password_required'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                t('your_password_must_match'),
            ),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], t('two_password_doesnt_match')),
        phone_number: Yup.number()
    });

    const {handleChange, handleSubmit, handleBlur, values, errors, setFieldError, touched} =
        useFormik({
            validationSchema: RegisterSchema,
            initialValues: {
                firstname: '',
                lastname: '',
                email: '',
                phone_number: '',
                password: '',
                confirm_password: '',

            },
            onSubmit: values => {
                delete values.confirm_password;
                fetchSignUp({
                    ...values,
                    roles: Role.ADMIN,
                    picture
                });
            }
        });
    const [stepIndex, setStepIndex] = useState(0);
    const steps =
        [
            {
                name: t('presentation'), component: <Fragment>
                    <h6 className="f-w-600">{t('software_name')}</h6>
                    <p>{t('software_presentation')}</p>
                </Fragment>
            },
            {name: t('personalisation'), component: <div></div>},
            {
                name: t('admin_account_creation'),
                component: <>

                    <Row>
                        <Col sm="12">
                            <Form className="theme-form needs-validation" noValidate="" onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>{t('firstname')} *</Label>
                                            <Input className="form-control" type="text" name="firstname"
                                                   placeholder={t('enter_firstname')}
                                                   value={values.firstname}
                                                   onChange={handleChange('firstname')}
                                                   onBlur={handleBlur('firstname')}
                                            />
                                            <span
                                                style={{color: "red"}}>{errors.firstname !== '' && errors.firstname}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>{t('lastname')}</Label>
                                            <Input className="form-control" type="text" name="lastname"
                                                   placeholder={t('enter_lastname')}
                                                   value={values.lastname}
                                                   onChange={handleChange('lastname')}
                                                   onBlur={handleBlur('lastname')}/>
                                            <span
                                                style={{color: "red"}}>{errors.lastname !== '' && errors.lastname}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label>{t('email')} *</Label>
                                            <Input className="form-control" type="email" name="email"
                                                   placeholder={t('enter_email')}
                                                   value={values.email}
                                                   onChange={handleChange('email')}
                                                   onBlur={handleBlur('email')}/>
                                            <span style={{color: "red"}}>{errors.email !== '' && errors.email}</span>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label>{t('phone_number')}</Label>
                                            {/*                                            <Input className="form-control" type="tel" name="phone_number"
                                                   placeholder={t('enter_phone_number')}
                                                   value={values.phone_number}
                                                   onChange={handleChange('phone_number')}
                                                   onBlur={handleBlur('phone_number')}/>*/}
                                            <PhoneInput
                                                country={'cm'}
                                                inputStyle={{width: '100%'}}
                                                placeholder={t('enter_phone_number')}
                                                value={values.phone_number}
                                                onChange={handleChange('phone_number')}
                                                onBlur={handleBlur('phone_number')}
                                            />
                                            <span
                                                style={{color: "red"}}>{errors.phone_number !== '' && errors.phone_number}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label>{t('password')} *</Label>
                                            <Input className="form-control" type="password" name="password"
                                                   placeholder={t('enter_password')}
                                                   value={values.password}
                                                   onChange={handleChange('password')}
                                                   onBlur={handleBlur('password')}/>
                                            <span
                                                style={{color: "red"}}>{errors.password !== '' && errors.password}</span>
                                        </FormGroup>
                                    </Col>
                                    <Col sm="6">
                                        <FormGroup>
                                            <Label>{t('confirm_password')} *</Label>
                                            <Input className="form-control" type="password" name="confirm_password"
                                                   placeholder={t('confirm_password_required')}
                                                   value={values.confirm_password}
                                                   onChange={handleChange('confirm_password')}
                                                   onBlur={handleBlur('confirm_password')}/>
                                            <span
                                                style={{color: "red"}}>{errors.confirm_password !== '' && errors.confirm_password}</span>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>{t('avatar')} *</Label>
                                            <div className="avatars">
                                                <ul>
                                                    {Images.avatars.map((items, i) =>
                                                        <label className="avatar radio-img">
                                                            <input type="radio" onClick={() => setPicture(i + 1)}
                                                                   name="picture"
                                                                   value={i}/>
                                                            <Media className="image img-80 rounded-circle"
                                                                   src={items}/>
                                                        </label>
                                                    )}
                                                </ul>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="m-t-10">
                                        <FormGroup className="mb-0">
                                            <Button color="primary" onClick={handleSubmit} disabled={signUp.loading}
                                                    className="mr-3">{signUp.loading ? t('loading_dots') : t('submit')}</Button>
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </>
            },

        ];

    const stepsYour = [
        {
            selector: '.language-nav',
            content: t('change_language'),
        },
        {
            selector: '.mode',
            content: t('dark_theme'),
        }
    ];
    const closeTour = () => {
        setStepIndex(2);
    };
    const disableBody = target => disableBodyScroll(target);
    const enableBody = target => enableBodyScroll(target);

    return (
        <Fragment>
            <div className="page-wrapper compact-sidebar compact-small material-icon compact-wrapper" id="pageWrapper">
                <Header displayLeft={false}/>
                <div className="page-body-wrapper">
                    <div className="page-body">
                        <div>
                            <Breadcrumb parent="Forms" title={t('installation')}/>
                            <Tour
                                steps={stepsYour}
                                rounded={5}
                                isOpen={stepIndex === 1}
                                disableInteraction={true}
                                disableKeyboardNavigation={false}
                                onRequestClose={closeTour}
                                onAfterOpen={disableBody}
                                onBeforeClose={enableBody}/>
                            <Container fluid={true}>
                                <Row>
                                    <Col sm="12">
                                        <Card>
                                            <CardHeader>
                                                <h5>{t('software_installation')}</h5>
                                            </CardHeader>
                                            <CardBody>
                                                <StepZilla
                                                    steps={steps}
                                                    showSteps={true}
                                                    backButtonText={t('previous')}
                                                    showNavigation={true}
                                                    stepsNavigation={true}
                                                    prevBtnOnLastStep={false}
                                                    dontValidate={true}
                                                    nextButtonText={t('next')}
                                                    onStepChange={(step) => {
                                                        setStepIndex(step);
                                                    }}
                                                />
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
        ;
};

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
    signUp: selectSignUp
});

export default connect(mapStateToProps, {fetchSignUp})(WizardSetupPage);
