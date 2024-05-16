import './modal.css';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function ProgramModal() {
    const [program, setProgram] = useState(null);
    const [currentExercise, setCurrentExercise] = useState(0);
    const {id} = useParams();

    const Axios = axios.create({
        baseURL: "http://localhost:4444/",
        withCredentials: true,
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios.get(`http://localhost:4444/program/${id}`)
            .then(response => {
                setProgram(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id]);

    if (!program) {
        return <div>Loading...</div>;
    }

    const handleCompleteTraining = () => {
        const token = localStorage.getItem('accessToken');
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios.put('http://localhost:4444/training/complete', {trainingId: program.trainings[currentExercise]._id})
            .then(response => {
                console.log('Тренування успішно додано');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleCompleteExercise = () => {
        const token = localStorage.getItem('accessToken');
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios.put('http://localhost:4444/program/complete', {programId: id})
            .then(response => {
                console.log('Програму успішно додано');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleAddProgramFavorite = () => {
        const token = localStorage.getItem('accessToken');
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios.put('http://localhost:4444/favoritePrograms', {programId: id})
            .then(response => {
                console.log('Програму успішно додано до улюблених');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="training_container">
            <div className="training_content">
                <div className="training_video">
                    <h2>{program.name}</h2>
                    <iframe width="420" height="315"
                            src={program.trainings[currentExercise].videoLink}>
                    </iframe>
                    <button onClick={handleAddProgramFavorite}>Додати до улюблених</button>
                    <button onClick={handleCompleteTraining}>Відмітити закінчення вправи</button>
                    <button onClick={handleCompleteExercise}>Відмітити закінчення программи</button>
                </div>
                <div className="training_text">
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        {program.trainings.map((item, index) =>
                            index < 5 && <button key={index}
                                                 onClick={() => setCurrentExercise(index)}>{`Exercise ${index + 1}`}</button>
                        )}
                    </div>
                    <div className="training_title">{program.trainings[currentExercise].name}</div>
                    <div className="training_image">
                        <img src={'http://localhost:4444' + program.trainings[currentExercise].image}/>
                    </div>
                    <div
                        className="training_bottom-text">{'Difficulty level: ' + program.trainings[currentExercise].experience}</div>
                    <div className="training_bottom-text">{program.trainings[currentExercise].duration + ' min'}</div>
                </div>
            </div>
        </div>
    );
}

export default ProgramModal;
