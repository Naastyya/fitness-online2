import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import '../Progress/progress.css'

import fitData from ".././data/fitData.json"
defaults.maintainAspectRatio = true;
defaults.responsive = true;

const Progress = () => {
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
                    <div className="btn-container">
                        <button type="submit" className="btnp">
                            <a href="/signup" className="btn">Enter Progress</a>
                        </button>
                    </div>
                </div>
                <div className="fitCard">
                    <Line className="lines"
                        data={{
                            labels: fitData.map((data) => data.label),
                            datasets: [
                                {
                                    label: "Weight and body mass index",
                                    data: fitData.map((data) => data.weight),
                                    backgroundColor: "#212631",
                                    borderColor: "#212631",
                                },
                                {
                                    label: "Training volume",
                                    data: fitData.map((data) => data.volume),
                                    backgroundColor: "#4E576A",
                                    borderColor: "#4E576A",
                                },
                                {
                                    label: "Number of exercises",
                                    data: fitData.map((data) => data.exercises),
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
