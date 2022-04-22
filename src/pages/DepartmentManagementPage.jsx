/**
 * @Project gestion-courrier-native
 * @File DepartmentManagementPage.jsx
 * @Path src/pages
 * @Author BRICE ZELE
 * @Date 21/04/2022
 */
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
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import {useTranslation} from "react-i18next";
import {useFormik} from "formik";
import * as Yup from "yup";
import {Role} from "../enum/role.enum";
import {
    fetchCreateDepartment,
    fetchCreateDepartmentReset,
    fetchGetAllDepartment,
    fetchUpdateDepartment,
    fetchUpdateDepartmentReset
} from "../redux/department/department.action";
import {toast} from "react-toastify";
import * as Utils from "../utils/Tools";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../redux/config/config.selector";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import omit from 'lodash/omit';
import 'react-phone-input-2/lib/style.css'
import {
    selectCreateDepartment,
    selectGetAllDepartment,
    selectUpdateDepartment
} from "../redux/department/department.selector";

const DepartmentManagementPage = ({createDepartment, fetchCreateDepartment, getAllDepartment, fetchGetAllDepartment, updateDepartment, fetchUpdateDepartment}) => {

    const {t} = useTranslation();
    let history = useHistory();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [picture, setPicture] = useState(1);
    const [departmentToModify, setDepartmentToModify] = useState(null);
    const toggleModal = () => {
        setOpenModal(!openModal);
        setDepartmentToModify(null);
        resetForm();
    }
    const [date, setDate] = useState({date: new Date()});
    const [generalData, setGeneralData] = useState([]);
    const [accountType, setAccountType] = useState(Role.EDITOR);

    /*    const {isLoading, error, data, refetch,  isFetching} = useQuery("userGithubInfos", () =>
            axios.delete(
                `${ServerUrl.signup}/${departmentToModify._id}`
            ).then((res) => {
                console.log(res.data);
            })
        );*/

    useEffect(() => {
        dispatch(fetchCreateDepartmentReset());
        dispatch(fetchUpdateDepartmentReset());
        fetchGetAllDepartment();
    }, []);

    useEffect(() => {
        if (createDepartment.result !== null) {
            toast.success(t('account_created_you_can_login'));
            fetchGetAllDepartment();
            setOpenModal(false);
            dispatch(fetchCreateDepartmentReset());
        }
        if (createDepartment.error !== null) {
            toast.error(Utils.getErrorMsg(createDepartment));
            dispatch(fetchCreateDepartmentReset());
        }
    }, [createDepartment]);

    useEffect(() => {
        if (updateDepartment.result !== null) {
            departmentToModify !== null ? toast.success(t('department_successfullu_created')) : toast.success(t('department_successfullu_modified'));
            fetchGetAllDepartment();
            setOpenModal(false);
            dispatch(fetchUpdateDepartmentReset());
        }
        if (updateDepartment.error !== null) {
            toast.error(Utils.getErrorMsg(updateDepartment));
            dispatch(fetchUpdateDepartmentReset());
        }
        if (departmentToModify !== null) setDepartmentToModify(null);

    }, [updateDepartment]);

    const AddDepartmentSchema = Yup.object().shape({
        name: Yup.string().required(t('required')),
        dimunitif: Yup.string().required(t('required')),
    });

    const {handleChange, handleSubmit, handleBlur, values, errors, setFieldError, setFieldValue, touched, resetForm} =
        useFormik({
            validationSchema: AddDepartmentSchema,
            initialValues: {
                name: '',
                dimunitif: '',
            },
            onSubmit: values => {
                if (departmentToModify === null) {
                    fetchCreateDepartment({
                        ...values
                    });
                } else {
                    delete values.player_id;
                    fetchUpdateDepartment(departmentToModify._id, true, '', {
                        name: values.name,
                        dimunitif: values.dimunitif
                    });
                }
            }
        });

    useEffect(() => {

        if (getAllDepartment.error) {
            toast.error(Utils.getErrorMsg(getAllDepartment));
        }
    }, [getAllDepartment]);

    const renderModalAddDepartment = () => (
        <Modal isOpen={openModal} toggle={toggleModal} size="lg">
            <ModalHeader
                toggle={toggleModal}>{departmentToModify !== null ? t('modify_department') : t('add_new_department')}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="12">

                        <Form className="theme-form needs-validation" noValidate="" onSubmit={handleSubmit}>
                            <Row>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label>{t('label')} *</Label>
                                        <Input className="form-control" type="text" name="firstname"
                                               placeholder={t('enter_label')}
                                               value={values.name}
                                               onChange={handleChange('name')}
                                               onBlur={handleBlur('name')}
                                        />
                                        <span
                                            style={{color: "red"}}>{errors.name !== '' && errors.name}</span>
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label>{t('dimunitif')}</Label>
                                        <Input className="form-control" type="text" name="lastname"
                                               placeholder={t('enter_dimunitif')}
                                               value={values.dimunitif}
                                               onChange={handleChange('dimunitif')}
                                               onBlur={handleBlur('dimunitif')}/>
                                        <span
                                            style={{color: "red"}}>{errors.dimunitif !== '' && errors.dimunitif}</span>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleModal}>{t('close')}</Button>
                <Button color="secondary" disabled={createDepartment.loading || updateDepartment.loading} onClick={handleSubmit}>
                    {/*                    {createDepartment.loading && (
                        <div className="loader-box">
                            <div className="loader-3"></div>
                        </div>
                    )}*/}
                    {(createDepartment.loading || updateDepartment.loading) ? t('loading_dots') : t('submit')}
                </Button>
            </ModalFooter>
        </Modal>
    )

    return (
        <Fragment>
            <Breadcrumb parent="Pages" title={t("departments")}/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <div className="media">
                                    <h5 style={{lineHeigt: '40px'}}>{t('department_list')}</h5>
                                    <div className="media-body text-right">
                                        <button className="btn btn-primary" onClick={toggleModal}>
                                            <span>{t('add')}</span></button>
                                        {renderModalAddDepartment()}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                {getAllDepartment.loading ?
                                    <div className="loader-box">
                                        <div className="loader-3"></div>
                                    </div>
                                    : getAllDepartment.result !== null &&
                                    (<div className="user-status table-responsive">
                                        <Table borderless>
                                            <thead>
                                            <tr>
                                                <th scope="col">{`${t('label')}`}</th>
                                                <th scope="col">{t('dimunitif')}</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {getAllDepartment.result.map(item => (
                                                <tr key={item._id}>
                                                    <td>{item.name}</td>
                                                    <td>{item.dimunitif}</td>
                                                    <td className="digits">
                                                        <div>
                                                            <span onClick={() => {
                                                                fetchUpdateDepartment(item._id, false, '', {});
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
                                                                setDepartmentToModify(item);
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
    createDepartment: selectCreateDepartment,
    getAllDepartment: selectGetAllDepartment,
    updateDepartment: selectUpdateDepartment
});

export default connect(mapStateToProps, {fetchCreateDepartment, fetchGetAllDepartment, fetchUpdateDepartment})(DepartmentManagementPage);
