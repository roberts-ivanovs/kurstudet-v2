import React from 'react';
import { Link } from 'react-router-dom';
import styleUtil from '../../utils/StyleUtils.module.scss';
import style from './Header.module.scss';

export function Header(): React.ReactElement {
  return (
    <div className={`${style['fixed-top']} ${style['navbar-box']}`}>
      <nav className={styleUtil['center-vertical']} role="navigation">
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
