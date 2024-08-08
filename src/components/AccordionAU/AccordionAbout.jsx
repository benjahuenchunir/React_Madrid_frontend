import PropTypes from 'prop-types';
import './AccordionAbout.css';

const AccordionAbout = (props) => {
    return (
        <>
            <div className="accordion_title_container" onClick={props.onClick}>
                <h2 className={`accordion_title ${props.isActive ? 'active' : ''}`}>{props.title}</h2>
                <div className="button_container">
                </div>      
            </div>

            <div 
            className={`accordion_content ${props.isActive ? 'active' : ''}`}
            style={{ maxHeight: props.isActive ? "1000px" : "0px" }}>
                <p className="member-description">{props.text}</p>
            </div>

        </>
    );
}

AccordionAbout.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default AccordionAbout;