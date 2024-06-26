import {useEffect, useState} from "react";
import '../Mainpg/mainp.css';
import {Link} from "react-router-dom";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {MainMenu} from "./main_menu.jsx";

const ProgramCatalog = () => {

    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4444/programs')
            .then(response => {
                setPrograms(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const navigate = useNavigate();

    const handleClickProgram = (id) => {
        navigate(`/programinfo/${id}`);
    };

    return (
        <>
            <MainMenu/>
            {/* ------ Welcome Page Start----------- */}
            <section className="programs has-bg-image" id="programs" style={{paddingTop: '100px'}}>
                <div className="catalog-container">
                    <div className="headlines">
                        <div className="l1"></div>
                        <div className="l2"></div>
                        <div className="l3"></div>
                        <div className="l4"></div>
                        <div className="text">
                            <span className="ourp">Our Programs</span>
                        </div>
                        <div className="l11"></div>
                        <div className="l22"></div>
                        <div className="l33"></div>
                        <div className="l44"></div>
                    </div>
                    <div className="caption">
                        <span className="capt-p">Choose the best program aimed at strengthening your physical health and maintaining an active lifestyle.</span>
                    </div>
                    <ul className="program-list catalog-has-scrollbar">
                        {programs.map((program) => (
                            <li className="scrollbar-item" key={program._id}
                                onClick={() => handleClickProgram(program._id)}>
                                <div className="program-card">
                                    <figure className="card-banner">
                                        <img src={'http://localhost:4444' + program.image} width="443" height="558"
                                             loading="lazy"
                                             className="img-program" alt={`Program ${program.name}`}/>
                                    </figure>
                                    <div className="card-content">
                                        <div className="title-wrapper">
                                            <h3>
                                                <a href="#" className="card-title">{program.name}</a>
                                            </h3>
                                        </div>
                                        <p className="card-text">
                                            {program.description}
                                        </p>
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

export default ProgramCatalog;