const http = require('http');
const data = JSON.stringify({
    cage_code: "17ZE9",
    tier: "ENTERPRISE",
    txid: "03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a",
    status: "DISBURSE_FUNDS"
});

const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/execute-payout',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
}, res => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
        console.log("PAYOUT CONFIRMED:", body);
    });
});

req.on('error', error => console.error("Error:", error.message));
req.write(data);
req.end();
