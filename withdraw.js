const http = require('http');
const data = JSON.stringify({
    cage_code: "17ZE9",
    tier: "ENTERPRISE",
    action: "WITHDRAW_FUNDS",
    destination: "LOCAL_WALLET"
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
        console.log("WITHDRAWAL STATUS:", body);
    });
});

req.on('error', error => console.error("Error:", error.message));
req.write(data);
req.end();
