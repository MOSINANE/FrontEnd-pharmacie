// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import {Link} from "react-router-dom";
//
// const PharmacieList = () => {
//     const [pharmacies, setPharmacies] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [newPharmacie, setNewPharmacie] = useState({
//         nom: '',
//         adresse: '',
//         telephone: '',
//         lat: 0,
//         log: 0,
//         etat: 0,
//         zoneId: '',
//         villeId: ''
//     });
//     const [zoneOptions, setZoneOptions] = useState([]);
//     const [villeOptions, setVilleOptions] = useState([]);
//
//     useEffect(() => {
//         fetchPharmacies();
//         fetchZoneOptions();
//         fetchVilleOptions();
//     }, []);
//
//     const fetchPharmacies = async () => {
//         try {
//             const response = await axios.get('http://localhost:9071/pharmacies/all');
//             setPharmacies(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching pharmacies:', error);
//         }
//     };
//
//     const fetchZoneOptions = async () => {
//         try {
//             const response = await axios.get('http://localhost:9071/zones/all');
//             setZoneOptions(response.data);
//         } catch (error) {
//             console.error('Error fetching zone options:', error);
//         }
//     };
//
//     const fetchVilleOptions = async () => {
//         try {
//             const response = await axios.get('http://localhost:9071/villes/all');
//             setVilleOptions(response.data);
//         } catch (error) {
//             console.error('Error fetching ville options:', error);
//         }
//     };
//
//     const deletePharmacie = async (id) => {
//         try {
//             await axios.delete(`http://localhost:9071/pharmacies/deletePharmacie/id=${id}`);
//             setPharmacies(pharmacies.filter((pharmacie) => pharmacie.id !== id));
//         } catch (error) {
//             console.error('Error deleting pharmacie:', error);
//         }
//     };
//
//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         setNewPharmacie((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//
//     const handleSave = async () => {
//         try {
//             const response = await axios.post('http://localhost:9071/pharmacies/add/1', newPharmacie);
//             setPharmacies([...pharmacies, response.data]);
//             setNewPharmacie({
//                 nom: '',
//                 adresse: '',
//                 telephone: '',
//                 lat: 0,
//                 log: 0,
//                 etat: 0,
//                 zoneId: '',
//                 villeId: ''
//             });
//         } catch (error) {
//             console.error('Error adding pharmacie:', error);
//         }
//     };
//
//     return (
//         <div class="app">
//             <h2>Pharmacie List</h2>
//             <div class="card">
//                 <h3>Add Pharmacy</h3>
//                 <input
//                     type="text"
//                     name="nom"
//                     value={newPharmacie.nom}
//                     onChange={handleInputChange}
//                     placeholder="Pharmacy Name"
//                 />
//                 <input
//                     type="text"
//                     name="adresse"
//                     value={newPharmacie.adresse}
//                     onChange={handleInputChange}
//                     placeholder="Pharmacy Address"
//                 />
//                 <input
//                     type="text"
//                     name="telephone"
//                     value={newPharmacie.telephone}
//                     onChange={handleInputChange}
//                     placeholder="Pharmacy Telephone"
//                 />
//                 <input
//                     type="number"
//                     name="lat"
//                     value={newPharmacie.lat}
//                     onChange={handleInputChange}
//                     placeholder="Latitude"
//                 />
//                 <input
//                     type="number"
//                     name="log"
//                     value={newPharmacie.log}
//                     onChange={handleInputChange}
//                     placeholder="Longitude"
//                 />
//                 <select name="zoneId" value={newPharmacie.zoneId} onChange={handleInputChange}>
//                     <option value="">Select Zone</option>
//                     {zoneOptions.map((zone) => (
//                         <option key={zone.id} value={zone.id}>
//                             {zone.nom}
//                         </option>
//                     ))}
//                 </select>
//                 <select name="villeId" value={newPharmacie.villeId} onChange={handleInputChange}>
//                     <option value="">Select Ville</option>
//                     {villeOptions.map((ville) => (
//                         <option key={ville.id} value={ville.id}>
//                             {ville.nom}
//                         </option>
//                     ))}
//                 </select>
//                 <button onClick={handleSave}>Save</button>
//             </div>
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <div>
//                     <table className="list-view">
//                         <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Name</th>
//                             <th>Actions</th>
//                         </tr>
//                         </thead>
//                         <tbody>
//                         {pharmacies.map((pharmacie) => (
//                             <tr key={pharmacie.id}>
//                                 <td>{pharmacie.id}</td>
//                                 <td>
//                                     <Link to={`/pharmadetails/${pharmacie.id}`} className="pharmacie-name-link">{pharmacie.nom}</Link>
//                                 </td>
//                                 <td>
//                                     <button onClick={() => deletePharmacie(pharmacie.id)}>Delete</button>
//                                     {/* Add other actions (Update, etc.) here */}
//                                 </td>
//                             </tr>
//                         ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default PharmacieList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PharmacieList = () => {
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPharmacie, setNewPharmacie] = useState({
        nom: '',
        adresse: '',
        telephone: '',
        lat: 0,
        log: 0,
        etat: 0,
        zoneId: '',
        villeId: '',
    });
    const [zoneOptions, setZoneOptions] = useState([]);
    const [villeOptions, setVilleOptions] = useState([]);

    useEffect(() => {
        fetchPharmacies();
        fetchZoneOptions();
        fetchVilleOptions();
    }, []);

    const fetchPharmacies = async () => {
        try {
            const response = await axios.get('http://localhost:9071/pharmacies/all');
            setPharmacies(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pharmacies:', error);
        }
    };

    const fetchZoneOptions = async () => {
        try {
            const response = await axios.get('http://localhost:9071/zones/all');
            setZoneOptions(response.data);
        } catch (error) {
            console.error('Error fetching zone options:', error);
        }
    };

    const fetchVilleOptions = async () => {
        try {
            const response = await axios.get('http://localhost:9071/villes/all');
            setVilleOptions(response.data);
        } catch (error) {
            console.error('Error fetching ville options:', error);
        }
    };

    const deletePharmacie = async (id) => {
        try {
            await axios.delete(`http://localhost:9071/pharmacies/deletePharmacie/id=${id}`);
            setPharmacies(pharmacies.filter((pharmacie) => pharmacie.id !== id));
        } catch (error) {
            console.error('Error deleting pharmacie:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewPharmacie((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:9071/pharmacies/add/1', newPharmacie);
            setPharmacies([...pharmacies, response.data]);
            setNewPharmacie({
                nom: '',
                adresse: '',
                telephone: '',
                lat: 0,
                log: 0,
                etat: 0,
                zoneId: '',
                villeId: '',
            });
        } catch (error) {
            console.error('Error adding pharmacie:', error);
        }
    };

    return (
        <div className="app">
            <h2>Pharmacie List</h2>
            <div className="card">
                <h3>Add Pharmacy</h3>
                <input
                    type="text"
                    name="nom"
                    value={newPharmacie.nom}
                    onChange={handleInputChange}
                    placeholder="Pharmacy Name"
                />
                <input
                    type="text"
                    name="adresse"
                    value={newPharmacie.adresse}
                    onChange={handleInputChange}
                    placeholder="Pharmacy Address"
                />
                <input
                    type="text"
                    name="telephone"
                    value={newPharmacie.telephone}
                    onChange={handleInputChange}
                    placeholder="Pharmacy Telephone"
                />
                <input
                    type="number"
                    name="lat"
                    value={newPharmacie.lat}
                    onChange={handleInputChange}
                    placeholder="Latitude"
                />
                <input
                    type="number"
                    name="log"
                    value={newPharmacie.log}
                    onChange={handleInputChange}
                    placeholder="Longitude"
                />
                <select name="villeId" value={newPharmacie.villeId} onChange={handleInputChange}>
                    <option value="">Select Ville</option>
                    {villeOptions.map((ville) => (
                        <option key={ville.id} value={ville.id}>
                            {ville.nom}
                        </option>
                    ))}
                </select>
                <select name="zoneId" value={newPharmacie.zoneId} onChange={handleInputChange}>
                    <option value="">Select Zone</option>
                    {zoneOptions.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                            {zone.nom}
                        </option>
                    ))}
                </select>
                <button onClick={handleSave}>Save</button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <table className="list-view">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {pharmacies.map((pharmacie) => (
                            <tr key={pharmacie.id}>
                                <td>{pharmacie.id}</td>
                                <td>
                                    <Link to={`/pharmadetails/${pharmacie.id}`} className="pharmacie-name-link">
                                        {pharmacie.nom}
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => deletePharmacie(pharmacie.id)}>Delete</button>
                                    {/* Add other actions (Update, etc.) here */}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PharmacieList;
