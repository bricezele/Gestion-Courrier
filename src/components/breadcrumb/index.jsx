import React, {Fragment} from 'react';
import {Col, Container, Row} from 'reactstrap'

const Breadcrumbs = (props) => {
  return (
    <Fragment>
      <Container fluid={true}>
        <div className="page-title">
          <Row>
            <Col xs="6">
              <h3>{props.title}</h3>
            </Col>
{/*            <Col xs="6">
              <Breadcrumb>
                <BreadcrumbItem><Link to={`/dashboard/default/`}><Home /></Link></BreadcrumbItem>
                <BreadcrumbItem>{props.parent}</BreadcrumbItem>
                <BreadcrumbItem active>{props.title}</BreadcrumbItem>
              </Breadcrumb>
            </Col>*/}
          </Row>
        </div>
      </Container>
    </Fragment>
  );
}

export default Breadcrumbs;