import './header.css';
import { Link } from 'react-router-dom';
function Header2(props) {
    return (
        <header className="header">
            <h3 className='header_message'>{props.message}</h3>
            <Link to={props.location}>
                <button href="#" className="button1 button" target="_blank" rel="noopener">{props.status}</button>
            </Link>
        </header>
    )
}

export default Header2;