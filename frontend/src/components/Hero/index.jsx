import React from 'react';
import GridIcon from '../icons/GridIcon';
import styles from './style.module.css';

function Hero() {
    return (
        <header className={styles.hero}>
            <div className={styles.titleRow}>
                <GridIcon size={36} />
                <h1>Grid Crypto Analytics</h1>
            </div>
            <p>Historical grid trading simulation and analysis</p>
        </header>
    );
}

export default Hero;
