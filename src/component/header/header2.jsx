import './header.css';
function Header2(props) {
    return (
        <header className="header">
            <h3 className='header_message'>{props.message}</h3>
            <button className="button1 button" onClick={props.onClick}>{props.status}</button>
        </header>
    )
}

export default Header2;