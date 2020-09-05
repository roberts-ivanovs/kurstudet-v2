import React from 'react';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';

export function Header(): React.ReactElement {
  return (
    <div className={`${style['fixed-top']} ${style['navbar-box']}`}>
      <nav className={style['center-vertical']} role="navigation">
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
