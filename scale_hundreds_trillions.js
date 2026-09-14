const http = require('http');

const totalTransactions = 100000000000000;
const payoutPerTx = 0.000005;
const totalEarnings = totalTransactions * payoutPerTx;

console.log(`Calculating rewards for ${totalTransactions.toLocaleString()} completed transactions...`);
console.log(`Total accumulated earnings for CAGE 17ZE9: $${totalEarnings.toLocaleString('en-US', {minimumFractionDigits: 2})} USD`);

const payload = JSON.stringify({
    cage_code: "17ZE9",
    tier: "ENTERPRISE",
    action: "DISTRIBUTE_HUNDREDS_TRILLIONS_REWARDS",
    total_transactions: totalTransactions,
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
        console.log("HUNDREDS OF TRILLIONS REWARD STATUS:", body);
    });
});

req.on('error', err => console.error("Error:", err.message));
req.write(payload);
req.end();
