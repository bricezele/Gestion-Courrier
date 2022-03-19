import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../components/breadcrumb'
import {Card, CardBody, CardHeader, Col, Container, Row} from 'reactstrap'
import DatePicker from "react-datepicker";
import ApexCharts from 'react-apexcharts'
import Knob from "knob";
import {Marketvalue} from '../components/dashboard/chartsData/apex-charts-data'
import {Database, MessageCircle, Send, ShoppingBag, UserPlus} from 'react-feather';
import {
    Appointment,
    Chat,
    Day,
    Done,
    Earnings,
    JohnLoren,
    MarketValue,
    Messages,
    Month,
    New,
    NewsUpdate,
    NewUser,
    Notification,
    Pending,
    ProductOrderValue,
    Products,
    RightNow,
    Today,
    Tomorrow,
    VenterLoren,
    Year,
    Yesterday
} from '../constant'
import CountUp from "react-countup";
import ApiBoard from "../components/application/kanban-board/apiBoard";


const DashboardPage = (props) => {

    const [daytimes, setDayTimes] = useState()
    const today = new Date()
    const curHr = today.getHours()
    const curMi = today.getMinutes()
    const [meridiem, setMeridiem] = useState("AM")
    // eslint-disable-next-line
    const [date, setDate] = useState({date: new Date()});
    // eslint-disable-next-line
    const [startDate, setStartDate] = useState(new Date());
    const handleChange = date => {
        setDate(date)
    };

    useEffect(() => {

        if (curHr < 12) {
            setDayTimes('Good Morning')
        } else if (curHr < 18) {
            setDayTimes('Good Afternoon')
        } else {
            setDayTimes('Good Evening')
        }

        if (curHr >= 12) {
            setMeridiem('PM')
        } else {
            setMeridiem('AM')
        }

        var ordervalue1 = Knob({
            value: 60,
            angleOffset: 0,
            thickness: 0.3,
            width: 65,
            fgColor: "#7366ff",
            readOnly: false,
            dynamicDraw: true,
            tickColorizeValues: true,
            bgColor: '#eef5fb',
            lineCap: 'round',
            displayPrevious: false
        })
        //document.getElementById('ordervalue1').appendChild(ordervalue1);

        var ordervalue2 = Knob({
            value: 60,
            angleOffset: 0,
            thickness: 0.3,
            fgColor: "#7366ff",
            readOnly: false,
            width: 65,
            dynamicDraw: true,
            lineCap: 'round',
            displayPrevious: false
        })
        //document.getElementById('ordervalue2').appendChild(ordervalue2);

        // eslint-disable-next-line
    }, [])

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
                            <CardBody className="bg-white b-r-4 card-body">
                                <div className="media static-top-widget">
                                    <div className="align-self-center text-center"><Database/></div>
                                    <div className="media-body"><span className="m-0">Courriers</span>
                                        <h4 className="mb-0 counter"><CountUp end={6659}/></h4><Database
                                            className="icon-bg"/>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col sm="6" xl="3" lg="6">
                        <Card className="o-hidden">
                            <div className="bg-white b-r-4 card-body">
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
                            <CardBody className="bg-white b-r-4">
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
                            <CardBody className="bg-white b-r-4">
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
                        <ApiBoard/>
                    </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default DashboardPage;