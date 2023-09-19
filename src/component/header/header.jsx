import './header.css';
import { Link } from 'react-router-dom';
function Header(props) {
    return (
        <header class="header">
            <h3 className='header_message'>{props.message}</h3>
            <Link to={'/signin'}>
                <button href="#" className="button1 button" target="_blank" rel="noopener" onClick={props.onClick}>{props.status}</button>
            </Link>
        </header>
    )
}

export default Header;