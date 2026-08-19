import React from 'react';
import styles from './style.module.css';

function WalletIcon({ size = 48 }) {
    return (
        <svg
            className={styles.root}
            width={size}
            height={size}
            viewBox="0 0 100 80"
            fill="none"
            color="currentColor"
            aria-hidden="true"
        >
            <rect x="2" y="2" width="96" height="76" stroke="currentColor" strokeWidth="1.2" />
            <rect x="2" y="2" width="96" height="76" stroke="currentColor" strokeWidth="0.3" opacity="0.2" strokeDasharray="3 5" />
            <rect x="8" y="14" width="60" height="46" stroke="currentColor" strokeWidth="1.2" />
            <path d="M68 24 L88 24 L88 52 L68 52" stroke="currentColor" strokeWidth="1.2" />
            <line x1="8" y1="26" x2="68" y2="26" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
            <circle className={styles.coin} cx="30" cy="38" r="11" stroke="currentColor" strokeWidth="1.2" />
            <path d="M30 29 L30 47 M30 29 C26 33 26 43 30 47 M30 29 C34 33 34 43 30 47" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
            <rect className={styles.bar} x="22" y="54" width="10" height="4" fill="currentColor" />
            <rect className={styles.bar} style={{ animationDelay: '0.15s' }} x="34" y="54" width="10" height="4" fill="currentColor" />
            <rect className={styles.bar} style={{ animationDelay: '0.3s' }} x="46" y="54" width="10" height="4" fill="currentColor" />
            <line x1="2" y1="68" x2="98" y2="68" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
            <circle className={styles.dot} cx="84" cy="38" r="3" fill="currentColor" />
        </svg>
    );
}

export default WalletIcon;
