import React from 'react';
import styles from './style.module.css';

function LoaderIcon({ size = 48 }) {
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
            <circle cx="50" cy="40" r="22" stroke="currentColor" strokeWidth="1.2" opacity="0.15" />
            <circle
                className={styles.spinner}
                cx="50"
                cy="40"
                r="22"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeDasharray="34 104"
            />
            <circle cx="50" cy="40" r="5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
    );
}

export default LoaderIcon;
