import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

export function Header(): React.ReactElement {
  return (
    <div className="fixed-top navbar-box">
      <nav className="center-vertical" role="navigation">
        <Link
          to={{ pathname: '/' }}
        >
          <li>
            <div>
              <span>Sākums</span>
            </div>
          </li>
        </Link>
      </nav>
    </div>
  );
}
