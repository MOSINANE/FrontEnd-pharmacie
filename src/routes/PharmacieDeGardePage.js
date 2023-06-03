import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const BackendIntegrationComponent = () => {
    const [formData, setFormData] = useState({
        dateDebut: '',
        dateFin: '',
        pharmacieId: '',
        gardeId: '',
        selectedVilleId: '',
        selectedZoneId: ''
    });
    const [pharmaciesDeGarde, setPharmaciesDeGarde] = useState([]);
    const [villes, setVilles] = useState([]);
    const [zones, setZones] = useState([]);
    const [pharmaciesByZone, setPharmaciesByZone] = useState([]);
    const [gardes, setGardes] = useState([]);

    useEffect(() => {
        fetchPharmaciesDeGarde();
        fetchVilles();
        fetchGardes();
    }, []);

    const fetchPharmaciesDeGarde = async () => {
        try {
            const response = await axios.get('http://localhost:9071/pharmaciesDeGarde/all');
            setPharmaciesDeGarde(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchVilles = async () => {
        try {
            const response = await axios.get('http://localhost:9071/villes/all');
            setVilles(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchZones = async (villeId) => {
        try {
            const response = await axios.get(`http://localhost:9071/zones/zone/ville=${villeId}`);
            setZones(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPharmaciesByZone = async (zoneId) => {
        try {
            const response = await axios.get(`http://localhost:9071/pharmacies/allDispoByZone/id=${zoneId}`);
            setPharmaciesByZone(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGardes = async () => {
        try {
            const response = await axios.get('http://localhost:9071/gardes/all');
            setGardes(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        if (name === 'selectedVilleId') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                selectedVilleId: value,
                selectedZoneId: ''
            }));
            fetchZones(value);
        }
    };

    const handleZoneChange = (e) => {
        const { value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, selectedZoneId: value, pharmacieId: '' }));
        fetchPharmaciesByZone(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `http://localhost:9071/pharmaciesDeGarde/add/${formData.dateDebut}/${formData.dateFin}`,
                {
                    pharmacie: {
                        id: formData.pharmacieId
                    },
                    garde: {
                        idGarde: formData.gardeId
                    }
                }
            );
            setFormData({
                dateDebut: '',
                dateFin: '',
                pharmacieId: '',
                gardeId: '',
                selectedVilleId: '',
                selectedZoneId: ''
            });
            fetchPharmaciesDeGarde();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="app">
            <div>
                <h2>Add Pharmacie de Garde</h2>
                <form onSubmit={handleSubmit} className="card">
                    <label>Date Début:</label>
                    <input
                        type="date"
                        name="dateDebut"
                        value={formData.dateDebut}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Date Fin:</label>
                    <input
                        type="date"
                        name="dateFin"
                        value={formData.dateFin}
                        onChange={handleChange}
                    />
                    <br />

                    <label>Ville:</label>
                    <select
                        name="selectedVilleId"
                        value={formData.selectedVilleId}
                        onChange={handleChange}
                    >
                        <option value="">Select a Ville</option>
                        {villes.map((ville) => (
                            <option key={ville.id} value={ville.id}>
                                {ville.nom}
                            </option>
                        ))}
                    </select>
                    <br />

                    {formData.selectedVilleId && (
                        <>
                            <label>Zone:</label>
                            <select
                                name="selectedZoneId"
                                value={formData.selectedZoneId}
                                onChange={handleZoneChange}
                            >
                                <option value="">Select a Zone</option>
                                {zones.map((zone) => (
                                    <option key={zone.id} value={zone.id}>
                                        {zone.nom}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </>
                    )}

                    {formData.selectedZoneId && (
                        <>
                            <label>Pharmacie:</label>
                            <select
                                name="pharmacieId"
                                value={formData.pharmacieId}
                                onChange={handleChange}
                            >
                                <option value="">Select a Pharmacie</option>
                                {pharmaciesByZone.map((pharmacie) => (
                                    <option key={pharmacie.id} value={pharmacie.id}>
                                        {pharmacie.nom}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </>
                    )}

                    {formData.pharmacieId && (
                        <>
                            <label>Garde:</label>
                            <select name="gardeId" value={formData.gardeId} onChange={handleChange}>
                                <option value="">Select a Garde</option>
                                {gardes.map((garde) => (
                                    <option key={garde.idGarde} value={garde.idGarde}>
                                        {garde.type}
                                    </option>
                                ))}
                            </select>
                            <br />
                        </>
                    )}

                    <button type="submit">Save</button>
                </form>
            </div>

            <div className="list-view">
                <h2>Pharmacies de Garde List</h2>
                <table className="tablegarde">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pharmaciesDeGarde.map((pharmacieDeGarde) => (
                        <tr key={pharmacieDeGarde.pharmacieDeGardePK.dateDebut}>
                            <td>{pharmacieDeGarde.pharmacie.nom}</td>
                            <td>{pharmacieDeGarde.garde.type}</td>
                            <td>{pharmacieDeGarde.pharmacieDeGardePK.dateDebut}</td>
                            <td>{pharmacieDeGarde.dateFin}</td>
                            <td>
                                {/* Add other actions (Update, etc.) here */}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BackendIntegrationComponent;
