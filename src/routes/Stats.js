import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

const Stats = () => {
    const [pharmaciesPerVille, setPharmaciesPerVille] = useState({});
    const [pharmaciesEnGarde, setPharmaciesEnGarde] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPharmaciesPerVille();
        fetchPharmaciesEnGarde();
    }, []);

    const fetchPharmaciesPerVille = async () => {
        try {
            const response = await axios.get('http://localhost:9071/villes/all');
            const villes = response.data;

            const pharmaciesCountData = await Promise.all(
                villes.map(async (ville) => {
                    const villeId = ville.id;
                    const villeResponse = await axios.get(`http://localhost:9071/pharmacies/pharmacie/ville=${villeId}`);
                    const pharmaciesCount = villeResponse.data.length;

                    return {
                        ville: ville.nom,
                        count: pharmaciesCount
                    };
                })
            );

            const data = {
                labels: pharmaciesCountData.map((item) => item.ville),
                datasets: [
                    {
                        label: 'Pharmacies per Ville',
                        data: pharmaciesCountData.map((item) => item.count),
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }
                ]
            };

            setPharmaciesPerVille(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pharmacies per ville:', error);
        }
    };

    const fetchPharmaciesEnGarde = async () => {
        try {
            const response = await axios.get('http://localhost:9071/villes/NbrPharmacieEnGarde');
            const pharmaciesEnGardeData = response.data;

            const labels = pharmaciesEnGardeData.map((item) => item[0]);
            const data = pharmaciesEnGardeData.map((item) => item[1]);

            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Pharmacies en Garde',
                        data: data,
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            };

            setPharmaciesEnGarde(chartData);
        } catch (error) {
            console.error('Error fetching pharmacies en garde:', error);
        }
    };


    return (
        <div className="app">
            <h2>Pharmacies per Ville</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="chart-container">
                    <Bar
                        data={pharmaciesPerVille}
                        options={{
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0
                                    }
                                }
                            }
                        }}
                    />
                </div>
            )}

            <h2>Pharmacies en Garde</h2>
            {Object.keys(pharmaciesEnGarde).length > 0 ? (
                <div className="chart-container">
                    <Bar
                        data={pharmaciesEnGarde}
                        options={{
                            responsive: true,
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    ticks: {
                                        precision: 0
                                    }
                                }
                            }
                        }}
                    />
                </div>
            ) : (
                <p>Loading pharmacies en garde data...</p>
            )}
        </div>
    );
};

export default Stats;

