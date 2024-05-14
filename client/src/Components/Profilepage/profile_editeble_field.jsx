import {useState} from 'react';
import axios from "axios";


export const EditableText = ({id, label, placeholder, type = 'text', options, initialValue, url}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(initialValue || (type === 'select' ? 'Beginner' : '0'));


    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (event) => {
        let newValue = event.target.value;
        if (type === 'number') {
            if (!/^\d+$/.test(newValue)) {
                return;
            }
            if (newValue > 99) {
                newValue = 99;
            }
        }
        setValue(newValue);
    };

    const Axios3 = axios.create({
        baseURL: "http://localhost:4444/",
        withCredentials: true,
    });

    const handleSave = () => {
        Axios3.put(url, {[id]: value})
            .then(response => {
                console.log('Data saved successfully');
            })
            .catch(error => {
                console.error('There was an error saving the data', error);
            });
    };

    const handleBlur = () => {
        setIsEditing(false);
        handleSave();
    };

    return (
        <div style={{padding: '8px', width: '50%', maxWidth: 'calc(100% / 4)', minWidth: '25%'}}>
            <label style={{
                display: 'block',
                color: '#4a5568',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                marginBottom: '8px'
            }} htmlFor={id}>
                {label}
            </label>
            {isEditing ? (
                type === 'select' ? (
                    <select
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
                        id={id} value={value} onChange={handleChange} onBlur={handleBlur}
                    >
                        {options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                ) : (
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
                        id={id} type="number" min="0" max="99" placeholder={placeholder} value={value}
                        onChange={handleChange} onBlur={handleBlur} autoFocus
                    />
                )
            ) : (
                <p onClick={handleClick}>{value}</p>
            )}
        </div>
    );
};
