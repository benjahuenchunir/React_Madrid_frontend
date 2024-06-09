import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './button.css';

function Button({ text, to }) {
  return (
      <Link to={to} className="button">
        {text}
      </Link>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default Button;