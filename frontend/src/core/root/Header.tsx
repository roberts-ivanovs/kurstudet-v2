import React from 'react';
import { Link } from 'react-router-dom';
import styleUtil from '../../utils/StyleUtils.module.scss';
import style from './Header.module.scss';

export function Header(): React.ReactElement {
  return (
    <div className={`${style['fixed-top']} ${style['navbar-box']}`}>
      <nav className={`${styleUtil['center-vertical']} ${style['header-wrapper']}`} role="navigation">
        <div className={`${style['navbar-link']} ${style['navbar-first-item']}`}>
          <Link
            to={{ pathname: '/' }}
          >
            <p className={style['navbar-text']}>
              Sākums
            </p>
          </Link>
        </div>
        <div className={style['navbar-link']}>
          <Link
            to={{ pathname: 'programmes' }}
          >
            <p className={style['navbar-text']}>
              Programmas
            </p>
          </Link>
        </div>
        <div className={style['navbar-link']}>
          <Link
            to={{ pathname: 'forum' }}
          >
            <p className={style['navbar-text']}>
              Forums
            </p>
          </Link>
        </div>
        <div className={style['navbar-link']}>
          <Link
            to={{ pathname: 'about' }}
          >
            <p className={style['navbar-text']}>
              Par
            </p>
          </Link>
        </div>
        <div className={style['navbar-button']}>
          <Link
            to={{ pathname: 'connect' }}
          >
            <p className={style['navbar-button-text']}>
              Pieslēgties
            </p>
          </Link>
        </div>
      </nav>
    </div>
  );
}
