import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import './profilepage.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {MainProfileInfo} from "./profile_info.jsx";
import TrainingHistoryPanel from "./train_plan.jsx";
import {Switch} from "@headlessui/react";

const Profilepage = () => {
    const [myVariable, setMyVariable] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const Axios = axios.create({
        baseURL: "http://localhost:4444/",
        withCredentials: true,
    });
    useEffect(() => {
        Axios.get('http://localhost:4444/checkAuth')
            .then(response => {
                if (response.status === 200) {
                    setMyVariable(true);
                }
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Помилка при запиті:', error);
                setIsLoading(false);
            });
    }, []);

    const handleLogout = async () => {
        Axios.get('http://localhost:4444/auth/logout')
            .then(response => {
                if (response.status === 200) {
                    setMyVariable(true);
                }
            })
            .catch(error => {
                console.error('Помилка при запиті:', error);
            });
    };

    if (isLoading) {
        return <div>Завантаження...</div>;
    } else if (myVariable)
        return (
            <div className="bg-back">
                <div className="sidebar-container">
                    <NavLink to="/" className="side-list" activeClassName="active">
                        <i className='bx bx-home'></i>
                        <span className="side-text"> Home</span>
                    </NavLink>
                    <NavLink to="/profilepage" className="side-list" activeClassName="active">
                        <i className='bx bx-user'></i>
                        <span className="side-text"> Profile</span>
                    </NavLink>
                    <div className="side-list">
                        <i class='bx bx-line-chart'></i>
                        <span className="side-text"> Progress</span>
                    </div>
                    <div className="side-list">
                        <i class='bx bx-calendar'></i>
                        <span className="side-text"> Training Plan</span>
                    </div>
                    <NavLink to="/profilepage/training" className="side-lists" onClick={handleLogout}>
                        <i class='bx bx-log-out'></i>
                        <span className="side-text"> Logout</span>
                    </NavLink>
                </div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<MainProfileInfo/>}/>
                        <Route path="training" element={<TrainingHistoryPanel/>}/>
                    </Routes>
                </div>
            </div>
        )
    else
        return <Navigate to="/login"/>;
}

export default Profilepage;