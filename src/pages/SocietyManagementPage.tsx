/**
 * @Project gestion-courrier-native
 * @File SocietyManagementPage.tsx
 * @Path src/pages
 * @Author BRICE ZELE
 * @Date 09/06/2022
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
    fetchCreateSociety,
    fetchCreateSocietyReset,
    fetchGetAllSociety,
    fetchUpdateSociety,
    fetchUpdateSocietyReset
} from "../redux/society/society.action";
import {toast} from "react-toastify";
import * as Utils from "../utils/Tools";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../redux/config/config.selector";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import omit from 'lodash/omit';
import 'react-phone-input-2/lib/style.css'
import {selectCreateSociety, selectGetAllSociety, selectUpdateSociety} from "../redux/society/society.selector";

const SocietyManagementPage = ({createSociety, fetchCreateSociety, getAllSociety, fetchGetAllSociety, updateSociety, fetchUpdateSociety}) => {

    const {t} = useTranslation();
    let history = useHistory();
    const dispatch = useDispatch();

    const [openModal, setOpenModal] = useState(false);
    const [picture, setPicture] = useState(1);
    const [societyToModify, setSocietyToModify] = useState(null);
    const toggleModal = () => {
        setOpenModal(!openModal);
        setSocietyToModify(null);
        resetForm();
    }
    const [date, setDate] = useState({date: new Date()});
    const [generalData, setGeneralData] = useState([]);
    const [accountType, setAccountType] = useState(Role.EDITOR);

    /*    const {isLoading, error, data, refetch,  isFetching} = useQuery("userGithubInfos", () =>
            axios.delete(
                `${ServerUrl.signup}/${societyToModify._id}`
            ).then((res) => {
                console.log(res.data);
            })
        );*/

    useEffect(() => {
        dispatch(fetchCreateSocietyReset());
        dispatch(fetchUpdateSocietyReset());
        fetchGetAllSociety();
    }, []);

    useEffect(() => {
        if (createSociety.result !== null) {
            toast.success(t('society_successfully_added'));
            fetchGetAllSociety();
            setOpenModal(false);
            dispatch(fetchCreateSocietyReset());
        }
        if (createSociety.error !== null) {
            toast.error(Utils.getErrorMsg(createSociety));
            dispatch(fetchCreateSocietyReset());
        }
    }, [createSociety]);

    useEffect(() => {
        if (updateSociety.result !== null) {
            societyToModify !== null ? toast.success(t('society_successfullu_created')) : toast.success(t('society_successfullu_modified'));
            fetchGetAllSociety();
            setOpenModal(false);
            dispatch(fetchUpdateSocietyReset());
        }
        if (updateSociety.error !== null) {
            toast.error(Utils.getErrorMsg(updateSociety));
            dispatch(fetchUpdateSocietyReset());
        }
        if (societyToModify !== null) setSocietyToModify(null);

    }, [updateSociety]);

    const AddSocietySchema = Yup.object().shape({
        name: Yup.string().required(t('required'))
    });

    const {handleChange, handleSubmit, handleBlur, values, errors, setFieldError, setFieldValue, touched, resetForm} =
        useFormik({
            validationSchema: AddSocietySchema,
            initialValues: {
                name: '',
            },
            onSubmit: values => {
                if (societyToModify === null) {
                    fetchCreateSociety({
                        ...values
                    });
                } else {
                    delete values.player_id;
                    fetchUpdateSociety(societyToModify._id, true, '', {
                        name: values.name,
                    });
                }
            }
        });

    useEffect(() => {

        if (getAllSociety.error) {
            toast.error(Utils.getErrorMsg(getAllSociety));
        }
    }, [getAllSociety]);

    const renderModalAddSociety = () => (
        <Modal isOpen={openModal} toggle={toggleModal} size="lg">
            <ModalHeader
                toggle={toggleModal}>{societyToModify !== null ? t('modify_society') : t('add_new_society')}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="12">

                        <Form className="theme-form needs-validation" noValidate="" onSubmit={handleSubmit}>
                            <Row>
                                <Col sm="12">
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
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggleModal}>{t('close')}</Button>
                <Button color="secondary" disabled={createSociety.loading || updateSociety.loading} onClick={handleSubmit}>
                    {/*                    {createSociety.loading && (
                        <div className="loader-box">
                            <div className="loader-3"></div>
                        </div>
                    )}*/}
                    {(createSociety.loading || updateSociety.loading) ? t('loading_dots') : t('submit')}
                </Button>
            </ModalFooter>
        </Modal>
    )

    return (
        <Fragment>
            <Breadcrumb parent="Pages" title={t("societies")}/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <div className="media">
                                    <h5 style={{lineHeigt: '40px'}}>{t('society_list')}</h5>
                                    <div className="media-body text-right">
                                        <button className="btn btn-primary" onClick={toggleModal}>
                                            <span>{t('add')}</span></button>
                                        {renderModalAddSociety()}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                {getAllSociety.loading ?
                                    <div className="loader-box">
                                        <div className="loader-3"></div>
                                    </div>
                                    : getAllSociety.result !== null &&
                                    (<div className="user-status table-responsive">
                                        <Table borderless>
                                            <thead>
                                            <tr>
                                                <th scope="col">{`${t('label')}`}</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {getAllSociety.result.map(item => (
                                                <tr key={item._id}>
                                                    <td>{item.name}</td>
                                                    <td className="digits">
                                                        <div>
                                                            <span onClick={() => {
                                                                fetchUpdateSociety(item._id, false, '', {});
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
                                                                setSocietyToModify(item);
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
    createSociety: selectCreateSociety,
    getAllSociety: selectGetAllSociety,
    updateSociety: selectUpdateSociety
});

export default connect(mapStateToProps, {fetchCreateSociety, fetchGetAllSociety, fetchUpdateSociety})(SocietyManagementPage);