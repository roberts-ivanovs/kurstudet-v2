import React from 'react';
import '../../utils/StyleUtils.scss';
import { Link } from 'react-router-dom';
import style from './Header.module.scss';

export function Header(): React.ReactElement {
  return (
    <div className={`${style['fixed-top']} ${style['navbar-box']}`}>
      <nav className={style['center-vertical']} role="navigation">
        <Link
          to={{ pathname: '/' }}
        >
          Sākums
        </Link>
        <Link
          to={{ pathname: 'programmes' }}
        >
          Programmas
        </Link>
        <Link
          to={{ pathname: 'forum' }}
        >
          Forums
        </Link>
        <Link
          to={{ pathname: 'about' }}
        >
          Par
        </Link>
        <Link
          to={{ pathname: 'connect' }}
        >
          Pieslēgties
        </Link>
      </nav>
    </div>
  );
}
