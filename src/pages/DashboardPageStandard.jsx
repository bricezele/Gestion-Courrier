import React, {Fragment, useEffect, useState} from 'react';
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
    Input,
    Label,
    Media,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap'
import {Mail, MessageCircle, ShoppingBag, UserPlus} from 'react-feather';
import CountUp from "react-countup";
import {apitodoboard} from "../data/apiboard";
import Board from "@lourenci/react-kanban";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {connect, useDispatch} from "react-redux";
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
import * as Yup from "yup";
import {useFormik} from "formik";
import {Images} from "../assets/images/Images";
import {createStructuredSelector} from "reselect";
import {selectAppConfig} from "../redux/config/config.selector";
import {selectGetAllUserExist, selectSignUp, selectUpdateUser} from "../redux/user/user.selector";
import Dropzone from 'react-dropzone-uploader'
import {Direction} from "../enum/direction.enum";
import {CourrierCategory} from "../enum/courriercategory.enum";
import './styles.scss';

const DashboardPageStandard = ({signUp, fetchSignUp, getAllUser, fetchGetAllUser, updateUser, fetchUpdateUser}) => {
    const [board, setboard] = useState(apitodoboard);
    const {t} = useTranslation();
    let history = useHistory();
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState(null); // Initially, no file is selected
    const [selectedImagePreview, setSelectedImagePreview] = useState(null); // Initially, no file is selected
    const [openModal, setOpenModal] = useState(false);
    const [picture, setPicture] = useState(1);
    const [userToModify, setUserToModify] = useState(null);
    const toggleModal = () => {
        setOpenModal(!openModal);
        setUserToModify(null);
    }
    const [date, setDate] = useState({date: new Date()});
    const [generalData, setGeneralData] = useState([]);
    const [accountType, setAccountType] = useState(Role.EDITOR);

    /*    const {isLoading, error, data, refetch,  isFetching} = useQuery("userGithubInfos", () =>
            axios.delete(
                `${ServerUrl.signup}/${userToModify._id}`
            ).then((res) => {
                console.log(res.data);
            })
        );*/

    useEffect(() => {
        dispatch(fetchSignUpReset());
        dispatch(fetchUpdateUserReset());
        fetchGetAllUser();
    }, []);

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

    const AddCourrierSchema = Yup.object().shape({
        objet: Yup.string().required(t('objet_required')),
        emetteur: Yup.string(),
        recepteur: Yup.string(),
        category: Yup.string(),
        direction: Yup.string(),
    });

    const {handleChange, handleSubmit, handleBlur, values, errors, setFieldError, setFieldValue, touched} =
        useFormik({
            validationSchema: AddCourrierSchema,
            initialValues: {
                objet: '',
                emetteur: '',
                recepteur: '',
                category: '',
                direction: '',
            },
            onSubmit: values => {
                delete values.confirm_password;
                if (userToModify === null) {
                    fetchSignUp({
                        ...values,
                        roles: accountType,
                        picture
                    });
                } else {
                    delete values.player_id;
                    fetchUpdateUser(userToModify._id, true, '', {
                        ...values,
                        roles: accountType,
                        picture
                    });
                }
            }
        });

    useEffect(() => {

        if (getAllUser.error) {
            toast.error(Utils.getErrorMsg(getAllUser));
        }
    }, [getAllUser]);

    const getImage = () => {
        document.getElementById("upfile").click();
    }

    const onFileChange = event => {
        // Update the state
        setSelectedImage(event.target.files[0]);

        var fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);

        fileReader.onload = (eventReader) => {
            console.log("Event", eventReader.target.result);
            setSelectedImagePreview(eventReader.target.result);
        };
    };

    const getUploadParams = ({meta}) => {
        return {
            url: 'https://httpbin.org/post'
        }
    }


    // called every time a file's `status` changes
    const handleChangeStatus = ({meta, file}, status) => {
    }


    const renderModalAddUser = () => (
        <Modal isOpen={openModal} toggle={toggleModal} size="lg">
            <ModalHeader
                toggle={toggleModal}>{userToModify !== null ? t('modify_user') : t('add_new_user')}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col sm="12">
                        <Media body className="img-fluid img-place-holder" onClick={getImage}
                               style={{cursor: "pointer"}}
                               src={selectedImagePreview ? selectedImagePreview : Images.imagePlaceHolder} alt=""/>
                        <Form className="theme-form needs-validation" style={{marginTop: "20px"}} noValidate=""
                              onSubmit={handleSubmit}>
                            <div style={{height: "0px", width: "0px", overflow: "hidden"}}>
                                <input id="upfile" multiple type="file" accept="image/*"
                                       onChange={(e) => onFileChange(e)}/>
                            </div>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{t('objet')}</Label>
                                        <Input className="form-control" type="text" name="objet"
                                               placeholder={t('objet')}
                                               value={values.emetteur}
                                               onChange={handleChange('objet')}
                                               onBlur={handleBlur('objet')}
                                        />
                                        <span
                                            style={{color: "red"}}>{errors.objet !== '' && errors.objet}</span>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label>{t('emetteur')} *</Label>
                                        <Input className="form-control" type="text" name="objet"
                                               placeholder={t('emetteur')}
                                               value={values.emetteur}
                                               onChange={handleChange('emetteur')}
                                               onBlur={handleBlur('emetteur')}
                                        />
                                        <span
                                            style={{color: "red"}}>{errors.emetteur !== '' && errors.emetteur}</span>
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label>{t('recepteur')}</Label>
                                        <Input className="form-control" type="text" name="recepteur"
                                               placeholder={t('recepteur')}
                                               value={values.lastname}
                                               onChange={handleChange('recepteur')}
                                               onBlur={handleBlur('recepteur')}/>
                                        <span
                                            style={{color: "red"}}>{errors.recepteur !== '' && errors.recepteur}</span>
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Row>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label>{t('direction')} *</Label>
                                        <div className="select2-drpdwn-product select-options border-2"
                                             onChange={(e) => setFieldValue("direction", e.target.value)}>
                                            <select className="form-control btn-square" name="select">
                                                <option selected
                                                        value={Direction.ADMINISTRATIF}>{t(Direction.ADMINISTRATIF)}</option>
                                                <option
                                                    value={Direction.TECHNIQUE}>{t(Direction.TECHNIQUE)}</option>
                                                <option
                                                    value={Direction.FINANCIER}>{t(Direction.FINANCIER)}</option>
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                                <Col sm="6">
                                    <FormGroup>
                                        <Label>{t('category')} *</Label>
                                        <div className="select2-drpdwn-product select-options border-2"
                                             onChange={(e) => setFieldValue("category", e.target.value)}>
                                            <select className="form-control btn-square" name="select">
                                                {
                                                    Object.keys(CourrierCategory).map((category, index) => (
                                                            <option key={index} selected={index === 0}
                                                                    value={CourrierCategory[category]}>{t(CourrierCategory[category])}</option>
                                                        )
                                                    )
                                                }
                                            </select>
                                        </div>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Label>{t('file_annexe')} *</Label>
                                        <Dropzone
                                            getUploadParams={getUploadParams}
                                            onChangeStatus={handleChangeStatus}
                                            maxFiles={1}
                                            multiple={false}
                                            canCancel={false}
                                            inputContent="Drop A File"
                                            styles={{
                                                dropzone: {width: '100%', height: 50},
                                                dropzoneActive: {borderColor: 'green'},
                                            }}
                                        />
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
    );

    return (
        <Fragment>
            <Breadcrumb parent="" title="Tableau de bord"/>
            <Container fluid={true} className="jkanban-container">
                <Row className="second-chart-list third-news-update">
                    {/*
                    <Col xl="4 xl-50" lg="12" className="morning-sec box-col-12">
                        <Card className="o-hidden profile-greeting">
                            <CardBody>
                                <div className="media">
                                    <div className="badge-groups w-100">
                                        <div className="badge f-12">
                                            <Clock style={{width: "16px", height: "16px"}} className="mr-1"/>
                                            <span id="txt">{curHr}:{curMi < 10 ? "0" + curMi : curMi} {meridiem}</span>
                                        </div>
                                        <div className="badge f-12"><i className="fa fa-spin fa-cog f-14"></i></div>
                                    </div>
                                </div>
                                <div className="greeting-user text-center">
                                    <div className="profile-vector"><img className="img-fluid"
                                                                         src={require("../../assets/images/dashboard/welcome.png")}
                                                                         alt=""/></div>
                                    <h4 className="f-w-600"><span id="greeting">{daytimes}</span> <span
                                        className="right-circle"><i
                                        className="fa fa-check-circle f-14 middle"></i></span></h4>
                                    <p>
                                        <span> {"Today's earrning is $405 & your sales increase rate is 3.7 over the last 24 hours"}</span>
                                    </p>
                                    <div className="whatsnew-btn"><a className="btn btn-primary"
                                                                     href="#javascript">{"Whats New !"}</a>
                                    </div>
                                    <div className="left-icon"><i className="fa fa-bell"> </i></div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="8 xl-100" className="dashboard-sec box-col-12">
                        <Card className="earning-card">
                            <CardBody className="p-0">
                                <Row className="m-0">
                                    <Col xl="3" className="earning-content p-0">
                                        <Row className="m-0 chart-left">
                                            <Col xl="12" className="p-0 left_side_earning">
                                                <h5>{Dashboard}</h5>
                                                <p className="font-roboto">{"Overview of last month"}</p>
                                            </Col>
                                            <Col xl="12" className="p-0 left_side_earning">
                                                <h5>{"$4055.56"} </h5>
                                                <p className="font-roboto">{"This Month Earning"}</p>
                                            </Col>
                                            <Col xl="12" className="p-0 left_side_earning">
                                                <h5>{"$1004.11"}</h5>
                                                <p className="font-roboto">{"This Month Profit"}</p>
                                            </Col>
                                            <Col xl="12" className="p-0 left_side_earning">
                                                <h5>{"90%"}</h5>
                                                <p className="font-roboto">{"This Month Sale"}</p>
                                            </Col>
                                            <Col xl="12" className="p-0 left-btn"><a className="btn btn-gradient"
                                                                                     href="#javascript">{Summary}</a></Col>
                                        </Row>
                                    </Col>
                                    <Col xl="9" className="p-0">
                                        <div className="chart-right">
                                            <Row className="m-0 p-tb">
                                                <Col xl="8" md="8" sm="8" className="col-12 p-0">
                                                    <div className="inner-top-left">
                                                        <ul className="d-flex list-unstyled">
                                                            <li>{Daily}</li>
                                                            <li className="active">{Weekly}</li>
                                                            <li>{Monthly}</li>
                                                            <li>{Yearly}</li>
                                                        </ul>
                                                    </div>
                                                </Col>
                                                <Col xl="4" md="4" sm="4" className="col-12 p-0 justify-content-end">
                                                    <div className="inner-top-right">
                                                        <ul className="d-flex list-unstyled justify-content-end">
                                                            <li>{Online}</li>
                                                            <li>{Store}</li>
                                                        </ul>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xl="12">
                                                    <CardBody className="p-0">
                                                        <div className="current-sale-container">
                                                            <ApexCharts id="chart-currently"
                                                                        options={Currentlysale.options}
                                                                        series={Currentlysale.series} type='area'
                                                                        height={240}/>
                                                        </div>
                                                    </CardBody>
                                                </Col>
                                            </Row>
                                        </div>
                                        <Row className="border-top m-0">
                                            <Col xl="4" md="6" sm="6" className="pl-0">
                                                <div className="media p-0">
                                                    <div className="media-left"><i
                                                        className="icofont icofont-crown"></i></div>
                                                    <div className="media-body">
                                                        <h6>{ReferralEarning}</h6>
                                                        <p>{"$5,000.20"}</p>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl="4" md="6" sm="6">
                                                <div className="media p-0">
                                                    <div className="media-left bg-secondary"><i
                                                        className="icofont icofont-heart-alt"></i></div>
                                                    <div className="media-body">
                                                        <h6>{CashBalance}</h6>
                                                        <p>{"$2,657.21"}</p>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl="4" md="12" className="pr-0">
                                                <div className="media p-0">
                                                    <div className="media-left"><i
                                                        className="icofont icofont-cur-dollar"></i></div>
                                                    <div className="media-body">
                                                        <h6>{SalesForcasting}</h6>
                                                        <p>{"$9,478.50"}</p>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>*/}
                    <Col sm="6" xl="3" lg="6">
                        <Card className="o-hidden">
                            <CardBody className="b-r-4 card-body">
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center"><Mail/></div>
                                    <div className="media-body"><span className="m-0">{t('courriers')}</span>
                                        <h4 className="mb-0 counter"><CountUp end={6659}/></h4><Mail
                                            className="icon-bg"/>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6" xl="3" lg="6">
                        <Card className="o-hidden">
                            <div className="b-r-4 card-body">
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center"><ShoppingBag/></div>
                                    <div className="media-body"><span className="m-0">Courrier en cours</span>
                                        <h4 className="mb-0 counter"><CountUp end={9856}/></h4><ShoppingBag
                                            className="icon-bg"/>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col sm="6" xl="3" lg="6">
                        <Card className="o-hidden">
                            <CardBody className="b-r-4 card-body">
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center"><MessageCircle/></div>
                                    <div className="media-body"><span className="m-0">Courrier terminé</span>
                                        <h4 className="mb-0 counter"><CountUp end={893}/></h4><MessageCircle
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
                                    <div className="align-self-center text-center"><UserPlus/></div>
                                    <div className="media-body"><span className="m-0">Utilisateurs</span>
                                        <h4 className="mb-0 counter"><CountUp end={4563}/>{"1"}</h4><UserPlus
                                            className="icon-bg"/>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>

                    <Col xs="12">
                        <Card>
                            <CardHeader>
                                <div className="media">
                                    <h5 style={{lineHeigt: '40px'}}>{t('users_list')}</h5>
                                    <div className="media-body text-right">
                                        <button className="btn btn-primary" onClick={toggleModal}>
                                            <span>{t('add')}</span>
                                            <Mail style={{marginBottom: '-6px'}}/></button>
                                        {renderModalAddUser()}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <div id="demo3">
                                    <div className="kanban-container">
                                        <div className="kanban-board">
                                            <main className="kanban-drag" id="addToDo">
                                                <Board
                                                    disableColumnDrag
                                                    allowAddCard
                                                    renderCard={({
                                                                     title,
                                                                     date,
                                                                     priority,
                                                                     backgroundImg,
                                                                     img,
                                                                     company,
                                                                     rate,
                                                                     customer_img1,
                                                                     customer_img2,
                                                                     customer_img3
                                                                 }) => (

                                                        <div className="kanban-item" id="todo">
                                                            <a className="kanban-box" href="#javascript">
                                                                <span className="date">{date}</span>
                                                                <span
                                                                    className={`badge ${priority === "Argent" ? "badge-danger" : "badge-primary"} f-right`}>{priority}</span>
                                                                <img className="mt-2 img-fluid" src={backgroundImg}
                                                                     alt=""/>
                                                                <h6>{title}</h6>
                                                                <div className="media">
                                                                    <img className="img-20 mr-1 rounded-circle"
                                                                         src={img} alt=""/>
                                                                    <div className="media-body">
                                                                        <p>{company}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="d-flex mt-3">
                                                                    <ul className="list">
                                                                        <li><i className="fa fa-comments-o"></i>2</li>
                                                                        <li><i className="fa fa-paperclip"></i>2</li>
                                                                        <li><i className="fa fa-eye"></i></li>
                                                                    </ul>
                                                                    <div className="customers">
                                                                        <ul>
                                                                            <li className="d-inline-block mr-3">
                                                                                <p className="f-12">{rate}</p>
                                                                            </li>
                                                                            <li className="d-inline-block"><img
                                                                                className="img-20 rounded-circle"
                                                                                src={customer_img1} alt=""/></li>
                                                                            <li className="d-inline-block"><img
                                                                                className="img-20 rounded-circle"
                                                                                src={customer_img2} alt=""/></li>
                                                                            <li className="d-inline-block"><img
                                                                                className="img-20 rounded-circle"
                                                                                src={customer_img3} alt=""/></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    )}
                                                >
                                                    {board}
                                                </Board>
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
    signUp: selectSignUp,
    getAllUser: selectGetAllUserExist,
    updateUser: selectUpdateUser
});

export default connect(mapStateToProps, {fetchSignUp, fetchGetAllUser, fetchUpdateUser})(DashboardPageStandard);
