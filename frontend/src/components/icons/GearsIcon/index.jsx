import React from 'react';
import styles from './style.module.css';

function GearsIcon({ size = 48 }) {
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
            <g className={styles.gearBig}>
                <circle cx="38" cy="40" r="16" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="38" cy="40" r="5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M38 22 L38 28 M38 52 L38 58 M20 40 L26 40 M50 40 L56 40 M25 27 L29 31 M47 49 L51 53 M51 27 L47 31 M29 49 L25 53" stroke="currentColor" strokeWidth="1.2" />
            </g>
            <g className={styles.gearSmall}>
                <circle cx="66" cy="26" r="10" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="66" cy="26" r="3.5" stroke="currentColor" strokeWidth="1" />
                <path d="M66 14 L66 18 M66 34 L66 38 M54 26 L58 26 M74 26 L78 26 M58 16 L60 18 M72 34 L74 36 M74 16 L72 18 M60 34 L58 36" stroke="currentColor" strokeWidth="1.2" />
            </g>
            <line x1="2" y1="66" x2="98" y2="66" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        </svg>
    );
}

export default GearsIcon;
