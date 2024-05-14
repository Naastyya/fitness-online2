import './modal.css';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

function TraineModal() {
    const [training, setTraining] = useState(null);
    const {id} = useParams();

    const Axios = axios.create({
        baseURL: "http://localhost:4444/",
        withCredentials: true,
    });

    useEffect(() => {
        axios.get(`http://localhost:4444/training/${id}`)
            .then(response => {
                setTraining(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id]);

    if (!training) {
        return <div>Loading...</div>;
    }

    const handleCompleteTraining = () => {
        Axios.put('http://localhost:4444/training/complete', {trainingId: id})
            .then(response => {
                console.log('Тренування успішно додано');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="training_container">
            <div className="training_content">
                <div className="training_video">
                    <iframe
                        src={training.videoLink}>
                    </iframe>
                    <button>Додати до улюблених</button>
                    <button onClick={handleCompleteTraining}>Відмітити закінчення вправи</button>
                </div>
                <div className="training_text">
                    <div className="training_title">{training.name}</div>
                    <div className="training_image">
                        <img src={'http://localhost:4444' + training.image}/>
                    </div>
                    <div className="training_bottom-text">{'Difficulty level: ' + training.experience}</div>
                    <div className="training_bottom-text">{training.duration + ' min'}</div>
                </div>
            </div>
        </div>
    );
}

export default TraineModal;