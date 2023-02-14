import {Link, withRouter} from 'react-router-dom'

import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    history.replace('/login')
    Cookie.remove('jwt_token')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="nav-menu">
          <l1>
            <Link to="/" className="nav-link">
              <li className="home">Home</li>
            </Link>
          </l1>
          <li>
            <Link to="/jobs" className="nav-link">
              <li className="home">Jobs</li>
            </Link>
          </li>

          <li>
            <button
              type="button"
              className="logout-desktop-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
