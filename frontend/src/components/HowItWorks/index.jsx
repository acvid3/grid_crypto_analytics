import React from 'react';
import GearsIcon from '../icons/GearsIcon';
import styles from './style.module.css';

function HowItWorks() {
    return (
        <section className={styles.howItWorks}>
            <div className={styles.headerRow}>
                <GearsIcon size={28} />
                <h2>How It Works</h2>
            </div>

            <p className={styles.intro}>
                Grid trading strategy backtester using historical Binance data.
                Simulates buying crypto when the price drops by a set threshold
                from the peak, and selling when it rises by the same threshold.
            </p>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>Buy Logic</h3>
                    <ul>
                        <li>Tracks <code>max_price</code> — highest price since the last completed cycle</li>
                        <li>Buy triggers when price drops by <code>threshold_percent</code> from <code>max_price</code></li>
                        <li>Each level is bought only once</li>
                        <li>At 5% threshold, up to 19 purchases (levels 5%–95% from peak)</li>
                        <li>Grid resets when all positions are closed</li>
                    </ul>
                </div>

                <div className={styles.card}>
                    <h3>Sell Logic</h3>
                    <ul>
                        <li>Each buy creates a sell order at <code>buy_price × (1 + threshold)</code></li>
                        <li>On trigger, the profit is realized</li>
                    </ul>
                </div>

                <div className={styles.card}>
                    <h3>Tech Stack</h3>
                    <ul>
                        <li>Backend: Python, FastAPI, aiohttp (async Binance API requests)</li>
                        <li>Frontend: React, Vite, Recharts</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
