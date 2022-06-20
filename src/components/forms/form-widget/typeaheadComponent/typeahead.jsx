import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumb from '../../../breadcrumb'
import {Typeahead} from 'react-bootstrap-typeahead';
import TypeaheadOne from './typeahead-one';
import {Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Row} from 'reactstrap'
import axios from 'axios'
import {BasicDemo, CustomSelections, MultipleSelections, Remote} from "../../../../constant";


const TypeaheadComp = () => {

    const multiple = false
    const [options,setOptions] = useState([])

    useEffect(() => {
        axios.get(`/api/typeaheadData.json`).then(res => setOptions(res.data))
    },[])

    return (
        <Fragment>
            <Breadcrumb parent="Forms" title="Typeahead" />
            <Container fluid={true}>
                <div className="typeahead">
                    <Row>
                        <Col sm="12" xl="6">
                            <Card>
                                <CardHeader>
                                    <h5>{BasicDemo}</h5><span>{"This is the simple demo for Typeahead."}</span>
                                </CardHeader>
                                <CardBody>
                                    <div id="the-basics">
                                        <Form>
                                            <FormGroup>
                                                <Typeahead
                                                    id="basic-typeahead"
                                                    labelKey="name"
                                                    multiple={multiple}
                                                    options={options}
                                                    placeholder="Choose a state..."
                                                />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" xl="6">
                            <Card>
                                <CardHeader>
                                    <h5>{MultipleSelections}</h5>
                                </CardHeader>
                                <CardBody>
                                    <div id="prefetch">
                                        <Form className="theme-form">
                                            <FormGroup>
                                                <Typeahead
                                                    id="multiple-typeahead"
                                                    clearButton
                                                    defaultSelected={options.slice(0, 5)}
                                                    labelKey={"name"}
                                                    multiple
                                                    options={options}
                                                    placeholder="Choose a state..."
                                                />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" xl="6">
                            <Card>
                                <CardHeader>
                                    <h5>{CustomSelections}</h5>
                                </CardHeader>
                                <CardBody>
                                    <div id="bloodhound">
                                        <Form className="theme-form">
                                            <FormGroup>
                                                <Typeahead
                                                    id="custom-typeahead"
                                                    allowNew
                                                    multiple
                                                    newSelectionPrefix="Add a new item: "
                                                    options={[]}
                                                    placeholder="Type anything..."
                                                />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" xl="6">
                            <Card>
                                <CardHeader>
                                    <h5>{Remote}</h5><span>{"Remote data is only used when the data provided by local and prefetch is insufficient"}</span>
                                </CardHeader>
                                <CardBody>
                                    <div id="remote">
                                        <Form className="theme-form">
                                            <FormGroup>
                                                <TypeaheadOne />
                                            </FormGroup>
                                        </Form>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </Fragment>
    );
};

export default TypeaheadComp;