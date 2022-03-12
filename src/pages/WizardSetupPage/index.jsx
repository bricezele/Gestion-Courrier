import React, {Fragment, useState} from 'react';
import StepZilla from "react-stepzilla";
import {Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Media, Row} from 'reactstrap'
import Breadcrumb from "../../components/breadcrumb";
import {createStructuredSelector} from "reselect";
import {bindActionCreators} from "redux";
import {selectAppConfig} from "../../redux/config/config.selector";
import {connect, useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";
import Tour from "reactour";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {Images} from "../../assets/images/Images";
import './styles.scss'


const Index = () => {

    const {t} = useTranslation();
    const [selectedFile, setSelectedFile] = useState(null)   // Initially, no file is selected
    const {register} = useForm();
    const dispatch = useDispatch()
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());

    const handleStartDate = date => {
        setstartDate(date);
    };

    const handleEndDate = date => {
        setendDate(date);
    };

    const getUploadParams = ({meta}) => {
        return {
            url: 'https://httpbin.org/post'
        }
    }


    // called every time a file's `status` changes
    const handleChangeStatus = ({meta, file}, status) => {
    }

    const AddProject = data => {
    };

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
            .required(t('confirm_password_required'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                t('your_password_must_match'),
            ),
        phone_number: Yup.number()
    });

    const {handleChange, handleSubmit, handleBlur, values, errors, touched} =
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
                console.log(values);
            },
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
                                            <Input className="form-control" type="tel" name="phone_number"
                                                   placeholder={t('enter_phone_number')}
                                                   value={values.phone_number}
                                                   onChange={handleChange('phone_number')}
                                                   onBlur={handleBlur('phone_number')}/>
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
                                                            <input type="radio" name="picture"
                                                                   value={1}/>
                                                            <Media className="image img-80 rounded-circle"
                                                                   src={items}></Media>
                                                        </label>
                                                    )}
                                                </ul>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    {/*                                    <div className="product-size">
                                        <ul>
                                            {Images.avatar.map((items,i) =>
                                                <li key={i}>
                                                    <Button color="outline-light">{items}</Button>
                                                </li>
                                            )}
                                        </ul>
                                    </div>*/}
                                </Row>
                                <Row>
                                    <Col className="m-t-10">
                                        <FormGroup className="mb-0">
                                            <Button color="primary" onClick={handleSubmit}
                                                    className="mr-3">{t('submit')}</Button>
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

    const getFile = () => {
        document.getElementById("upfile").click();
    }

    const onFileChange = event => {
        // Update the state
        setSelectedFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        //let myfiles = [...myfile];

        /*if (selectedFile !== null) {
            myfiles.push({
                id: myfile.length + 1,
                name: selectedFile.name,
                size: `${selectedFile.size}`,
                modify: `${selectedFile.lastModifiedDate}`,
                icon:"fa fa-file-text-o txt-info"
            })
            setMyFile(myfiles)
            toast.success("File Upload Successfully !")
        }else {
            toast.error("Plese Select at least one file !")
        }*/
    };

    return (
        <Fragment>
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


        </Fragment>
    )
        ;
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({}, dispatch);

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
