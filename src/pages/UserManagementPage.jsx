import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../components/breadcrumb';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Media,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import {useTranslation} from "react-i18next";
import {Images} from "../assets/images/Images";
import {UserPlus} from "react-feather";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Role} from "../enum/role.enum";
import {
    fetchGetAllUser,
    fetchSignUp,
    fetchSignUpReset,
    fetchUpdateUser,
    fetchUpdateUserReset
} from "../redux/user/user.action";
import {toast} from "react-toastify";
import * as Utils from "../utils/Tools";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../redux/config/config.selector";
import {selectGetAllUserExist, selectSignUp, selectUpdateUser} from "../redux/user/user.selector";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import omit from 'lodash/omit';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {fetchGetAllDepartment} from "../redux/department/department.action";
import {selectGetAllDepartment} from "../redux/department/department.selector";

const UserManagementPage = ({
                                signUp,
                                fetchSignUp,
                                getAllUser,
                                fetchGetAllUser,
                                updateUser,
                                fetchUpdateUser,
                                getAllDepartment,
                                fetchGetAllDepartment,
                            }) => {

    const {t} = useTranslation();
    let history = useHistory();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [picture, setPicture] = useState(1);
    const [userToModify, setUserToModify] = useState(null);
    const toggleModal = () => {
        setOpenModal(!openModal);
        setUserToModify(null);
        resetForm();
    }
    const [date, setDate] = useState({date: new Date()});
    const [generalData, setGeneralData] = useState([]);
    const [accountType, setAccountType] = useState(Role.EDITOR);

    useEffect(() => {
        dispatch(fetchSignUpReset());
        dispatch(fetchUpdateUserReset());
        fetchGetAllUser();
        fetchGetAllDepartment();
    }, []);

    useEffect(() => {

        if (getAllDepartment.error) {
            toast.error(Utils.getErrorMsg(getAllDepartment));
        }
    }, [getAllDepartment]);

    useEffect(() => {
        if (signUp.result !== null) {
            toast.success(t('account_created_you_can_login'));
            fetchGetAllUser();
            setOpenModal(false);
            dispatch(fetchSignUpReset());
        }
        if (signUp.error !== null) {
            toast.error(Utils.getErrorMsg(signUp));
            dispatch(fetchSignUpReset());
        }
    }, [signUp]);

    useEffect(() => {
        if (updateUser.result !== null) {
            userToModify !== null ? toast.success(t('account_successfully_modified')) : toast.success(t('account_successfully_delete'));
            fetchGetAllUser();
            setOpenModal(false);
            dispatch(fetchUpdateUserReset());
        }
        if (updateUser.error !== null) {
            toast.error(Utils.getErrorMsg(updateUser));
            dispatch(fetchUpdateUserReset());
        }
        if (userToModify !== null) setUserToModify(null);

    }, [updateUser]);

    const RegisterSchema = Yup.object().shape({
        firstname: Yup.string().required(t('name_required')),
        lastname: Yup.string(),
        email: Yup.string()
            .email(t('email_invalid'))
            .required(t('email_required')),
        password: userToModify !== null ? Yup.string() : Yup.string()
            .required(t('password_required'))
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                t('your_password_must_match'),
            ),
        confirm_password: userToModify !== null ? Yup.string() : Yup.string()
            .oneOf([Yup.ref('password'), null], t('two_password_doesnt_match')),
        phone_number: Yup.number(),
        department: Yup.mixed(),
    });

    const {handleChange, handleSubmit, handleBlur, values, errors, setFieldError, setFieldValue, touched, resetForm} =
        useFormik({
            validationSchema: RegisterSchema,
            initialValues: {
                firstname: '',
                lastname: '',
                email: '',
                phone_number: '',
                password: '',
                confirm_password: '',
                department: userToModify !== null
                    ? userToModify.hasOwnProperty('department')
                        ? userToModify.department._id
                        : null
                    : null
            },
            onSubmit: values => {
                delete values.confirm_password;
                if (userToModify === null) {
                    fetchSignUp({
                        ...values,
                        department: values.department !== '' ? values.department : null,
                        roles: accountType,
                        picture
                    });
                } else {
                    delete values.player_id;
                    fetchUpdateUser(userToModify._id, true, '', {
                        ...values,
                        department: values.department !== '' ? values.department : null,
                        roles: accountType,
                        picture
                    });
                }
            }
        });

    console.log("Errors",errors);
    console.log("Values",values);

    useEffect(() => {

        if (getAllUser.error) {
            toast.error(Utils.getErrorMsg(getAllUser));
        }
    }, [getAllUser]);

    const renderModalAddUser = () => (
        <Modal isOpen={openModal} toggle={toggleModal} size="lg">
            <ModalHeader
                toggle={toggleModal}>{userToModify !== null ? t('modify_user') : t('add_new_user')}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="12">

                        <Form className="theme-form needs-validation" noValidate="" onSubmit={handleSubmit}>
                            <Row>
                                <Col sm="6">
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
                                <Col sm="6">
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
                                        {/*                                        <Input className="form-control" type="tel" name="phone_number"
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
                                        <Label>{t('account_type')}</Label>
                                        <div className="select2-drpdwn-product select-options border-2"
                                             onChange={(e) => {
                                                 setAccountType(e.target.value);
                                                 if(e.target.value === Role.DG) {
                                                     setFieldValue('department', getAllDepartment.result[0]._id)
                                                 }
                                             }}>
                                            <select className="form-control btn-square" name="select">
                                                <option selected={userToModify === null}
                                                        value={Role.EDITOR}>{t(Role.EDITOR)}</option>
                                                <option
                                                    selected={userToModify !== null ? userToModify.roles === Role.ASSISTANTE_DG : false}
                                                    value={Role.ASSISTANTE_DG}>{t(Role.ASSISTANTE_DG)}</option>
                                                <option
                                                    selected={userToModify !== null ? userToModify.roles === Role.DGA : false}
                                                    value={Role.DGA}>{t(Role.DGA)}</option>
                                                <option
                                                    selected={userToModify !== null ? userToModify.roles === Role.STANDARD : false}
                                                    value={Role.STANDARD}>{t(Role.STANDARD)}</option>
                                                <option
                                                    selected={userToModify !== null ? userToModify.roles === Role.DG : false}
                                                    value={Role.DG}>{t(Role.DG)}</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            {
                                (accountType === Role.DG && getAllDepartment.result !== null) &&
                                (<Row>
                                    <Col>
                                        <FormGroup>
                                            <Label>{t('department')}</Label>
                                            <div className="select2-drpdwn-product select-options border-2"
                                                 onChange={(e) => setFieldValue("department", e.target.value)}>
                                                <select className="form-control btn-square" name="select">
                                                    {
                                                        getAllDepartment.result.map(item => (
                                                            <option
                                                                selected={userToModify !== null ? userToModify.hasOwnProperty("department")
                                                                        ? userToModify.department._id === item._id
                                                                        : false
                                                                    : false}
                                                                value={item._id}>{`${item.name} - ${item.dimunitif}`}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>)
                            }
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
                        </Form>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleModal}>{t('close')}</Button>
                <Button color="secondary" disabled={signUp.loading || updateUser.loading} onClick={handleSubmit}>
                    {/*                    {signUp.loading && (
                        <div className="loader-box">
                            <div className="loader-3"></div>
                        </div>
                    )}*/}
                    {(signUp.loading || updateUser.loading) ? t('loading_dots') : t('submit')}
                </Button>
            </ModalFooter>
        </Modal>
    )

    return (
        <Fragment>
            <Breadcrumb parent="Pages" title={t("users")}/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <div className="media">
                                    <h5 style={{lineHeigt: '40px'}}>{t('users_list')}</h5>
                                    <div className="media-body text-right">
                                        <button className="btn btn-primary" onClick={toggleModal}>
                                            <span>{t('add')}</span>
                                            <UserPlus style={{marginBottom: '-6px'}}/></button>
                                        {renderModalAddUser()}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                {getAllUser.loading ?
                                    <div className="loader-box">
                                        <div className="loader-3"></div>
                                    </div>
                                    : getAllUser.result !== null &&
                                    (<div className="user-status table-responsive">
                                        <Table borderless>
                                            <thead>
                                            <tr>
                                                <th scope="col">{`${t('firstname')} ${t('and')} ${t('lastname')}`}</th>
                                                <th scope="col">{t('account_type')}</th>
                                                <th scope="col">{t('email')}</th>
                                                <th scope="col">{t('phone_number')}</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {getAllUser.result.map(item => (
                                                <tr key={item._id}>
                                                    <td className="bd-t-none u-s-tb">
                                                        <div className="align-middle image-sm-size">
                                                            <img className="img-radius align-top m-r-15 rounded-circle"
                                                                 src={Images.avatars[item.picture]}
                                                                 alt=""/>
                                                            <div className="d-inline-block">
                                                                <h6>{item.firstname} {item.lastname}</h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{t(item.roles)}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone_number}</td>
                                                    <td className="digits">
                                                        <div>
                                                            <span onClick={() => {
                                                                fetchUpdateUser(item._id, false, '', {});
                                                            }}>
                                                                <i className="fa fa-trash" style={{
                                                                    width: 35,
                                                                    fontSize: 16,
                                                                    padding: 11,
                                                                    color: '#e4566e',
                                                                    cursor: 'pointer'
                                                                }}></i>
                                                            </span>
                                                            <span onClick={() => {
                                                                Object.keys(omit(item, ['createdAt', "id", "password", "__v", "_id"]))
                                                                    .map((element) => {
                                                                        Object.keys(omit(item, ['createdAt', "id", "password", "__v", "_id"]))
                                                                        setFieldValue(element, item[element]);
                                                                    });
                                                                setOpenModal(true);
                                                                setAccountType(item.roles);
                                                                setUserToModify(item);
                                                            }}>
                                                                <i className="fa fa-pencil" style={{
                                                                    width: 35,
                                                                    fontSize: 16,
                                                                    padding: 11,
                                                                    color: 'rgb(40, 167, 69)',
                                                                    cursor: 'pointer'
                                                                }}>
                                                                </i>
                                                            </span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </div>)}
                            </CardBody>
                        </Card>

                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
    signUp: selectSignUp,
    getAllUser: selectGetAllUserExist,
    getAllDepartment: selectGetAllDepartment,
    updateUser: selectUpdateUser
});

export default connect(mapStateToProps, {
    fetchSignUp,
    fetchGetAllUser,
    fetchGetAllDepartment,
    fetchUpdateUser
})(UserManagementPage);
