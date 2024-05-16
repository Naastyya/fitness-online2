import {defaults} from "chart.js/auto";
import {Line} from "react-chartjs-2";
import '../Progress/progress.css'

import {useEffect, useState} from "react";
import axios from "axios";

defaults.maintainAspectRatio = true;
defaults.responsive = true;

const Progress = () => {
    const [data, setData] = useState(null);

    const Axios = axios.create({
        baseURL: "http://localhost:4444/",
        withCredentials: true,
    });
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios.get('http://localhost:4444/user/yearlyTrainingHistory')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Помилка при запиті:', error);
            });
    }, []);

    if (!data) {
        return <div>Завантаження...</div>;
    }

    const labels = Object.keys(data);
    const countTrainingData = labels.map(label => data[label].count_training);
    const countProgramsData = labels.map(label => data[label].count_programs);
    const averageWeightData = labels.map(label => data[label].average_weight);

    return (
        <section className="progress has-bg-image" id="progress">
            <div className="container">
                <div className="flex-container">
                    <div className="text-container">
                        <div className="headlines">
                            <div className="lp1"></div>
                            <div className="lp2"></div>
                            <div className="lp3"></div>
                            <div className="lp4"></div>
                            <div className="textt">
                                <span className="progres">Progress</span>
                            </div>
                            <div className="lp11"></div>
                            <div className="lp22"></div>
                            <div className="lp33"></div>
                            <div className="lp44"></div>
                        </div>
                        <div className="captiont">
                            <span className="capt-p">Track your progress here</span>
                        </div>
                    </div>
                </div>
                <div className="fitCard">
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "Count of Training",
                                    data: countTrainingData,
                                    backgroundColor: "#d2d3d5",
                                    borderColor: "#d2d3d5",
                                },
                                {
                                    label: "Count of Programs",
                                    data: countProgramsData,
                                    backgroundColor: "#4E576A",
                                    borderColor: "#4E576A",
                                },
                                {
                                    label: "Average Weight",
                                    data: averageWeightData,
                                    backgroundColor: "#8796b4",
                                    borderColor: "#8796b4",
                                }
                            ],
                        }}
                        options={{
                            elements: {
                                line: {
                                    tension: 0.5,
                                },
                            },
                            scales: {
                                y: {
                                    ticks: {
                                        stepSize: 10,
                                        suggestedMin: 0,
                                        suggestedMax: 120,
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default Progress;
