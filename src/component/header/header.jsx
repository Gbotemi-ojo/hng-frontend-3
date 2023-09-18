import './header.css'
function Header(props) {
  return (
      <header class="header">
        <h3 className='header_message'>{props.message}</h3>
              <a href="" className="button1" target="_blank" rel="noopener" onClick={props.onClick}>{props.status}</a>
      </header>
  )
}

export default Header;