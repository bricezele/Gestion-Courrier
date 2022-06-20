import React, {createRef, Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../components/breadcrumb'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Form,
    FormGroup,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap'
import {Check, Database, Edit2, Inbox, Mail} from 'react-feather';
import CountUp from "react-countup";
import Board from '@asseinfo/react-kanban'
import '@asseinfo/react-kanban/dist/styles.css'
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
import {Role} from "../enum/role.enum";
import {toast} from "react-toastify";
import * as Utils from "../utils/Tools";
import {Images} from "../assets/images/Images";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../redux/config/config.selector";
import './styles.scss';
import {selectCreateCourrier, selectGetAllCourrier, selectUpdateCourrier} from "../redux/courrier/courrier.selector";
import {
    fetchCreateCourrier,
    fetchCreateCourrierReset,
    fetchGetAllCourrier,
    fetchGetAllCourrierReset,
    fetchUpdateCourrier,
    fetchUpdateCourrierReset
} from "../redux/courrier/courrier.action";
import {fetchUploadMedia, fetchUploadMediaReset, fetchUploadMedias} from "../redux/common/common.action";
import {FileUsage} from "../enum/fileusage.enum";
import {EntityType} from "../enum/entitytype.enum";
import {FileType} from "../enum/filetype.enum";
import {CourrierStatus} from "../enum/courrierstatus.enum";
import {selectFileUpload} from "../redux/common/common.selector";
import {selectUser} from "../redux/auth/oauth.selector";

import 'moment/locale/en-au';
import 'moment/locale/en-ca';
import 'moment/locale/en-gb';
import 'moment/locale/en-ie';
import 'moment/locale/en-il';
import 'moment/locale/en-nz';
import 'moment/locale/es-us';
import 'moment/locale/fr';
import {Multiselect} from "multiselect-react-dropdown";
import {selectGetAllUserExist} from "../redux/user/user.selector";
import {fetchGetAllUser} from "../redux/user/user.action";

const moment = require('moment-timezone');

const DashboardPageAdmin = ({
                                user,
                                createCourrier,
                                fetchCreateCourrier,
                                getAllCourrier,
                                fetchGetAllCourrier,
                                updateCourrier,
                                fetchUpdateCourrier,
                                filesupload,
                                fetchUploadMedias,
                                fetchUploadMedia,
                                getAllUser,
                                fetchGetAllUser,
                            }) => {

    const {t} = useTranslation();
    let history = useHistory();
    const dispatch = useDispatch();
    const dropzoneRef = createRef();

    const columns = ["pending", "validation_1", "validation_2", "cotation_approbation_dga", "validation_approbation"];
    const [board, setBoard] = useState({
        columns: Object.keys(CourrierStatus)
            .map((status, index) => {
                    return {
                        id: index + 1,
                        title: t(columns[index]),
                        status: CourrierStatus[status],
                        cards: []
                    }
                }
            )
    });

    const [selectedImage, setSelectedImage] = useState(null); // Initially, no file is selected
    const [selectedAdditionalFiles, setSelectedAdditionalFiles] = useState([]); // Initially, no file is selected
    const [selectedImagePreview, setSelectedImagePreview] = useState(null); // Initially, no file is selected
    const [openModal, setOpenModal] = useState(false);
    const [openModalCourrier, setOpenModalCourrier] = useState(false);
    const [isCourrierCreated, setisCourrierCreated] = useState(false);
    const [users, setUsers] = useState([]);
    const [openModalCotation, setOpenModalCotation] = useState(false);
    const [cotations, setCotation] = useState([]);
    const [submitCotation, setSubmitCotation] = useState(false);
    const [userToModify, setUserToModify] = useState(null);
    const [courrier, setCourrier] = useState(null);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const toggleModal = () => {
        setOpenModal(!openModal);
        setUserToModify(null);
    }

    const toggleModalCourrier = () => {
        setOpenModalCourrier(!openModalCourrier);
        setCourrier(null);
    }

    const toggleModalCotation = () => {
        if (openModalCotation) setSubmitCotation(false);
        setOpenModalCotation(!openModalCotation);

        console.log("openModalCotation", openModalCotation);
        console.log("cotations", cotations);

        if (cotations.length > 0) {
            fetchUpdateCourrier(courrier.id, true, {
                status: CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA,
                cotation: cotations.map(cotation => {
                    return {
                        user: cotation._id,
                        validated: false
                    }
                })
            })
        }
    }

    const [date, setDate] = useState({date: new Date()});
    const [generalData, setGeneralData] = useState([]);
    const [accountType, setAccountType] = useState(Role.EDITOR);

    useEffect(() => {
        dispatch(fetchUploadMediaReset());
        dispatch(fetchCreateCourrierReset());
        dispatch(fetchGetAllCourrierReset());
        dispatch(fetchUpdateCourrierReset());
        fetchGetAllCourrier();
        moment.locale('fr');
    }, []);

    useEffect(() => {
        console.log("board", board);
        forceUpdate();
    }, [board]);

    useEffect(() => {
        if (getAllCourrier.result !== null) {
            let tmpcolumns = board.columns;

            getAllCourrier.result.filter((courrier) => courrier.status !== 'archive').map((courrier, index) => {

                const indexColumn = tmpcolumns.findIndex(elt => {
                    return elt.status === courrier.status
                });

                if (indexColumn !== -1) {
                    if (tmpcolumns[indexColumn].cards.length === 0)
                        tmpcolumns[indexColumn].cards.push(courrier);
                    else {
                        const indexElt = tmpcolumns[indexColumn].cards.findIndex(elt => {
                            return elt.id === courrier.id
                        });
                        if (indexElt === -1)
                            tmpcolumns[indexColumn].cards.push(courrier);
                    }

                }

            });
            console.log("TMPColumns", tmpcolumns);
            setBoard({
                columns: tmpcolumns
            });

            setBoard({
                columns: Object.keys(CourrierStatus)
                    .map((status, index) => {
                            return {
                                id: index + 1,
                                title: t(columns[index]),
                                status: CourrierStatus[status],
                                cards: getAllCourrier.result.filter(courrier => courrier.status === CourrierStatus[status])
                            }
                        }
                    )
            });
        }

        if (getAllCourrier.error !== null) {
            toast.error(Utils.getErrorMsg(getAllCourrier));
        }
    }, [getAllCourrier]);

    useEffect(() => {

        if(getAllUser.result) {
            console.log(getAllUser.result.filter(user => user.roles === Role.DG).map(user => {
                return {
                    _id: user._id,
                    name: user.firstname + ' '+user.lastname,
                    department: user.department.name,
                }
            }));
            setUsers(getAllUser.result.filter(user => user.roles === Role.DG).map(user => {
                return {
                    _id: user._id,
                    name: user.firstname + ' '+user.lastname,
                    department: user.department.name,
                }
            }));
        }

        if (getAllUser.error) {
            toast.error(Utils.getErrorMsg(getAllUser));
        }
    }, [getAllUser]);

    useEffect(() => {
        if (updateCourrier.result !== null) {
            setTimeout(() => {
                window.location.reload(true);
            }, 100);
            fetchGetAllCourrier();
            dispatch(fetchUpdateCourrierReset());
        }

        if (updateCourrier.error !== null) {
            toast.error(Utils.getErrorMsg(updateCourrier));
            dispatch(fetchUpdateCourrierReset());
        }

    }, [updateCourrier]);

    useEffect(() => {
        if (filesupload.result !== null) {

        /*            if (Array.isArray(filesupload.result)) {
                fetchCreateCourrier({
                    objet: values.objet,
                    emetteur: values.emetteur,
                    recepteur: values.recepteur,
                    direction: values.direction,
                    type: CourrierType.ENTRANT,
                    status: CourrierStatus.PENDING,
                    category: values.category,
                    cotation: [],
                    modifications_history: {
                        user: user._id,
                        status: CourrierStatus.PENDING
                    },
                    code: values.code,
                    documents_annexe: filesupload.result.map(file => file._id)
                })
            }*/
            dispatch(fetchUploadMediaReset());
        }

        if (filesupload.error !== null) {
            toast.error(Utils.getErrorMsg(filesupload));
            dispatch(fetchUploadMediaReset());
        }
    }, [filesupload]);

    useEffect(() => {
        console.log("createCourrier", createCourrier);
        if (createCourrier.result !== null) {

            if (selectedImage) {
                const dataToSend = new FormData();
                dataToSend.append('file', selectedImage);

                dispatch(fetchUploadMediaReset());
                fetchUploadMedia(dataToSend, {
                    type: FileUsage.COURRIER_IMAGE,
                    entity: EntityType.COURRIER,
                    filetype: FileType.PHOTO,
                    role: Role.ADMIN,
                    courrierId: createCourrier.result._id,
                    filename: createCourrier.result._id,
                });
                setSelectedImage(null);
                setSelectedAdditionalFiles([]);

            }
            toast.success(t('courrier_successfully_created'));
            //userToModify !== null ? toast.success(t('account_successfully_modified')) : toast.success(t('account_successfully_delete'));
            fetchGetAllCourrier();
            setOpenModal(false);
            dispatch(fetchCreateCourrierReset());
        }
        if (createCourrier.error !== null) {
            toast.error(Utils.getErrorMsg(createCourrier));
            dispatch(fetchCreateCourrierReset());
        }
        //if (userToModify !== null) setUserToModify(null);

    }, [createCourrier]);

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
                                                        <td><b>{t('status')} &nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;&nbsp;</b>
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
                                                                        <ul style={{marginLeft: '30px'}} className="product-social">
                                                                            {
                                                                                cotation.cotation_employe.map(cotation_employe => (
                                                                                    <li>- {`${cotation_employe.user.firstname} ${cotation_employe.user.lastname}`}
                                                                                        <span style={{marginLeft: '30px'}}
                                                                                              className={`badge ${cotation_employe.validated ? 'badge-primary' : 'badge-danger'} f-right`}>
                                                                                            {cotation_employe.validated ? t('validated') : t('non_validated')}
                                                                                        </span>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
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
                {courrier.status === CourrierStatus.VALIDE_APPROUVE && <Button color="secondary" disabled={updateCourrier.loading}
                                                                               onClick={() => {
                                                                                   fetchUpdateCourrier(courrier.id, true, {
                                                                                       status: 'archive'
                                                                                   })
                                                                               }}>
                    {(updateCourrier.loading) ? t('loading_dots') : t('archive')}
                </Button>}
            </ModalFooter>
        </Modal>
    )


    const renderModalCotationCourrier = () => (
        <Modal isOpen={openModalCotation} toggle={toggleModalCotation} size="lg">

            <ModalHeader
                toggle={toggleModalCotation}>{t('cotation')}</ModalHeader>

            <ModalBody>
                <Row>
                    <Col sm="12">

                        <Form className="theme-form needs-validation" noValidate="">
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{t('person_name_to_be_rated')} *</Label>
                                        <Multiselect
                                            placeholder=""
                                            options={users}
                                            onSelect={(selectedList, selectedItem) => {
                                                setCotation(selectedList)
                                            }}
                                            onRemove={(selectedList, selectedItem) => {
                                                setCotation(selectedList)
                                            }}
                                            displayValue="name"
                                            groupBy="department"
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" onClick={toggleModalCourrier}>{t('cancel')}</Button>
                <Button color="secondary" disabled={updateCourrier.loading} onClick={() => {
                    console.log("Courrier", courrier);
                    toggleModalCotation();
                    setSubmitCotation(true);
                }}>
                    {(updateCourrier.loading) ? t('loading_dots') : t('submit')}
                </Button>
            </ModalFooter>
        </Modal>
    )

    return (
        <Fragment>
            <Breadcrumb parent="" title="Tableau de bord"/>
            <Container fluid={true} className="jkanban-container">
                <Row className="second-chart-list third-news-update">
                    <Col sm="6" xl="3" lg="6">
                        <Card className="o-hidden">
                            <CardBody className="b-r-4 card-body">
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center"><Mail/></div>
                                    <div className="media-body"><span className="m-0">{t('courriers')}</span>
                                        <h4 className="mb-0 counter"><CountUp
                                            end={getAllCourrier.result !== null ? getAllCourrier.result.length : 0}/>
                                        </h4><Database
                                            className="icon-bg"/>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6" xl="3" lg="6">
                        <Card className="o-hidden">
                            <CardBody className="b-r-4 card-body">
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center"><Inbox/></div>
                                    <div className="media-body"><span className="m-0">{t('courrier_recu')}</span>
                                        <h4 className="mb-0 counter"><CountUp end={getAllCourrier.result !== null
                                            ? getAllCourrier.result.filter((courrier) => (courrier.status === CourrierStatus.PENDING)).length : 0}/>
                                        </h4><Edit2 className="icon-bg"/>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6" xl="3" lg="6">
                        <Card className="o-hidden">
                            <div className="b-r-4 card-body">
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center"><Mail/></div>
                                    <div className="media-body"><span className="m-0">{t('courrier_en_attente')}</span>
                                        <h4 className="mb-0 counter"><CountUp end={getAllCourrier.result !== null
                                            ? getAllCourrier.result.filter((courrier) => (courrier.status === CourrierStatus.EN_ATTENTE_VALIDATION_2 || courrier.status === CourrierStatus.EN_ATTENTE_VALIDATION_1 || courrier.status === CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA)).length : 0}/>
                                        </h4><Edit2 className="icon-bg"/>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col sm="6" xl="3" lg="6">
                        <Card className="o-hidden">
                            <CardBody className="b-r-4 card-body">
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center"><Mail/></div>
                                    <div className="media-body"><span className="m-0">{t('courrier_termine')}</span>
                                        <h4 className="mb-0 counter"><CountUp end={getAllCourrier.result !== null
                                            ? getAllCourrier.result.filter((courrier) => (courrier.status === CourrierStatus.VALIDE_APPROUVE || courrier.status === 'archive')).length : 0}/>
                                        </h4>
                                        <Check className="icon-bg"/>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <div className="media">
                                    <h5 style={{lineHeigt: '40px'}}>{t('courriers')}</h5>
                                    <div className="media-body text-right">
                                        {courrier !== null && renderModalDetailCourrier()}
                                        {getAllUser.result !== null && renderModalCotationCourrier()}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div id="demo3">
                                    <div className="kanban-container">
                                        <div className="kanban-board">
                                            <main className="kanban-drag" id="addToDo">
                                                <Board
                                                    onCardDragEnd={(boardElement, card, source, destination) => {
                                                        console.log("Destination", destination);

                                                        if (card.status === CourrierStatus.PENDING) {
                                                            console.log(boardElement, card, source, destination);
                                                            fetchUpdateCourrier(card.id, true, {
                                                                status: CourrierStatus.EN_ATTENTE_VALIDATION_1
                                                            });
                                                        } else if (destination.toColumnId === 1) {
                                                            fetchUpdateCourrier(card.id, true, {
                                                                status: CourrierStatus.PENDING
                                                            });
                                                        } else window.location.reload(false);

                                                        if (destination.toColumnId === 3) {
                                                            if (card.status === CourrierStatus.EN_ATTENTE_VALIDATION_1) {
                                                                console.log(boardElement, card, source, destination);
                                                                fetchUpdateCourrier(card.id, true, {
                                                                    status: CourrierStatus.EN_ATTENTE_VALIDATION_2
                                                                });
                                                            }
                                                        } else if (destination.toColumnId === 2) {
                                                            fetchUpdateCourrier(card.id, true, {
                                                                status: CourrierStatus.EN_ATTENTE_VALIDATION_1
                                                            });
                                                        } else if (destination.toColumnId === 4) {
                                                            toggleModalCotation(card);
                                                        } else if (destination.toColumnId === 3) {
                                                            fetchUpdateCourrier(card.id, true, {
                                                                status: CourrierStatus.EN_ATTENTE_VALIDATION_2
                                                            });
                                                        } else if (destination.toColumnId === 5) {
                                                            fetchUpdateCourrier(card.id, true, {
                                                                status: CourrierStatus.VALIDE_APPROUVE
                                                            });
                                                        } else {
                                                            preventDefault();
                                                            return false;
                                                        }

                                                    }}
                                                    disableColumnDrag
                                                    renderCard={({
                                                                     id,
                                                                     objet,
                                                                     createdAt,
                                                                     picture,
                                                                     status,
                                                                    cotation,
                                                                     emetteur,
                                                                     category,
                                                                     recepteur,
                                                                     direction,
                                                                     modifications_history,
                                                                     documents_annexe,
                                                                 }, {removeCard, dragging}) => (

                                                        <div onClick={() => {
                                                            toggleModalCourrier();
                                                            setCourrier({
                                                                id,
                                                                objet,
                                                                cotation,
                                                                createdAt,
                                                                picture,
                                                                status,
                                                                category,
                                                                emetteur,
                                                                recepteur,
                                                                direction,
                                                                modifications_history,
                                                                documents_annexe,
                                                            });
                                                        }} className="kanban-item"
                                                             id="todo" dragging={dragging}>
                                                            <a className="kanban-box" href="#javascript">
                                                                <span
                                                                    className="date">{moment(createdAt).fromNow()}</span>
                                                                {
                                                                    status === CourrierStatus.PENDING ?
                                                                        <span
                                                                            className={`badge badge-danger f-right`}>{t(CourrierStatus.EN_ATTENTE_VALIDATION_1)}</span>
                                                                        : status === CourrierStatus.EN_ATTENTE_VALIDATION_1 ?
                                                                            <span
                                                                                className={`badge badge-warning f-right`}>{t(CourrierStatus.EN_ATTENTE_VALIDATION_2)}</span>
                                                                            : status === CourrierStatus.EN_ATTENTE_VALIDATION_2 ?
                                                                                <span
                                                                                    className={`badge badge-primary f-right`}>{t(CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA)}</span>
                                                                                : status === CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA ?
                                                                                    cotation.length > 0 ?
                                                                                        cotation.filter(cotationParam => cotationParam.validated === true).length === cotation.length ?
                                                                                            <span
                                                                                                className={`badge badge-secondary f-right`}>{t('en_attente_approbation')}</span>
                                                                                            :
                                                                                            <span
                                                                                                className={`badge badge-primary f-right`}>{t(CourrierStatus.EN_ATTENTE_COTATION_APPROBATION_DGA)}</span>
                                                                                        : <span
                                                                                            className={`badge badge-secondary f-right`}>{t('en_attente_approbation')}</span>
                                                                                    : status === CourrierStatus.VALIDE_APPROUVE ?
                                                                                        <span
                                                                                            className={`badge badge-success f-right`}>{t('valide_approuve')}</span>
                                                                                        : null
                                                                }
                                                                <img className="mt-2 img-fluid" src={picture}
                                                                     alt=""/>
                                                                <h6>{objet}</h6>
                                                                <div className="media">
                                                                    <div className="media-body">
                                                                        <div className="float-left">
                                                                            <p>{emetteur}</p>
                                                                        </div>
                                                                        <div className="float-right">
                                                                            <p>{recepteur || direction}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex mt-3">
                                                                    <ul className="list">
                                                                        <li><i
                                                                            className="fa fa-paperclip"></i>{documents_annexe.length}
                                                                        </li>
                                                                        <li><i
                                                                            className="fa fa-eye"></i>{modifications_history.length}
                                                                        </li>
                                                                    </ul>
                                                                    <div className="customers">
                                                                        <ul>
                                                                            {/*<li className="d-inline-block mr-3">
                                                                                <p className="f-12">{rate}</p>
                                                                            </li>*/}
                                                                            {
                                                                                modifications_history.map((modification) => (
                                                                                    <li className="d-inline-block">
                                                                                        <img
                                                                                            className="img-20 rounded-circle"
                                                                                            src={Images.avatars[modification.user.picture]}
                                                                                            alt=""/>
                                                                                    </li>
                                                                                ))
                                                                            }
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    )} initialBoard={board}/>
                                            </main>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                        <div id="mydata"></div>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    application: selectAppConfig,
    createCourrier: selectCreateCourrier,
    getAllCourrier: selectGetAllCourrier,
    updateCourrier: selectUpdateCourrier,
    getAllUser: selectGetAllUserExist,
    filesupload: selectFileUpload,
    user: selectUser
});

export default connect(mapStateToProps, {
    fetchCreateCourrier,
    fetchGetAllCourrier,
    fetchUpdateCourrier,
    fetchUploadMedias,
    fetchUploadMedia,
    fetchGetAllUser
})(DashboardPageAdmin);
