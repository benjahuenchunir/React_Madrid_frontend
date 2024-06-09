import PropTypes from 'prop-types';
import { useState } from 'react';
import './AccordionDocs.css';

const AccordionDocs = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">
            <div className={`accordion-header ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
                <h3 className="accordion-title">{title}</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            {isOpen && <div className="accordion-content">{content}</div>}
        </div>
    );
};

AccordionDocs.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default AccordionDocs;