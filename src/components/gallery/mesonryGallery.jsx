import React, {Fragment, useEffect, useState} from 'react'
import Breadcrumb from '../breadcrumb'
import Masonry from 'react-masonry-css';
import {Card, CardBody, CardHeader, Col, Container, Media, Row} from 'reactstrap'
import axios from 'axios'
import {MasonryGallery} from '../../constant';

const MesonryGallery = () => {
    
    const [masonryImg,setMasonryImg] = useState([])
    
    useEffect(() => {
        axios.get(`/api/masonry.json`).then((response) => {
            setMasonryImg(response.data);
        })
    },[])

    return (
        <Fragment>
            <Breadcrumb parent="Gallery" title="Masonry Gallery"/>
            <Container fluid={true}>
                <Row>
                    <Col sm="12">
                        <Card>
                            <CardHeader>
                                <h5>{MasonryGallery}</h5>
                            </CardHeader>
                            <CardBody className="photoswipe-pb-responsive">
                                <Masonry
                                    breakpointCols={4}
                                    className="my-gallery row grid gallery"
                                    columnClassName="col-md-3 col-6 grid-item">
                                    {masonryImg.map((element, index) =>
                                        <div key={index} ><Media src={require(`../../assets/images/${element.src}`)} style={{ width: '100%' }} alt="" /></div>
                                    )}
                                </Masonry>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </Fragment>
    );
}

export default MesonryGallery;