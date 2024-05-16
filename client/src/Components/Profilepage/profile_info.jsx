import {useEffect, useState} from "react";
import {EditableText} from "./profile_editeble_field.jsx";
import axios from "axios";
//import {EditableText} from "./profile_editeble_field.jsx";

export const MainProfileInfo = () => {
    const [isEditingFirstName, setIsEditingFirstName] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [isEditingLastName, setIsEditingLastName] = useState(false);
    const [lastName, setLastName] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage,] = useState(3);
    const [userInfo, setUserInfo] = useState(null);
    const [favoriteTrainings, setFavoriteTrainings] = useState([]);
    const [favoritePrograms, setFavoritePrograms] = useState([]);

// Обчислюємо кількість сторінок
    const totalPages = Math.ceil(favoriteTrainings.concat(favoritePrograms).length / cardsPerPage);

// Визначаємо картки для поточної сторінки
    const currentCards = favoriteTrainings.concat(favoritePrograms).slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

// Функції для переключення сторінок
    const goToNextPage = () => {
        setCurrentPage(page => Math.min(page + 1, totalPages))
    };

    const goToPreviousPage = () => {
        setCurrentPage(page => Math.max(page - 1, 1))
    };


    const Axios2 = axios.create({
        baseURL: "http://localhost:4444/",
        withCredentials: true,
    });

    useEffect(() => {
        // Отримання даних про користувача
        const token = localStorage.getItem('accessToken');
        Axios2.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios2.get('http://localhost:4444/userinfo')
            .then(response => {
                setUserInfo(response.data);
                setFavoriteTrainings(response.data.favoriteTrainings);
                setFavoritePrograms(response.data.favoritePrograms);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    const handleFirstNameClick = () => {
        setIsEditingFirstName(true);
    };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleFirstNameBlur = () => {
        setIsEditingFirstName(false);
        Axios2.put('http://localhost:4444/user/name', {name: firstName})
            .then(response => {
                console.log('Імя успішно оновлено ');
            })
            .catch(error => {
                console.error('Помилка при запиті:', error);
            });
    };

    const handleLastNameClick = () => {
        setIsEditingLastName(true);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleLastNameBlur = () => {
        setIsEditingLastName(false);
        Axios2.put('http://localhost:4444/user/lastname', {lastname: lastName})
            .then(response => {
                console.log('Прізвище успішно оновлено');
            })
            .catch(error => {
                console.error('Помилка при запиті:', error);
            });
    };

    return (
        <>
            <div style={{width: '85%', height: '85%', borderRadius: '10px 10px 0 0', backgroundColor: 'white', padding: '16px'}}>
                <div style={{marginBottom: '16px'}}>
                    <label style={{
                        display: 'block',
                        color: '#4a5568',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        borderRadius: '50px'
                    }} htmlFor="firstname">
                        First name
                    </label>
                    {isEditingFirstName ? (
                        <input
                            style={{
                                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid transparent',
                                borderRadius: '4px',
                                width: '100%',
                                padding: '8px 12px',
                                color: '#4a5568',
                                lineHeight: '1.25',
                                outline: 'none'
                            }}
                            id="firstname" type="text" placeholder="First Name" value={firstName}
                            onChange={handleFirstNameChange} onBlur={handleFirstNameBlur} autoFocus
                        />
                    ) : (
                        <p onClick={handleFirstNameClick}>{userInfo ? userInfo.first_name : 'Завантаження...'}</p>
                    )}
                </div>
                <div style={{marginBottom: '16px'}}>
                    <label style={{
                        display: 'block',
                        color: '#4a5568',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        marginBottom: '8px'
                    }} htmlFor="lastname">
                        Last Name
                    </label>
                    {isEditingLastName ? (
                        <input
                            style={{
                                boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1)',
                                border: '1px solid transparent',
                                borderRadius: '4px',
                                width: '100%',
                                padding: '8px 12px',
                                color: '#4a5568',
                                lineHeight: '1.25',
                                outline: 'none'
                            }}
                            id="lastname" type="text" placeholder="Last Name" value={lastName}
                            onChange={handleLastNameChange} onBlur={handleLastNameBlur} autoFocus
                        />
                    ) : (
                        <p onClick={handleLastNameClick}>{userInfo ? userInfo.last_name : 'Завантаження...'}</p>
                    )}
                </div>
                <div style={{display: 'flex', fontSize: '1rem', flexWrap: 'nowrap', margin: '-8px'}}>
                    <EditableText id="age" key={`age-${userInfo ? userInfo.age : 'loading'}`} label="Age"
                                  placeholder="Age" type="number" url="http://localhost:4444/user/age"
                                  initialValue={userInfo ? userInfo.age : 'Завантаження...'} style={{flex: 1}}/>
                    <EditableText id="weight" key={`weight-${userInfo ? userInfo.weight : 'loading'}`} label="Weight"
                                  placeholder="Weight" type="number" url="http://localhost:4444/user/weight"
                                  initialValue={userInfo ? userInfo.weight : 'Завантаження...'} style={{flex: 1}}/>
                    <EditableText id="height" key={`height-${userInfo ? userInfo.height : 'loading'}`} label="Height"
                                  placeholder="Height" type="number" url="http://localhost:4444/user/height"
                                  initialValue={userInfo ? userInfo.height : 'Завантаження...'} style={{flex: 1}}/>
                    <EditableText id="experience" key={`experience-${userInfo ? userInfo.experience : 'loading'}`}
                                  label="Callisthenics" type="select" url="http://localhost:4444/user/experience"
                                  options={['Beginner', 'Intermediate', 'Advanced']}
                                  initialValue={userInfo ? userInfo.experience : 'Завантаження...'} style={{flex: 1}}/>
                </div>
            </div>
            <div style={{width: '85%', borderRadius: '0 0 10px 10px', backgroundColor: 'white', padding: '16px'}}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    margin: '20px',
                    justifyContent: 'center'
                }}>
                    {/* Карточки */}
                    {currentCards.map((item, i) => (
                        <div key={i}
                             style={{flex: '0 0 auto', paddingLeft: '3rem', padding: '15px', width: 'calc(100% / 3)', minWidth: '53%'}}>
                            <div style={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                borderColor: '#cbd5e0',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                padding: '16px',
                                borderRadius: '4px'
                            }}>
                                <img alt="gallery"
                                     style={{
                                         width: '80%',
                                         maxWidth: '80%',
                                         backgroundColor: '#f7fafc',
                                         objectFit: 'cover',
                                         objectPosition: 'center',
                                         flexShrink: '0',
                                         borderRadius: '4px',
                                         marginBottom: '16px'
                                     }}
                                     src={'http://localhost:4444' + item.image}
                                     style={{width: '53%', maxWidth: '53%', minWidth: '25%'}}/>
                                <div style={{flexGrow: '1'}}>
                                    <h2 style={{
                                        color: '#1a202c',
                                        fontFamily: 'serif',
                                        marginTop: '10px',
                                        fontWeight: '500'
                                    }}>{item.name}</h2>
                                    <p style={{color: '#718096'}}>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Стрілки для переключення сторінок */}
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
                    <button style={{
                        backgroundColor: '#4299e1',
                        hover: '#2b6cb0',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        borderRadius: '4px'
                    }} onClick={goToPreviousPage}>
                        Previous
                    </button>
                    <button style={{
                        backgroundColor: '#4299e1',
                        hover: '#2b6cb0',
                        color: 'white',
                        fontWeight: 'bold',
                        padding: '8px 16px',
                        borderRadius: '4px'
                    }} onClick={goToNextPage}>
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}
//