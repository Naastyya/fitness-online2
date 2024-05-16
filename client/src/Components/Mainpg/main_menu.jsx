import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";


export const MainMenu = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const Axios = axios.create({
        baseURL: "http://localhost:4444/",
        withCredentials: true,
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios.get('http://localhost:4444/checkAuth')
            .then(response => {
                if (response.status === 200) {
                    setIsAuthenticated(true);
                }
            })
            .catch(error => {
                console.error('Помилка при запиті:', error);
                setIsAuthenticated(false);
            });
    }, []);

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
                    {isAuthenticated ? (
                        <Link to="/profilepage" className="btn" id="signup">Profile</Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn" id="login">Log In</Link>
                            <Link to="/signup" className="btn" id="signup">Sign Up</Link>
                        </>
                    )}
                </div>
            </header>

        </>
    );
}


