import React from 'react';

import style from './Footer.module.scss';

export function Footer(): React.ReactElement {
  return (
    <div className={style['footer-box']}>
      <footer>
        <p>Made with *love* and *coffee*</p>
      </footer>
    </div>
  );
}
