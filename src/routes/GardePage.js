import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GardePage.css';
import './style.css'

const GardePage = () => {
    const [gardes, setGardes] = useState([]);
    const [garde, setGarde] = useState({
        idGarde: 0,
        type: '',
    });

    useEffect(() => {
        fetchGardes();
    }, []);

    const fetchGardes = async () => {
        try {
            const response = await axios.get('http://localhost:9071/gardes/all');
            setGardes(response.data);
        } catch (error) {
            console.log('Error fetching gardes:', error);
        }
    };

    const handleInputChange = (e) => {
        setGarde({
            ...garde,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:9071/gardes/add', garde);
            console.log('Garde added:', response.data);
            fetchGardes(); // Refresh the garde list
            setGarde({
                idGarde: 0,
                type: '',
            });
        } catch (error) {
            console.log('Error adding garde:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:9071/gardes/deleteGarde/id=${id}`);
            console.log('Garde deleted:', response.data);
            fetchGardes(); // Refresh the garde list
        } catch (error) {
            console.log('Error deleting garde:', error);
        }
    };

    return (
        <div className="app">
            <h2>Garde Page</h2>
            <div className="card">
                <label htmlFor="type">Type:</label>
                <input type="text" id="type" name="type" value={garde.type} onChange={handleInputChange} />
                <button onClick={handleSave}>Save</button>
            </div>
            <ul className="list-view">
                {gardes.map((garde) => (
                    <li key={garde.idGarde} className="garde-item">
                        {garde.type}
                        <button onClick={() => handleDelete(garde.idGarde)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GardePage;
