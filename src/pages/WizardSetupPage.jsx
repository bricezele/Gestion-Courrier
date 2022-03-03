import React, { Fragment } from 'react';
import StepZilla from "react-stepzilla";
import {Container, Row, Col, Card, CardHeader, CardBody} from 'reactstrap'
import Breadcrumb from "../components/breadcrumb";

const WizardSetupPage = () => {
    const steps =
        [
            { name: 'Step 1', component: <div></div> },
            { name: 'Step 1', component: <div></div> },
            { name: 'Step 1', component: <div></div> },

        ]
    return (
        <Fragment>
            <Breadcrumb parent="Forms" title="Form Wizard"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>Installation</h5>
                            </CardHeader>
                            <CardBody>
                                <StepZilla
                                    steps={steps}
                                    showSteps={true}
                                    showNavigation={true}
                                    stepsNavigation={true}
                                    prevBtnOnLastStep={true}
                                    dontValidate={true} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>


        </Fragment>
    );
};

export default WizardSetupPage;