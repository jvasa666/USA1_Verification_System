const http = require('http');
const fs = require('fs');

let walletAddress = "0xfe24952bdf127e851ab1f7a3e4928ea50048a972";
if (fs.existsSync('local_wallet.json')) {
    try {
        const w = JSON.parse(fs.readFileSync('local_wallet.json', 'utf8'));
        if (w.address) walletAddress = w.address;
    } catch (e) {}
}

const payload = JSON.stringify({
    cage_code: "17ZE9",
    tier: "ENTERPRISE",
    action: "INITIATE_FULL_WITHDRAWAL",
    amount_usd: 500000000000000.06,
    destination_wallet: walletAddress
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
        console.log("WITHDRAWAL STATUS:", body);
    });
});

req.on('error', err => console.error("Error:", err.message));
req.write(payload);
req.end();
