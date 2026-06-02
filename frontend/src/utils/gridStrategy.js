export function executeStrategy(params, historyList) {
    let balance = params.initial_balance;
    let ethBalance = 0;
    const pendingSells = [];
    let orderCounter = 1;
    const trades = [];

    let maxPrice = historyList[0].close;
    const filledLevels = new Set();
    let minBalance = balance;
    let totalProfit = 0;
    let totalTrades = 0;

    for (const row of historyList) {
        const price = row.close;
        const timestamp = row.timestamp;

        if (price > maxPrice) {
            maxPrice = price;
        }

        if (balance < minBalance) {
            minBalance = balance;
        }

        if (balance >= params.trade_amount) {
            const level = Math.floor((maxPrice - price) / (maxPrice * params.threshold_percent));
            const maxLevels = Math.floor(100 / params.threshold_percent);

            if (level > 0 && level < maxLevels && !filledLevels.has(level)) {
                const levelPrice = maxPrice * (1 - level * params.threshold_percent);

                if (price <= levelPrice) {
                    const buyRecord = executeBuyOrder(params, price, timestamp, orderCounter, balance, ethBalance);
                    trades.push(buyRecord);

                    const sellTask = createSellTask(
                        orderCounter, price, params.threshold_percent,
                        buyRecord.eth_amount, params.trade_amount, timestamp
                    );
                    pendingSells.push(sellTask);

                    const commission = params.trade_amount * params.commission_rate;
                    const ethAmount = (params.trade_amount - commission) / price;
                    balance -= params.trade_amount;
                    ethBalance += ethAmount;
                    filledLevels.add(level);
                    orderCounter++;
                }
            }
        }

        if (pendingSells.length > 0) {
            for (let i = pendingSells.length - 1; i >= 0; i--) {
                const task = pendingSells[i];
                if (price >= task.target_price) {
                    const sellRecord = executeSellOrder(params, price, timestamp, orderCounter, task, balance, ethBalance);
                    trades.push(sellRecord);

                    const ethToSell = task.eth_amount;
                    const grossUsdt = ethToSell * price;
                    const commission = grossUsdt * params.commission_rate;
                    const netUsdt = grossUsdt - commission;

                    const invested = task.cost_usdt;
                    const profit = netUsdt - invested;
                    totalProfit += profit;
                    totalTrades++;

                    balance += netUsdt;
                    ethBalance -= ethToSell;
                    orderCounter++;
                    pendingSells.splice(i, 1);
                }
            }
        }

        if (pendingSells.length === 0) {
            maxPrice = Math.max(maxPrice, price);
            filledLevels.clear();
        }
    }

    const summary = createSummary(params, balance, ethBalance, historyList, totalProfit, totalTrades, minBalance, pendingSells, maxPrice, filledLevels);
    const chartData = createChartData(trades);

    return { trades, summary, chartData };
}

function executeBuyOrder(params, price, timestamp, orderCounter, balance, ethBalance) {
    const commission = params.trade_amount * params.commission_rate;
    const ethAmount = (params.trade_amount - commission) / price;

    return {
        order_id: `BUY_${String(orderCounter).padStart(4, '0')}`,
        order_type: "BUY",
        date_time: new Date(timestamp / 1000).toISOString().replace('T', ' ').substring(0, 19),
        price: price,
        eth_amount: ethAmount,
        usdt_amount: params.trade_amount,
        commission: commission,
        balance_after: balance - params.trade_amount,
        eth_balance_after: ethBalance + ethAmount,
        level_price: price,
        related_order_id: null,
        status: "OPEN",
        profit: null,
    };
}

function createSellTask(orderCounter, buyPrice, thresholdPercent, ethAmount, costUsdt, timestamp) {
    return {
        task_id: `TASK_${String(orderCounter).padStart(4, '0')}`,
        buy_id: `BUY_${String(orderCounter).padStart(4, '0')}`,
        buy_price: buyPrice,
        target_price: buyPrice * (1 + thresholdPercent),
        eth_amount: ethAmount,
        cost_usdt: costUsdt,
        buy_timestamp: timestamp,
    };
}

function executeSellOrder(params, price, timestamp, orderCounter, task, balance, ethBalance) {
    const ethToSell = task.eth_amount;
    const grossUsdt = ethToSell * price;
    const commission = grossUsdt * params.commission_rate;
    const netUsdt = grossUsdt - commission;
    const invested = task.cost_usdt;
    const profit = netUsdt - invested;

    return {
        order_id: `SELL_${String(orderCounter).padStart(4, '0')}`,
        order_type: "SELL",
        date_time: new Date(timestamp / 1000).toISOString().replace('T', ' ').substring(0, 19),
        price: price,
        eth_amount: -ethToSell,
        usdt_amount: netUsdt,
        commission: commission,
        balance_after: balance + netUsdt,
        eth_balance_after: ethBalance - ethToSell,
        level_price: task.buy_price,
        related_order_id: task.buy_id,
        status: "CLOSED",
        profit: profit,
    };
}

function createSummary(params, balance, ethBalance, historyList, totalProfit, totalTrades, minBalance, pendingSells, maxPrice, filledLevels) {
    const lastPrice = historyList[historyList.length - 1].close;
    const finalBalance = balance + (ethBalance * lastPrice);

    return {
        initial_balance: params.initial_balance,
        final_balance: finalBalance,
        total_profit: totalProfit,
        total_trades: totalTrades,
        min_balance: minBalance,
        roi_percent: (finalBalance - params.initial_balance) / params.initial_balance * 100,
        pending_positions: pendingSells.length,
        max_price: maxPrice,
        filled_levels: Array.from(filledLevels).sort((a, b) => a - b),
        total_levels: Math.floor(100 / params.threshold_percent),
    };
}

function createChartData(trades) {
    return {
        dates: trades.map(t => t.date_time),
        prices: trades.map(t => t.price),
        balances: trades.map(t => t.balance_after),
        profits: trades.map(t => t.profit || 0),
    };
}
