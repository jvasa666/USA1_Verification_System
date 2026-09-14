const http = require('http');
const payload = JSON.stringify({
    cage_code: "17ZE9",
    tier: "ENTERPRISE",
    status: "SETTLED",
    txid: "03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a",
    final_action: "DISBURSE_TO_LOCAL_WALLET"
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
    let rawData = '';
    res.on('data', chunk => rawData += chunk);
    res.on('end', () => {
        console.log("TRANSACTION COMPLETE:", rawData);
    });
});

req.on('error', err => console.error("Error:", err.message));
req.write(payload);
req.end();
