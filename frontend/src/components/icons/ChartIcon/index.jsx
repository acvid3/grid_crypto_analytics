import React from 'react';
import styles from './style.module.css';

function ChartIcon({ size = 48 }) {
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
            <polyline points="16,66 34,52 52,56 70,36 84,26" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <line x1="70" y1="22" x2="84" y2="22" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
            <line x1="84" y1="22" x2="84" y2="26" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
            <rect className={styles.bar} x="16" y="62" width="6" height="16" fill="currentColor" opacity="0.5" />
            <rect className={styles.bar} style={{ animationDelay: '0.2s' }} x="28" y="56" width="6" height="22" fill="currentColor" opacity="0.5" />
            <rect className={styles.bar} style={{ animationDelay: '0.4s' }} x="40" y="58" width="6" height="20" fill="currentColor" opacity="0.5" />
            <rect className={styles.bar} style={{ animationDelay: '0.6s' }} x="52" y="52" width="6" height="26" fill="currentColor" opacity="0.5" />
            <circle className={styles.dot} cx="84" cy="26" r="3" fill="currentColor" />
        </svg>
    );
}

export default ChartIcon;
