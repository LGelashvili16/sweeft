import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={`container ${classes['header-wrapper']}`}>
        <div className={classes.logo}>
          <Link to="home">
            <h1>Glimpse</h1>
          </Link>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink
                to="home"
                className={({ isActive }) =>
                  isActive ? `${classes.link} ${classes.active}` : classes.link
                }
              >
                მთავარი
              </NavLink>
            </li>
            <li>
              {' '}
              <NavLink
                to="history"
                className={({ isActive }) =>
                  isActive ? `${classes.link} ${classes.active}` : classes.link
                }
              >
                ისტორია
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
