// components/Navbar.tsx
"use client"
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar: React.FC = () => (
  <nav className={styles.navbar}>
    <Link href="/" className={styles.navLink}>Home</Link>
    <Link href="/problems" className={styles.navLink}>Problems</Link>
  </nav>
);

export default Navbar;
