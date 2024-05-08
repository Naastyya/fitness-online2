import React, { useEffect } from "react";
import { preLoaderAnim } from '../animations/animation';
import './preloader.css';

const PreLoader = () => {
    useEffect(() => {
        const headerElement = document.getElementById("main-header");
        headerElement.classList.add("hide-header");
        preLoaderAnim();
        setTimeout(() => {
            headerElement.classList.remove("hide-header");
        }, 4765.5);
    }, []);

    return (
        <div className="preloader">
            <div className="texts-container">
                <span>DEVE</span>
                <span>PLU</span>
                <span>FO</span>
            </div>
        </div>
    )
}

export default PreLoader;
