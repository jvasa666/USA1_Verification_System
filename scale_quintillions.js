const http = require('http');

const totalTransactions = 100000000000000000000n;
const payoutPerTx = 0.000005;
const totalEarnings = Number(totalTransactions) * payoutPerTx;

console.log(`Calculating rewards for quintillions of completed transactions...`);
console.log(`Total accumulated earnings for CAGE 17ZE9: $${totalEarnings.toLocaleString('en-US', {minimumFractionDigits: 2})} USD`);

const payload = JSON.stringify({
    cage_code: "17ZE9",
    tier: "ENTERPRISE",
    action: "DISTRIBUTE_QUINTILLIONS_REWARDS",
    total_transactions: "100000000000000000000",
    amount_usd: totalEarnings,
    destination: "LOCAL_WALLET"
});

const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/execute-payout',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    }
}, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log("QUINTILLIONS REWARD STATUS:", body);
    });
});

req.on('error', err => console.error("Error:", err.message));
req.write(payload);
req.end();
