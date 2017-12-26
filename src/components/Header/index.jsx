import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.css';
import UserBox from './UserBox';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.container}>
      <Link className={styles.homeLink} to="/">Testing</Link>
      <UserBox />
    </div>
  </header>
);

export default Header;
