/**
 * @Project gestion-courrier-native
 * @File CourrierManagementPage.jsx
 * @Path src/pages
 * @Author BRICE ZELE
 * @Date 04/05/2022
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
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
    Table
} from 'reactstrap';
import {useTranslation} from "react-i18next";
import {Images} from "../assets/images/Images";
import {Role} from "../enum/role.enum";
import {fetchGetAllUser, fetchSignUp, fetchUpdateUser} from "../redux/user/user.action";
import {toast} from "react-toastify";
import * as Utils from "../utils/Tools";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../redux/config/config.selector";
import {selectGetAllUserExist, selectSignUp, selectUpdateUser} from "../redux/user/user.selector";
import {connect, useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import 'react-phone-input-2/lib/style.css'
import {fetchGetAllDepartment} from "../redux/department/department.action";
import {selectGetAllDepartment} from "../redux/department/department.selector";
import {
    fetchCreateCourrierReset,
    fetchGetAllCourrier,
    fetchGetAllCourrierReset,
    fetchUpdateCourrierReset
} from "../redux/courrier/courrier.action";
import {selectGetAllCourrier} from "../redux/courrier/courrier.selector";
import {fetchUploadMediaReset} from "../redux/common/common.action";
import moment from "moment-timezone";
import {CourrierStatus} from "../enum/courrierstatus.enum";

const CourrierManagementPage = ({
                                signUp,
                                fetchSignUp,
                                getAllUser,
                                fetchGetAllUser,
                                updateUser,
                                fetchUpdateUser,
                                getAllDepartment,
                                fetchGetAllDepartment,
                                getAllCourrier,
                                fetchGetAllCourrier,
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
    const [courrier, setCourrier] = useState(null);
    const [courriers, setCourriers] = useState([]);

    const [openModalCourrier, setOpenModalCourrier] = useState(false);

    const toggleModalCourrier = () => {
        setOpenModalCourrier(!openModalCourrier);
        setCourrier(null);
    }

    useEffect(() => {
        dispatch(fetchUploadMediaReset());
        dispatch(fetchCreateCourrierReset());
        dispatch(fetchGetAllCourrierReset());
        dispatch(fetchUpdateCourrierReset());
        fetchGetAllCourrier();
        moment.locale('fr');
    }, []);

    useEffect(() => {
        if(getAllCourrier.result !== null)
            setCourriers(getAllCourrier.result.filter(courrier => courrier.status === 'archive'));

        if (getAllCourrier.error) {
            toast.error(Utils.getErrorMsg(getAllCourrier));
        }
    }, [getAllCourrier]);

    const renderModalDetailCourrier = () => (
        <Modal isOpen={openModalCourrier} toggle={toggleModalCourrier} size="xl">
            <ModalHeader
                toggle={toggleModalCourrier}>{t('courrier')}</ModalHeader>

            <ModalBody>
                <Row className="file-content">
                    <Col>
                        <Card>
                            <Row className="product-page-main">
                                <Col xl="6 xl-100">
                                    <Card>
                                        <CardBody>
                                            <div className="product-page-details">
                                                <h3>{t(courrier.category)}</h3>
                                            </div>
                                            <hr/>
                                            <p>{courrier.objet}</p>
                                            <hr/>
                                            <div>
                                                <table className="product-page-width">
                                                    <tbody>
                                                    <tr>
                                                        <td><b>{t('Code')} &nbsp;&nbsp;&nbsp;:</b></td>
                                                        <td>{courrier.code}</td>
                                                    </tr>
                                                    <tr>
                                                        <td><b>{t('emetteur')} &nbsp;&nbsp;&nbsp;:</b></td>
                                                        <td>{courrier.emetteur}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>{t('recepteur')} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                        </td>
                                                        <td className="txt-success">{courrier.recepteur || courrier.direction}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>{t('date_reception')} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                        </td>
                                                        <td>{moment(courrier.createdAt).format('LL')}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <b>{t('status')} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
                                                        </td>
                                                        <td>
                                                            {
                                                                courrier.status === CourrierStatus.PENDING ?
                                                                    <span
                                                                        className={`badge badge-danger f-right`}>{t(CourrierStatus.EN_ATTENTE_VALIDATION_1)}</span>
                                                                    : courrier.status === CourrierStatus.EN_ATTENTE_VALIDATION_1 ?
                                                                        <span
                                                                            className={`badge badge-warning f-right`}>{t(CourrierStatus.EN_ATTENTE_VALIDATION_2)}</span>
                                                                        : courrier.status === CourrierStatus.EN_ATTENTE_VALIDATION_2 ?
                                                                            <span
                                                                                className={`badge badge-primary f-right`}>{t(CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA)}</span>
                                                                            : courrier.status === CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA ?
                                                                                courrier.cotation.length > 0 ?
                                                                                    courrier.cotation.filter(cotationParam => cotationParam.validated === true).length === courrier.cotation.length ?
                                                                                        <span
                                                                                            className={`badge badge-secondary f-right`}>{t('en_attente_approbation')}</span>
                                                                                        :
                                                                                        <span
                                                                                            className={`badge badge-primary f-right`}>{t(CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA)}</span>
                                                                                    : <span
                                                                                        className={`badge badge-secondary f-right`}>{t('en_attente_approbation')}</span>
                                                                                : courrier.status === CourrierStatus.VALIDE_APPROUVE ?
                                                                                    <span
                                                                                        className={`badge badge-success f-right`}>{t('valide_approuve')}</span>
                                                                                    : null
                                                            }
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <hr/>
                                            {courrier.cotation.length > 0 && (<Row>
                                                <Col md="3">
                                                    <h6 className="product-title"><b>{t("cotation")}: </b></h6>
                                                </Col>
                                                <Col md="9">
                                                    <div className="product-icon">
                                                        <ul className="product-social">
                                                            {
                                                                courrier.cotation.map(cotation => (
                                                                    <li>- {`${cotation.user.firstname} ${cotation.user.lastname}`}
                                                                        <span
                                                                            className={`badge ${cotation.validated ? 'badge-primary' : 'badge-danger'} f-right`}>
                                                                            {cotation.validated ? t('validated') : t('non_validated')}
                                                                        </span>
                                                                    </li>
                                                                ))
                                                            }
                                                        </ul>
                                                        <form className="d-inline-block f-right"></form>
                                                    </div>
                                                </Col>
                                            </Row>)
                                            }
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col xl="6" className="new-update pt-0">
                                    <Card>
                                        <CardHeader className="card-no-border">
                                            <h3>{t('modification_courrier')}</h3>
                                        </CardHeader>
                                        <CardBody className="pt-0">
                                            <div className="appointment-table table-responsive">
                                                <table className="table table-bordernone">
                                                    <tbody>
                                                    {
                                                        courrier.modifications_history.map((historyElt) => (
                                                            <tr>
                                                                <td><img
                                                                    className="img-fluid img-40 rounded-circle mb-3"
                                                                    src={Images.avatars[historyElt.user.picture]}
                                                                    alt=""/>
                                                                </td>
                                                                <td className="img-content-box"><span
                                                                    className="d-block">{`${historyElt.user.firstname} ${historyElt.user.lastname}`}</span><span
                                                                    className="font-roboto">{moment(historyElt.date).fromNow()}</span>
                                                                </td>
                                                                <td className="text-right">
                                                                    {
                                                                        historyElt.status === CourrierStatus.PENDING ?
                                                                            <span
                                                                                className={`badge badge-danger f-right`}>{t(CourrierStatus.EN_ATTENTE_VALIDATION_1)}</span>
                                                                            : historyElt.status === CourrierStatus.EN_ATTENTE_VALIDATION_1 ?
                                                                                <span
                                                                                    className={`badge badge-warning f-right`}>{t(CourrierStatus.EN_ATTENTE_VALIDATION_2)}</span>
                                                                                : historyElt.status === CourrierStatus.EN_ATTENTE_VALIDATION_2 ?
                                                                                    <span
                                                                                        className={`badge badge-primary f-right`}>{t(CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA)}</span>
                                                                                    : historyElt.status === CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA ?
                                                                                        courrier.cotation.length > 0 ?
                                                                                            courrier.cotation.filter(cotation => cotation.validated === true).length === courrier.cotation.length ?
                                                                                                <span
                                                                                                    className={`badge badge-secondary f-right`}>{t('en_attente_approbation')}</span>
                                                                                                :
                                                                                                <span
                                                                                                    className={`badge badge-primary f-right`}>{t(CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA)}</span>
                                                                                            : <span
                                                                                                className={`badge badge-secondary f-right`}>{t('en_attente_approbation')}</span>
                                                                                        : historyElt.status === CourrierStatus.VALIDE_APPROUVE ?
                                                                                            <span
                                                                                                className={`badge badge-success f-right`}>{t('valide_approuve')}</span>
                                                                                            : historyElt.status === 'archive' ?
                                                                                                <span
                                                                                                    className={`badge badge-success f-right`}>{t('archived')}</span>
                                                                                                : null
                                                                    }
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }

                                                    </tbody>
                                                </table>
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl="12">
                                    <div className="file-manager">
                                        <ul className="files">
                                            {courrier.documents_annexe.map((doc, index) => (
                                                <li className="file-box" style={{cursor: "pointer"}} onClick={() => {
                                                    window.open(doc.url)
                                                }} key={index}>
                                                    <div className="file-top"><i
                                                        className={`fa fa-file-text-o txt-info`}></i><i
                                                        className="fa fa-ellipsis-v f-14 ellips"></i>
                                                    </div>
                                                    <div className="file-bottom">
                                                        <h6>{doc.fileName} </h6>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={toggleModalCourrier}>{t('OK')}</Button>
            </ModalFooter>
        </Modal>
    )

    return (
        <Fragment>
            <Breadcrumb parent="Pages" title={t("courrieral")}/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <div className="media">
                                    <h5 style={{lineHeigt: '40px'}}>{t('courriers_archives')}</h5>
                                    <div className="media-body" style={{display: 'flex', justifyContent: 'flex-end'}}>
                                        <Input className="form-control" type="text" name="firstname"
                                               placeholder={t('search')}
                                               onChange={(e)=> {
                                                   const inputValue = ('' + e.target.value).toLowerCase();
                                                   if(inputValue === '')
                                                       setCourriers(getAllCourrier.result.filter(courrier => courrier.status === 'archive'))
                                                   else
                                                       setCourriers(getAllCourrier.result.filter(courrier => ((courrier.status === 'archive') && (courrier.category.toLowerCase().includes(inputValue)
                                                       || courrier.emetteur.toLowerCase().includes(inputValue) || courrier.objet.toLowerCase().includes(inputValue) || courrier.direction.toLowerCase().includes(inputValue)))));
                                               }}
                                               style={{width: 'fit-content'}}
                                        />
                                    </div>
                                </div>
                                {courrier !== null && renderModalDetailCourrier()}
                            </CardHeader>
                            <CardBody>
                                {getAllCourrier.loading ?
                                    <div className="loader-box">
                                        <div className="loader-3"></div>
                                    </div>
                                    : getAllCourrier.result !== null &&
                                    (<div className="user-status table-responsive">
                                        <Table borderless>
                                            <thead>
                                            <tr>
                                                <th scope="col">{`${t('code')}`}</th>
                                                <th scope="col">{t('category')}</th>
                                                <th scope="col">{t('direction')}</th>
                                                <th scope="col">{t('emeteur')}</th>
                                                <th scope="col">{t('objet')}</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {courriers.map(item => (
                                                <tr key={item._id}>
                                                    <td className="bd-t-none u-s-tb">
                                                        {item.code}
                                                    </td>
                                                    <td>{t(item.category)}</td>
                                                    <td>{item.direction}</td>
                                                    <td>{item.emetteur}</td>
                                                    <td>{item.objet}</td>
                                                    <td className="digits">
                                                        <div>
                                                            <span onClick={() => {
                                                                console.log("click");
                                                                toggleModalCourrier();
                                                                setCourrier(item);
                                                            }}>
                                                                <i className="fa fa-eye" style={{
                                                                    width: 35,
                                                                    fontSize: 16,
                                                                    padding: 11,
                                                                    color: '#e4566e',
                                                                    cursor: 'pointer'
                                                                }}></i>
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
    updateUser: selectUpdateUser,
    getAllCourrier: selectGetAllCourrier,
});

export default connect(mapStateToProps, {
    fetchSignUp,
    fetchGetAllUser,
    fetchGetAllDepartment,
    fetchUpdateUser,
    fetchGetAllCourrier,
})(CourrierManagementPage);
