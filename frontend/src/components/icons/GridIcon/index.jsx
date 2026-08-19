import React from 'react';
import styles from './style.module.css';

function GridIcon({ size = 48 }) {
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
            <line x1="2" y1="20" x2="98" y2="20" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
            <line x1="2" y1="40" x2="98" y2="40" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
            <line x1="2" y1="60" x2="98" y2="60" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
            <line x1="50" y1="14" x2="50" y2="66" stroke="currentColor" strokeWidth="1" />
            <rect x="38" y="26" width="24" height="26" stroke="currentColor" strokeWidth="1.2" />
            <line x1="38" y1="32" x2="62" y2="32" stroke="currentColor" strokeWidth="0.6" opacity="0.4" />
            <circle className={styles.dot} cx="50" cy="20" r="3" fill="currentColor" />
            <circle className={styles.dot} cx="50" cy="60" r="3" fill="currentColor" />
        </svg>
    );
}

export default GridIcon;
