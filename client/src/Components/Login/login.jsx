import React, {useEffect, useState} from "react";
import '../Login/login.css';
import img from '../img/login.jpg';
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const [loginStatus, setLoginStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('message')
    const [showPassword, setShowPassword] = useState(false);

    const navigateTo = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();

        const Axios = axios.create({
            baseURL: "http://localhost:4444/",
            withCredentials: true,
        });

        if (!loginEmail || !loginPassword) {
            setLoginStatus('Please fill in all fields');
            setStatusHolder('showMessage');
            return;
        }
        Axios.post('http://localhost:4444/auth/login', {
            email: loginEmail,
            password: loginPassword
        }).then(response => {
            if (response.status === 200) {
                navigateTo('/profilepage');
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(() => {
        if (loginStatus !== '') {
            setStatusHolder('showMessage')
            setTimeout(() => {
                setStatusHolder('message')
                setLoginStatus('');
            }, 4000);
        }
    }, [loginStatus])

    const onSubmit = () => {
        setLoginEmail('')
        setLoginPassword('')
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className="login-page">
            <div className="left-section">
                <img src={img} className="login-image" alt="Login"/>
            </div>
            <div className="right-section">
                <div className="form-log">
                    <div className="wrappper">
                        <div className="logo">
                            <a href="/">
                                <svg width="240" height="48" viewBox="0 0 190 36" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M61.2156 14.6268L54.6981 12.5104L55.3288 10.7439L56.3801 11.0852M61.2156 14.6268L64.3693 15.6509L65 13.8844L63.7911 13.4918M61.2156 14.6268L57.8518 25.0724H59.9542V27.1897H58.517C58.517 27.8439 58.517 29 58.517 29M54.1038 25.4313L58.2722 13.4918M63.7911 13.4918L64.3693 11.7253L62.4771 11.0852M63.7911 13.4918L56.3801 11.0852M56.3801 11.0852L57.0108 9.36988L59.1132 9.95873M62.4771 11.0852L62.8976 9.36988C62.5925 8.3769 60.737 7.87042 59.7439 8.38848L59.1132 9.95873M62.4771 11.0852L59.1132 9.95873"
                                        stroke="#F5F5F5" strokeWidth="0.5"/>
                                    <path d="M49.3999 15.2L52.6999 26H55.3999L59.2999 15.2" stroke="#F5F5F5"
                                          strokeWidth="0.5"/>
                                    <path
                                        d="M47.566 14.5096L53.7075 12.3718L53.1132 10.5874L52.1226 10.9322M47.566 14.5096L44.5943 15.544L44 13.7596L45.1392 13.3631M47.566 14.5096L50.7358 25.0607H48.7547V27.1897H50.1415M54.1038 25.4313L50.3396 13.3631M45.1392 13.3631L44.5943 11.5787L46.3774 10.9322M45.1392 13.3631L52.1226 10.9322M52.1226 10.9322L51.5283 9.19957L49.5472 9.79436M46.3774 10.9322L45.9811 9.19957C46.2686 8.19655 48.017 7.68496 48.9528 8.20825L49.5472 9.79436M46.3774 10.9322L49.5472 9.79436M50.1415 27.1897C50.1415 27.8505 50.1415 28.8679 50.1415 28.8679H58.6604M50.1415 27.1897H58.6604"
                                        stroke="#F5F5F5" strokeWidth="0.5"/>
                                    <path
                                        d="M20.94 22.88C20.94 25.04 20.31 26.65 19.05 27.71C17.81 28.77 15.88 29.3 13.26 29.3H3.15C2.67 29.3 2.32 29.19 2.1 28.97C1.88 28.75 1.77 28.4 1.77 27.92V8.48C1.77 8 1.88 7.65 2.1 7.43C2.32 7.21 2.67 7.1 3.15 7.1H13.26C15.88 7.1 17.81 7.63 19.05 8.69C20.31 9.75 20.94 11.36 20.94 13.52V22.88ZM13.26 29C15.76 29 17.61 28.5 18.81 27.5C20.03 26.5 20.64 24.96 20.64 22.88V13.52C20.64 11.44 20.03 9.9 18.81 8.9C17.61 7.9 15.76 7.4 13.26 7.4H3.15C2.77 7.4 2.49 7.49 2.31 7.67C2.15 7.83 2.07 8.1 2.07 8.48V27.92C2.07 28.3 2.15 28.58 2.31 28.76C2.49 28.92 2.77 29 3.15 29H13.26ZM5.34 26.3V10.1H12.6C13.62 10.1 14.44 10.21 15.06 10.43C15.7 10.65 16.19 10.95 16.53 11.33C16.87 11.69 17.1 12.13 17.22 12.65C17.34 13.15 17.4 13.69 17.4 14.27V22.22C17.4 22.8 17.34 23.34 17.22 23.84C17.12 24.34 16.9 24.77 16.56 25.13C16.22 25.49 15.73 25.78 15.09 26C14.45 26.2 13.62 26.3 12.6 26.3H5.34ZM12.6 10.4H5.64V26H12.6C13.56 26 14.33 25.91 14.91 25.73C15.51 25.53 15.97 25.27 16.29 24.95C16.61 24.61 16.82 24.21 16.92 23.75C17.04 23.27 17.1 22.76 17.1 22.22V14.27C17.1 13.73 17.04 13.22 16.92 12.74C16.8 12.26 16.58 11.85 16.26 11.51C15.94 11.17 15.48 10.9 14.88 10.7C14.3 10.5 13.54 10.4 12.6 10.4ZM8.88 13.13H12.45C12.93 13.13 13.28 13.25 13.5 13.49C13.74 13.71 13.86 14.07 13.86 14.57V21.86C13.86 22.36 13.74 22.73 13.5 22.97C13.28 23.21 12.93 23.33 12.45 23.33H8.88V13.13ZM12.45 13.43H9.18V23.03H12.45C12.83 23.03 13.11 22.94 13.29 22.76C13.47 22.56 13.56 22.26 13.56 21.86V14.57C13.56 14.19 13.47 13.91 13.29 13.73C13.11 13.53 12.83 13.43 12.45 13.43ZM25.5328 29.3C25.0528 29.3 24.7028 29.19 24.4828 28.97C24.2628 28.75 24.1528 28.4 24.1528 27.92V8.48C24.1528 8 24.2628 7.65 24.4828 7.43C24.7028 7.21 25.0528 7.1 25.5328 7.1H39.4528C39.9328 7.1 40.2828 7.21 40.5028 7.43C40.7228 7.65 40.8328 8 40.8328 8.48V11.99C40.8328 12.47 40.7228 12.82 40.5028 13.04C40.2828 13.26 39.9328 13.37 39.4528 13.37H31.4728V15.08H37.0228C37.5028 15.08 37.8528 15.19 38.0728 15.41C38.2928 15.63 38.4028 15.98 38.4028 16.46V19.67C38.4028 20.15 38.2928 20.5 38.0728 20.72C37.8528 20.94 37.5028 21.05 37.0228 21.05H31.4728V23.03H39.4528C39.9328 23.03 40.2828 23.14 40.5028 23.36C40.7228 23.58 40.8328 23.93 40.8328 24.41V27.92C40.8328 28.4 40.7228 28.75 40.5028 28.97C40.2828 29.19 39.9328 29.3 39.4528 29.3H25.5328ZM39.4528 29C39.8328 29 40.1028 28.92 40.2628 28.76C40.4428 28.58 40.5328 28.3 40.5328 27.92V24.41C40.5328 24.03 40.4428 23.76 40.2628 23.6C40.1028 23.42 39.8328 23.33 39.4528 23.33H31.1728V20.75H37.0228C37.4028 20.75 37.6728 20.67 37.8328 20.51C38.0128 20.33 38.1028 20.05 38.1028 19.67V16.46C38.1028 16.08 38.0128 15.81 37.8328 15.65C37.6728 15.47 37.4028 15.38 37.0228 15.38H31.1728V13.07H39.4528C39.8328 13.07 40.1028 12.99 40.2628 12.83C40.4428 12.65 40.5328 12.37 40.5328 11.99V8.48C40.5328 8.1 40.4428 7.83 40.2628 7.67C40.1028 7.49 39.8328 7.4 39.4528 7.4H25.5328C25.1528 7.4 24.8728 7.49 24.6928 7.67C24.5328 7.83 24.4528 8.1 24.4528 8.48V27.92C24.4528 28.3 24.5328 28.58 24.6928 28.76C24.8728 28.92 25.1528 29 25.5328 29H39.4528ZM37.8328 26V26.3H27.7228V10.1H37.8328V10.4H28.0228V17.93H35.4028V18.23H28.0228V26H37.8328Z"
                                        fill="white"/>
                                    <path
                                        d="M69.15 29.3C68.67 29.3 68.32 29.19 68.1 28.97C67.88 28.75 67.77 28.4 67.77 27.92V8.48C67.77 8 67.88 7.65 68.1 7.43C68.32 7.21 68.67 7.1 69.15 7.1H83.07C83.55 7.1 83.9 7.21 84.12 7.43C84.34 7.65 84.45 8 84.45 8.48V11.99C84.45 12.47 84.34 12.82 84.12 13.04C83.9 13.26 83.55 13.37 83.07 13.37H75.09V15.08H80.64C81.12 15.08 81.47 15.19 81.69 15.41C81.91 15.63 82.02 15.98 82.02 16.46V19.67C82.02 20.15 81.91 20.5 81.69 20.72C81.47 20.94 81.12 21.05 80.64 21.05H75.09V23.03H83.07C83.55 23.03 83.9 23.14 84.12 23.36C84.34 23.58 84.45 23.93 84.45 24.41V27.92C84.45 28.4 84.34 28.75 84.12 28.97C83.9 29.19 83.55 29.3 83.07 29.3H69.15ZM83.07 29C83.45 29 83.72 28.92 83.88 28.76C84.06 28.58 84.15 28.3 84.15 27.92V24.41C84.15 24.03 84.06 23.76 83.88 23.6C83.72 23.42 83.45 23.33 83.07 23.33H74.79V20.75H80.64C81.02 20.75 81.29 20.67 81.45 20.51C81.63 20.33 81.72 20.05 81.72 19.67V16.46C81.72 16.08 81.63 15.81 81.45 15.65C81.29 15.47 81.02 15.38 80.64 15.38H74.79V13.07H83.07C83.45 13.07 83.72 12.99 83.88 12.83C84.06 12.65 84.15 12.37 84.15 11.99V8.48C84.15 8.1 84.06 7.83 83.88 7.67C83.72 7.49 83.45 7.4 83.07 7.4H69.15C68.77 7.4 68.49 7.49 68.31 7.67C68.15 7.83 68.07 8.1 68.07 8.48V27.92C68.07 28.3 68.15 28.58 68.31 28.76C68.49 28.92 68.77 29 69.15 29H83.07ZM81.45 26V26.3H71.34V10.1H81.45V10.4H71.64V17.93H79.02V18.23H71.64V26H81.45ZM88.7789 29.3C88.2989 29.3 87.9489 29.19 87.7289 28.97C87.5089 28.75 87.3989 28.4 87.3989 27.92V8.48C87.3989 8 87.5089 7.65 87.7289 7.43C87.9489 7.21 88.2989 7.1 88.7789 7.1H97.9589C99.3789 7.1 100.569 7.25 101.529 7.55C102.489 7.85 103.249 8.27 103.809 8.81C104.369 9.35 104.759 10 104.979 10.76C105.219 11.52 105.339 12.35 105.339 13.25V17.09C105.339 17.99 105.219 18.82 104.979 19.58C104.759 20.34 104.369 20.99 103.809 21.53C103.249 22.07 102.489 22.49 101.529 22.79C100.569 23.09 99.3789 23.24 97.9589 23.24H94.8089V27.92C94.8089 28.4 94.6989 28.75 94.4789 28.97C94.2589 29.19 93.9089 29.3 93.4289 29.3H88.7789ZM93.4289 29C93.8089 29 94.0789 28.92 94.2389 28.76C94.4189 28.58 94.5089 28.3 94.5089 27.92V22.94H97.9589C100.679 22.94 102.539 22.4 103.539 21.32C104.539 20.24 105.039 18.83 105.039 17.09V13.25C105.039 11.51 104.539 10.1 103.539 9.02C102.539 7.94 100.679 7.4 97.9589 7.4H88.7789C88.3989 7.4 88.1189 7.49 87.9389 7.67C87.7789 7.83 87.6989 8.1 87.6989 8.48V27.92C87.6989 28.3 87.7789 28.58 87.9389 28.76C88.1189 28.92 88.3989 29 88.7789 29H93.4289ZM97.5389 20.39H91.3589V26.3H91.0589V10.1H97.5389C98.4789 10.1 99.2389 10.21 99.8189 10.43C100.419 10.63 100.879 10.91 101.199 11.27C101.519 11.63 101.739 12.06 101.859 12.56C101.979 13.06 102.039 13.6 102.039 14.18V16.4C102.039 16.98 101.979 17.52 101.859 18.02C101.739 18.5 101.519 18.92 101.199 19.28C100.879 19.62 100.419 19.89 99.8189 20.09C99.2389 20.29 98.4789 20.39 97.5389 20.39ZM91.3589 20.09H97.5389C98.4189 20.09 99.1289 20 99.6689 19.82C100.229 19.64 100.659 19.39 100.959 19.07C101.259 18.73 101.459 18.34 101.559 17.9C101.679 17.44 101.739 16.94 101.739 16.4V14.18C101.739 13.64 101.679 13.14 101.559 12.68C101.459 12.22 101.259 11.82 100.959 11.48C100.659 11.14 100.229 10.88 99.6689 10.7C99.1289 10.5 98.4189 10.4 97.5389 10.4H91.3589V20.09ZM94.4489 13.01H97.1489C97.7289 13.01 98.1089 13.16 98.2889 13.46C98.4689 13.76 98.5589 14.1 98.5589 14.48V16.07C98.5589 16.45 98.4689 16.79 98.2889 17.09C98.1089 17.39 97.7289 17.54 97.1489 17.54H94.4489V13.01ZM97.1489 13.31H94.7489V17.24H97.1489C97.6089 17.24 97.9089 17.12 98.0489 16.88C98.1889 16.64 98.2589 16.37 98.2589 16.07V14.48C98.2589 14.18 98.1889 13.91 98.0489 13.67C97.9089 13.43 97.6089 13.31 97.1489 13.31ZM109.228 29.3C108.748 29.3 108.398 29.19 108.178 28.97C107.958 28.75 107.848 28.4 107.848 27.92V8.48C107.848 8 107.958 7.65 108.178 7.43C108.398 7.21 108.748 7.1 109.228 7.1H113.878C114.358 7.1 114.708 7.21 114.928 7.43C115.148 7.65 115.258 8 115.258 8.48V23.03H118.768V18.47C118.768 17.99 118.878 17.64 119.098 17.42C119.318 17.2 119.668 17.09 120.148 17.09H124.498C124.978 17.09 125.328 17.2 125.548 17.42C125.768 17.64 125.878 17.99 125.878 18.47V27.92C125.878 28.4 125.768 28.75 125.548 28.97C125.328 29.19 124.978 29.3 124.498 29.3H109.228ZM124.498 29C124.878 29 125.148 28.92 125.308 28.76C125.488 28.58 125.578 28.3 125.578 27.92V18.47C125.578 18.09 125.488 17.82 125.308 17.66C125.148 17.48 124.878 17.39 124.498 17.39H120.148C119.768 17.39 119.488 17.48 119.308 17.66C119.148 17.82 119.068 18.09 119.068 18.47V23.33H114.958V8.48C114.958 8.1 114.868 7.83 114.688 7.67C114.528 7.49 114.258 7.4 113.878 7.4H109.228C108.848 7.4 108.568 7.49 108.388 7.67C108.228 7.83 108.148 8.1 108.148 8.48V27.92C108.148 28.3 108.228 28.58 108.388 28.76C108.568 28.92 108.848 29 109.228 29H124.498ZM111.418 26.3V10.1H111.718V26H122.158V20.09H122.458V26.3H111.418ZM147.698 8.48V23.33C147.698 24.27 147.558 25.14 147.278 25.94C147.018 26.72 146.538 27.39 145.838 27.95C145.138 28.51 144.158 28.95 142.898 29.27C141.658 29.59 140.068 29.75 138.128 29.75C136.188 29.75 134.588 29.59 133.328 29.27C132.088 28.95 131.118 28.51 130.418 27.95C129.718 27.39 129.228 26.72 128.948 25.94C128.688 25.14 128.558 24.27 128.558 23.33V8.48C128.558 8 128.668 7.65 128.888 7.43C129.108 7.21 129.458 7.1 129.938 7.1H134.647C135.128 7.1 135.478 7.21 135.698 7.43C135.918 7.65 136.028 8 136.028 8.48V22.16C136.028 22.52 136.178 22.8 136.478 23C136.798 23.18 137.368 23.27 138.188 23.27C139.028 23.27 139.598 23.18 139.898 23C140.218 22.8 140.378 22.52 140.378 22.16V8.48C140.378 8 140.478 7.65 140.678 7.43C140.898 7.21 141.258 7.1 141.758 7.1H146.318C146.798 7.1 147.148 7.21 147.368 7.43C147.588 7.65 147.698 8 147.698 8.48ZM147.398 23.33V8.48C147.398 8.1 147.308 7.83 147.128 7.67C146.968 7.49 146.698 7.4 146.318 7.4H141.758C141.378 7.4 141.098 7.49 140.918 7.67C140.758 7.83 140.678 8.1 140.678 8.48V22.16C140.678 22.56 140.528 22.9 140.228 23.18C139.928 23.44 139.248 23.57 138.188 23.57C137.148 23.57 136.478 23.44 136.178 23.18C135.878 22.9 135.728 22.56 135.728 22.16V8.48C135.728 8.1 135.638 7.83 135.458 7.67C135.298 7.49 135.028 7.4 134.647 7.4H129.938C129.558 7.4 129.278 7.49 129.098 7.67C128.938 7.83 128.858 8.1 128.858 8.48V23.33C128.858 24.25 128.988 25.09 129.248 25.85C129.528 26.59 130.008 27.23 130.688 27.77C131.388 28.29 132.338 28.7 133.538 29C134.738 29.3 136.268 29.45 138.128 29.45C139.988 29.45 141.518 29.3 142.718 29C143.918 28.7 144.858 28.29 145.538 27.77C146.238 27.23 146.718 26.59 146.978 25.85C147.258 25.09 147.398 24.25 147.398 23.33ZM132.158 10.1H132.458V22.61C132.458 23.73 132.848 24.64 133.628 25.34C134.428 26.02 135.938 26.36 138.158 26.36C140.378 26.36 141.888 26.02 142.688 25.34C143.488 24.64 143.887 23.73 143.887 22.61V10.1H144.188V22.61C144.188 23.81 143.768 24.79 142.928 25.55C142.088 26.29 140.498 26.66 138.158 26.66C135.818 26.66 134.228 26.29 133.388 25.55C132.568 24.79 132.158 23.81 132.158 22.61V10.1ZM152.47 29.3C151.99 29.3 151.64 29.19 151.42 28.97C151.2 28.75 151.09 28.4 151.09 27.92V8.48C151.09 8 151.2 7.65 151.42 7.43C151.64 7.21 151.99 7.1 152.47 7.1H165.85C166.33 7.1 166.68 7.21 166.9 7.43C167.12 7.65 167.23 8 167.23 8.48V12.05C167.23 12.53 167.12 12.88 166.9 13.1C166.68 13.32 166.33 13.43 165.85 13.43H158.5V15.95H163.42C163.9 15.95 164.25 16.06 164.47 16.28C164.69 16.5 164.8 16.85 164.8 17.33V20.93C164.8 21.41 164.69 21.76 164.47 21.98C164.25 22.2 163.9 22.31 163.42 22.31H158.5V27.92C158.5 28.4 158.39 28.75 158.17 28.97C157.95 29.19 157.6 29.3 157.12 29.3H152.47ZM157.12 29C157.5 29 157.77 28.92 157.93 28.76C158.11 28.58 158.2 28.3 158.2 27.92V22.01H163.42C163.8 22.01 164.07 21.93 164.23 21.77C164.41 21.59 164.5 21.31 164.5 20.93V17.33C164.5 16.95 164.41 16.68 164.23 16.52C164.07 16.34 163.8 16.25 163.42 16.25H158.2V13.13H165.85C166.23 13.13 166.5 13.05 166.66 12.89C166.84 12.71 166.93 12.43 166.93 12.05V8.48C166.93 8.1 166.84 7.83 166.66 7.67C166.5 7.49 166.23 7.4 165.85 7.4H152.47C152.09 7.4 151.81 7.49 151.63 7.67C151.47 7.83 151.39 8.1 151.39 8.48V27.92C151.39 28.3 151.47 28.58 151.63 28.76C151.81 28.92 152.09 29 152.47 29H157.12ZM154.66 26.3V10.1H164.23V10.4H154.96V18.98H161.8V19.28H154.96V26.3H154.66ZM188.389 13.1V23.33C188.389 24.27 188.259 25.14 187.999 25.94C187.739 26.72 187.249 27.39 186.529 27.95C185.829 28.51 184.849 28.95 183.589 29.27C182.349 29.59 180.749 29.75 178.789 29.75C176.829 29.75 175.219 29.59 173.959 29.27C172.719 28.95 171.739 28.51 171.019 27.95C170.319 27.39 169.829 26.72 169.549 25.94C169.289 25.14 169.159 24.27 169.159 23.33V13.1C169.159 12.16 169.289 11.3 169.549 10.52C169.829 9.72 170.319 9.04 171.019 8.48C171.739 7.9 172.719 7.45 173.959 7.13C175.219 6.81 176.829 6.65 178.789 6.65C180.749 6.65 182.349 6.81 183.589 7.13C184.849 7.45 185.829 7.9 186.529 8.48C187.249 9.04 187.739 9.72 187.999 10.52C188.259 11.3 188.389 12.16 188.389 13.1ZM188.089 23.33V13.1C188.089 12.18 187.949 11.35 187.669 10.61C187.409 9.85 186.929 9.2 186.229 8.66C185.549 8.12 184.599 7.7 183.379 7.4C182.179 7.1 180.649 6.95 178.789 6.95C176.929 6.95 175.389 7.1 174.169 7.4C172.949 7.7 171.989 8.12 171.289 8.66C170.609 9.2 170.129 9.85 169.849 10.61C169.589 11.35 169.459 12.18 169.459 13.1V23.33C169.459 24.25 169.589 25.09 169.849 25.85C170.129 26.59 170.609 27.23 171.289 27.77C171.989 28.29 172.949 28.7 174.169 29C175.389 29.3 176.929 29.45 178.789 29.45C180.649 29.45 182.179 29.3 183.379 29C184.599 28.7 185.549 28.29 186.229 27.77C186.929 27.23 187.409 26.59 187.669 25.85C187.949 25.09 188.089 24.25 188.089 23.33ZM184.819 22.64C184.819 23.84 184.389 24.82 183.529 25.58C182.669 26.32 181.069 26.69 178.729 26.69C176.389 26.69 174.799 26.32 173.959 25.58C173.119 24.82 172.699 23.84 172.699 22.64V13.79C172.699 12.59 173.119 11.62 173.959 10.88C174.799 10.12 176.389 9.74 178.729 9.74C181.069 9.74 182.669 10.12 183.529 10.88C184.389 11.62 184.819 12.59 184.819 13.79V22.64ZM172.999 22.64C172.999 23.76 173.399 24.67 174.199 25.37C174.999 26.05 176.509 26.39 178.729 26.39C180.949 26.39 182.469 26.05 183.289 25.37C184.109 24.67 184.519 23.76 184.519 22.64V13.79C184.519 12.67 184.109 11.77 183.289 11.09C182.469 10.39 180.949 10.04 178.729 10.04C176.509 10.04 174.999 10.39 174.199 11.09C173.399 11.77 172.999 12.67 172.999 13.79V22.64ZM176.269 22.25V14.18C176.269 13.8 176.419 13.48 176.719 13.22C177.019 12.94 177.709 12.8 178.789 12.8C179.869 12.8 180.559 12.94 180.859 13.22C181.159 13.48 181.309 13.8 181.309 14.18V22.25C181.309 22.65 181.159 22.99 180.859 23.27C180.559 23.53 179.869 23.66 178.789 23.66C177.709 23.66 177.019 23.53 176.719 23.27C176.419 22.99 176.269 22.65 176.269 22.25ZM176.569 14.18V22.25C176.569 22.61 176.719 22.89 177.019 23.09C177.339 23.27 177.929 23.36 178.789 23.36C179.649 23.36 180.229 23.27 180.529 23.09C180.849 22.89 181.009 22.61 181.009 22.25V14.18C181.009 13.84 180.849 13.58 180.529 13.4C180.229 13.2 179.649 13.1 178.789 13.1C177.949 13.1 177.369 13.2 177.049 13.4C176.729 13.58 176.569 13.84 176.569 14.18Z"
                                        fill="white"/>
                                </svg>
                            </a>
                        </div>
                        <h1>Welcome Back!</h1>
                        <form className="formgrid" onSubmit={onSubmit}><span
                            className={statusHolder}>{loginStatus}</span>
                            <div className="input-box">
                                <span className="inputee">Email</span>
                                <input type="text" placeholder="Enter your email" onChange={(event) => {
                                    setLoginEmail(event.target.value)
                                }} required/>
                                <i className='bx bx-envelope'></i>
                            </div>
                            <div className="input-box">
                                <span className="inputee">Password</span>
                                <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                                       value={loginPassword} onChange={(event) => {
                                    setLoginPassword(event.target.value)
                                }} required/>
                                <i className='bx bx-low-vision' onClick={togglePasswordVisibility}></i>
                            </div>
                            <button type="submit" className="btn" onClick={loginUser}>LOG IN</button>
                            <div className="register-link">
                                <p>Don't have an account?<Link to={'/signup'}> Sign Up
                                </Link></p>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="ellipse ellipse1">
                    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink" width="462px">
                        <defs>
                            <linearGradient id="gradient1">
                                <stop offset="0%" stopColor="rgb(49, 69, 116)"/>
                                <stop offset="100%" stopColor="rgb(104, 125, 164)"/>
                            </linearGradient>
                        </defs>
                        <path id="blob"
                              d="M419,314.5Q404,379,340,389.5Q276,400,206,424Q136,448,108.5,380Q81,312,90.5,254Q100,196,146,172.5Q192,149,240.5,88.5Q289,28,338,81.5Q387,135,410.5,192.5Q434,250,419,314.5Z"
                              fill="url(#gradient1)"/>
                    </svg>
                </div>
                <div className="ellipse ellipse2">
                    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink" width="490px">
                        <defs>
                            <linearGradient id="gradient2">
                                <stop offset="0%" stopColor="rgb(73, 77, 85)"/>
                                <stop offset="100%" stopColor="rgb(27, 75, 175)"/>
                            </linearGradient>
                        </defs>
                        <path id="blob"
                              d="M422,295Q421,340,374,351Q327,362,302,418Q277,474,233.5,441Q190,408,166,376.5Q142,345,150,309Q158,273,96.5,235Q35,197,80,168Q125,139,157,113.5Q189,88,229,91.5Q269,95,292,125.5Q315,156,357.5,163.5Q400,171,411.5,210.5Q423,250,422,295Z"
                              fill="url(#gradient2)"/>
                    </svg>
                </div>
                <div className="ellipse ellipse3">
                    <svg viewBox="0 0 500 500" width="294px">
                        <defs>
                            <linearGradient id="gradient3">
                                <stop offset="0%" stopColor="rgb(42, 80, 161)"/>
                                <stop offset="100%" stopColor="rgba(55, 63, 78, 0.63)"/>
                            </linearGradient>
                        </defs>
                        <path id="blob"
                              d="M427.5,283Q432,316,393,327Q354,338,358.5,391.5Q363,445,321,430.5Q279,416,252,404Q225,392,214,362Q203,332,142,362Q81,392,87,349.5Q93,307,85,278.5Q77,250,90,223.5Q103,197,132.5,186.5Q162,176,163.5,140Q165,104,188.5,68.5Q212,33,252.5,18.5Q293,4,313,55Q333,106,365.5,115.5Q398,125,386,165Q374,205,398.5,227.5Q423,250,427.5,283Z"
                              fill="url(#gradient3)"/>
                    </svg>
                </div>
                <div className="ellipse ellipse4">
                    <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg"
                         xmlnsXlink="http://www.w3.org/1999/xlink" width="430">
                        <defs>
                            <linearGradient id="gradient4">
                                <stop offset="0%" stopColor="rgba(31, 43, 69, 0.69)"/>
                                <stop offset="100%" stopColor="rgba(26, 67, 154, 0.81)"/>
                            </linearGradient>
                        </defs>
                        <path id="blob"
                              d="M435,288.5Q436,327,397,342.5Q358,358,348,409.5Q338,461,294,445.5Q250,430,219.5,413.5Q189,397,178,365Q167,333,104.5,334.5Q42,336,56.5,293Q71,250,75.5,215Q80,180,105,155Q130,130,164.5,128Q199,126,224.5,97.5Q250,69,293,55.5Q336,42,381.5,57.5Q427,73,421,127.5Q415,182,424.5,216Q434,250,435,288.5Z"
                              fill="url(#gradient4)"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Login;