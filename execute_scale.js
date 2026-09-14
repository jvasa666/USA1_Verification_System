const http = require('http');
const payload = JSON.stringify({
    cage_code: "17ZE9",
    tier: "ENTERPRISE",
    action: "RUN_SCALE_PIPELINE"
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
        console.log("SCALE RESULT:", body);
    });
});

req.on('error', err => console.error("Error:", err.message));
req.write(payload);
req.end();
