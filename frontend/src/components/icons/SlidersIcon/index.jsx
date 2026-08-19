import React from 'react';
import styles from './style.module.css';

function SlidersIcon({ size = 48 }) {
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
            <line x1="24" y1="14" x2="24" y2="30" stroke="currentColor" strokeWidth="0.8" />
            <circle className={styles.knob} cx="24" cy="30" r="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="24" y1="40" x2="24" y2="66" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
            <line x1="50" y1="14" x2="50" y2="46" stroke="currentColor" strokeWidth="0.8" />
            <circle className={styles.knob} cx="50" cy="46" r="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="50" y1="56" x2="50" y2="66" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
            <line x1="76" y1="14" x2="76" y2="22" stroke="currentColor" strokeWidth="0.8" />
            <circle className={styles.knob} cx="76" cy="22" r="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1="76" y1="32" x2="76" y2="66" stroke="currentColor" strokeWidth="0.3" opacity="0.15" />
        </svg>
    );
}

export default SlidersIcon;
