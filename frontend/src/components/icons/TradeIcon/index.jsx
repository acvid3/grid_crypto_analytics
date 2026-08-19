import React from 'react';
import styles from './style.module.css';

function TradeIcon({ size = 48 }) {
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
            <path d="M24 20 L60 20 L60 14 L72 26 L60 38 L60 32 L18 32 L18 20 L24 20" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path d="M76 60 L40 60 L40 54 L28 66 L40 78 L40 72 L82 72 L82 60 L76 60" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <circle className={styles.dot} cx="24" cy="20" r="3" fill="currentColor" />
            <circle className={styles.dot} cx="76" cy="60" r="3" fill="currentColor" />
            <line x1="2" y1="40" x2="98" y2="40" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        </svg>
    );
}

export default TradeIcon;
