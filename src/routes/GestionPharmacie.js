import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const GestionPharmacie = () => {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        fetchPharmacies();
    }, []);

    const fetchPharmacies = async () => {
        try {
            const response = await axios.get('http://localhost:9071/pharmacies/allEnAttente');
            setPharmacies(response.data);
        } catch (error) {
            console.error('Error fetching pharmacies:', error);
        }
    };

    const acceptPharmacie = async (id) => {
        try {
            await axios.put(`http://localhost:9071/pharmacies/acceptePharmacie/id=${id}`);
            // Update the pharmacies list after accepting
            fetchPharmacies();
        } catch (error) {
            console.error('Error accepting pharmacie:', error);
        }
    };

    const refusePharmacie = async (id) => {
        try {
            await axios.put(`http://localhost:9071/pharmacies/refusPharmacie/id=${id}`);
            // Update the pharmacies list after refusing
            fetchPharmacies();
        } catch (error) {
            console.error('Error refusing pharmacie:', error);
        }
    };

    return (
        <div className="app">
            <h2>Gestion Pharmacie</h2>
            <table className="tablegarde">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {pharmacies.map((pharmacie) => (
                    <tr key={pharmacie.id}>
                        <Link to={`/pharmadetails/${pharmacie.id}`} className="pharmacie-name-link">{pharmacie.nom}</Link>
                        <td>
                            <button onClick={() => acceptPharmacie(pharmacie.id)}>Accepter</button>
                            <button onClick={() => refusePharmacie(pharmacie.id)}>Refuser</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/*<div className="list-view">*/}
            {/*    {pharmacies.map((pharmacie) => (*/}
            {/*        <div key={pharmacie.id}>*/}
            {/*            <p>{pharmacie.nom}</p>*/}
            {/*            <button onClick={() => acceptPharmacie(pharmacie.id)}>Accepter</button>*/}
            {/*            <button onClick={() => refusePharmacie(pharmacie.id)}>Refuser</button>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</div>*/}
        </div>
    );
};

export default GestionPharmacie;
