import React from 'react';
import { Link } from 'react-router-dom';
import styleUtil from '../../utils/StyleUtils.module.scss';
import style from './Header.module.scss';

export function Header(): React.ReactElement {
  return (
    <div className={`${style['fixed-top']} ${style['navbar-box']} ${styleUtil['center-vertical']}`}>
      <nav className={`${style['header-wrapper']} ${styleUtil['center-vertical']} `} role="navigation">
        <ul className={style['list-box']}>
          <li className={`${style['navbar-link']} ${style['navbar-first-item']}`}>
            <Link
              to={{ pathname: '/' }}
            >
              <p className={`${style['navbar-text']} ${style['navbar-underline']}`}>
                Sākums
              </p>
            </Link>
          </li>
          <li className={style['navbar-link']}>
            <Link
              to={{ pathname: 'programmes' }}
            >
              <p className={style['navbar-text']}>
                Programmas
              </p>
            </Link>
          </li>
          <li className={style['navbar-link']}>
            <Link
              to={{ pathname: 'forum' }}
            >
              <p className={style['navbar-text']}>
                Forums
              </p>
            </Link>
          </li>
          <li className={style['navbar-link']}>
            <Link
              to={{ pathname: 'about' }}
            >
              <p className={style['navbar-text']}>
                Par
              </p>
            </Link>
          </li>
        </ul>
      </nav>
      <div className={style['navbar-button']}>
        <Link
          to={{ pathname: 'connect' }}
        >
          <button type="button" className={style['navbar-button-text']}>
            Pieslēgties
          </button>
        </Link>
      </div>
    </div>
  );
}
