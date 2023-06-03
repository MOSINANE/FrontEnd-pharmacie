import React, { useState, useEffect } from 'react';

const Card = ({ onSave, villeOptions }) => {
    const [name, setName] = useState('');
    const [ville, setVille] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleVilleChange = (event) => {
        setVille(event.target.value);
    };

    const handleSave = () => {
        const newItem = {
            nom: name,
            ville_id: parseInt(ville)
        };

        fetch('http://localhost:9071/zones/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(newItem),
        })
            .then((response) => response.json())
            .then((data) => {
                onSave(data);
                setName('');
                setVille('');
            })
            .catch((error) => {
                console.error('Error adding zone:', error);
            });
    };

    return (
        <div className="card">
            <h2>Add Zone</h2>
            <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Enter zone name"
            />
            <select value={ville} onChange={handleVilleChange}>
                <option value="">Select a ville</option>
                {villeOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.nom}
                    </option>
                ))}
            </select>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

const ListView = ({ items, onDelete }) => {
    const handleUpdate = (id) => {
        // Handle update logic here
        console.log(`Update button clicked for item with ID ${id}`);
    };

    return (
        <div className="list-view">
            <h2>List View</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Ville</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {items.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nom}</td>
                        <td>{item.ville ? item.ville.nom : ''}</td>
                        <td>
                            <button onClick={() => handleUpdate(item.id)}>Update</button>
                            <button onClick={() => onDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

function Zone() {
    const [listItems, setListItems] = useState([]);
    const [villeOptions, setVilleOptions] = useState([]);

    const handleSave = (item) => {
        setListItems([...listItems, item]);
    };

    useEffect(() => {
        fetch('http://localhost:9071/villes/all')
            .then((response) => response.json())
            .then((data) => {
                setVilleOptions(data);
            })
            .catch((error) => {
                console.error('Error fetching ville options:', error);
            });

        fetch('http://localhost:9071/zones/all')
            .then((response) => response.json())
            .then((data) => {
                console.log('List items:', data);
                setListItems(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleDeleteItem = (itemId) => {
        fetch(`http://localhost:9071/zones/deleteZone/id=${itemId}`, {
            method: 'DELETE',
        })
            .then(() => {
                setListItems(listItems.filter((item) => item.id !== itemId));
            })
            .catch((error) => {
                console.error('Error deleting zone:', error);
            });
    };

    return (
        <div className="app">
            <Card onSave={handleSave} villeOptions={villeOptions} />
            <ListView
                items={listItems}
                onDelete={handleDeleteItem}
            />
        </div>
    );
}

export default Zone;
