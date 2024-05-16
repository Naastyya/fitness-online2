import {useState, useEffect} from 'react';
import axios from 'axios';

function TrainingHistoryPanel() {
    const [date, setDate] = useState(new Date());
    const [trainingHistories, setTrainingHistories] = useState([]);

    const Axios = axios.create({
        baseURL: "http://localhost:4444/",
        withCredentials: true,
    });

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Axios.get('http://localhost:4444/user/trainingHistory', {params: {date: date.toISOString()}})
            .then(response => {
                setTrainingHistories(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [date]);

    return (
        <div>
            <input type="date" value={date.toISOString().substring(0, 10)}
                   onChange={e => setDate(new Date(e.target.value))}/>
            <div>
                {trainingHistories.map((history, index) => (
                    <div key={index}>
                        {history.trainings.map((training, i) => (
                            <p key={i}>Користувач виконав вправу: {training.name}</p>
                        ))}
                        {history.programs.map((program, i) => (
                            <p key={i}>Користувач виконав програму: {program.name}</p>
                        ))}
                        {history.weightChanged && <p>Вага користувача була змінена</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrainingHistoryPanel;