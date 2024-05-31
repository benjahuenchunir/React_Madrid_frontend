import React, { useState } from "react";
import './Accordion.css';

const Accordion = (props) => {
    const [isActive, setIsActive] = useState(false);

    const toggleAccordion = () => {
        setIsActive(!isActive);
    };

    return (
        <>
            <div className="accordion_title_container" onClick={toggleAccordion}>
                <h2 className={`accordion_title ${isActive ? 'active' : ''}`}>{props.title}</h2>
                <div className="button_container">
                </div>      
            </div>

            <div 
            className={`accordion_content ${isActive ? 'active' : ''}`}
            style={{ maxHeight: isActive ? "1000px" : "0px" }}>
                <p>{props.text}</p>
            </div>

        </>
    );
}

export default Accordion;