import React from 'react';
import styles from './style.module.css';

function SearchIcon({ size = 48 }) {
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
            <circle cx="42" cy="34" r="18" stroke="currentColor" strokeWidth="1.2" />
            <line x1="55" y1="47" x2="70" y2="62" stroke="currentColor" strokeWidth="1.2" />
            <line x1="70" y1="62" x2="70" y2="62" stroke="currentColor" strokeWidth="1.2" opacity="0" />
            <line x1="2" y1="2" x2="98" y2="78" stroke="currentColor" strokeWidth="0.3" opacity="0.15" strokeDasharray="3 5" />
        </svg>
    );
}

export default SearchIcon;
