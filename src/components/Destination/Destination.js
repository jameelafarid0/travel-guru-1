import React from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import './Destination.css'
import { Link } from "react-router-dom";

const Destination = (props) => {
    const { image, name, id } = props.place;

    return (
        <Link to={`/destination-booking/${id}`} className="link-style">
        <Container className="card-container">
                <Card style={{ width: '18rem' }} xs={6} md={4} className="card-style">
                    <Card.Img variant="top" src={image} className="image" />
                    <Card.Body className="name-style">
                        <Card.Title >{name}</Card.Title>
                    </Card.Body>
                </Card>    
            
        </Container>
        </Link>
    );
};

export default Destination;