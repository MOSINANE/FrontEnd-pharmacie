import React, { useState } from 'react';

const Card = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        alert(`Input value: ${inputValue}`);
    };

    return (
        <div className="card">
            <h2>Ajouter Ville</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter value"
            />
            <button onClick={handleButtonClick}>Save</button>
        </div>
    );
};

export default Card;
