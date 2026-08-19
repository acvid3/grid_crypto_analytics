import React, { useState } from 'react';
import InvestmentForm from './components/InvestmentForm';
import AnalysisResults from './components/AnalysisResults';
import CurrencySelector from './components/CurrencySelector';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import { apiUrl } from './apiBase';
import { fetchHistoricalData } from './utils/binanceData';
import { executeStrategy } from './utils/gridStrategy';
import './index.css';

function App() {
    const [analysisData, setAnalysisData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedSymbol, setSelectedSymbol] = useState('ETHUSDT');

    const handleAnalysis = async (formData) => {
        setLoading(true);
        setError(null);

        try {
            try {
                const url = apiUrl('analyze');
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                setAnalysisData(data);
                return;
            } catch (err) {
                console.log('Backend unavailable, running local analysis');
            }

            const endTime = new Date(formData.end_date).getTime();
            const startTime = new Date(formData.start_date).getTime();

            const historyList = await fetchHistoricalData(
                formData.symbol,
                formData.interval,
                startTime,
                endTime
            );

            if (!historyList || historyList.length === 0) {
                throw new Error('No historical data available');
            }

            const result = executeStrategy(formData, historyList);
            setAnalysisData(result);
        } catch (err) {
            setError(err.message);
            console.error('Analysis error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSymbolChange = (symbol) => {
        setSelectedSymbol(symbol);
    };

    return (
        <div className="app">
            <CurrencySelector 
                onSymbolChange={handleSymbolChange}
                selectedSymbol={selectedSymbol}
            />
            
            <div className="app-content">
                <Hero />
                <HowItWorks />
                
                <main className="app-main">
                    <InvestmentForm 
                        onSubmit={handleAnalysis} 
                        loading={loading}
                        selectedSymbol={selectedSymbol}
                    />
                    
                    {error && (
                        <div className="error-message">
                            <h3>Analysis Error:</h3>
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {analysisData && (
                        <AnalysisResults data={analysisData} />
                    )}
                </main>
            </div>
        </div>
    );
}

export default App;
