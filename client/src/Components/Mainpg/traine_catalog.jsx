import {useEffect, useState} from "react";
import '../Mainpg/mainp.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';

const TrainCatalog = () => {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4444/trainings')
            .then(response => {
                setTrainings(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const navigate = useNavigate();

    const handleClickTraining = (id) => {
        navigate(`/traininginfo/${id}`);
    };

    return (
        <>
            <header id="main-header" className="header">
                <a href="#" className="logo">
                    <img src="./src/Components/img/logo.jpg" alt="Logo"/>
                </a>
                <ul className="navbar">
                    <li><a href="#home" className="home-active">Home</a></li>
                    <li><a href="#programs">Programs</a></li>
                    <li><a href="#training">Training</a></li>
                    <li><a href="#progress">Progress</a></li>
                    <li><a href="#about">About</a></li>
                </ul>
                <div className="nav-button">
                    <Link to="/login" className="btn" id="login">Log In</Link>
                    <Link to="/signup" className="btn" id="signup">Sign Up</Link>
                </div>
            </header>
            {/* ------ Welcome Page Start----------- */}
            <section className="training bg-dark has-bg-image" id="training" style={{paddingTop: '100px'}}>
                <div className="catalog-container">
                    <div className="headlines">
                        <div className="lt1"></div>
                        <div className="lt2"></div>
                        <div className="lt3"></div>
                        <div className="lt4"></div>
                        <div className="textt">
                            <span className="trainin">Training</span>
                        </div>
                        <div className="lt11"></div>
                        <div className="lt22"></div>
                        <div className="lt33"></div>
                        <div className="lt44"></div>
                    </div>
                    <div className="captiont">
                        <span className="capt-t">Choose your ideal exercises for the day's workout</span>
                    </div>
                    <ul className="training-list catalog-has-scrollbar">
                        {trainings.map((training) => (
                            <li className="scrollbar-item" key={training._id}
                                onClick={() => handleClickTraining(training._id)}>
                                <div className="training-card">
                                    <figure className="card-banner">
                                        <img src={'http://localhost:4444' + training.image} width="443" height="558"
                                             loading="lazy"
                                             className="img-training" alt={`Training ${training.name}`}/>
                                    </figure>
                                    <div className="card-content">
                                        <div className="title-wrapper">
                                            <h3>
                                                <a href="#" className="card-title">{training.name}</a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
};

export default TrainCatalog;