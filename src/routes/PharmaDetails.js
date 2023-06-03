import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Map from './Map';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./style.css"

const PharmaDetails = () => {
    const { id } = useParams();
    const [pharmacie, setPharmacie] = useState(null);

    useEffect(() => {
        // Fetch pharmacy data from the API
        const fetchPharmacie = async () => {
            try {
                const response = await axios.get(`http://localhost:9071/pharmacies/pharmacie/id=${id}`);
                setPharmacie(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPharmacie();
    }, [id]);

    return (
        <Container>
            <h2>Pharmacie Details</h2>
            {pharmacie ? (
                <Row>
                    <Col md={8}>
                        <div>
                            <table className="list-view">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Adresse</th>
                                    <th>Telephone</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{pharmacie.nom}</td>
                                    <td>{pharmacie.adresse}</td>
                                    <td>{pharmacie.telephone}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            ) : (
                <Row>
                    <Col className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <p>Loading pharmacy details...</p>
                    </Col>
                </Row>
            )}
            {/* Render the Map component */}
            {pharmacie && (
                <Row>
                    <Col>
                        <Map pharmacy={pharmacie} />
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default PharmaDetails;