import { Link } from 'react-router-dom';
import './button.css';


function Button({ text, to }) {
  return (
      <Link to={to} className="button">
        {text}
      </Link>
  );
}

export default Button;