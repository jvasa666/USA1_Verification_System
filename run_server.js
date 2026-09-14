const { exec } = require('child_process');
const serverProcess = exec('node server.js', (err, stdout, stderr) => {
    if (err) {
        console.error(`Error: ${err.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);
});

setTimeout(() => {
    const http = require('http');
    const payload = JSON.stringify({
        cage_code: "17ZE9",
        tier: "ENTERPRISE",
        action: "INITIATE_FULL_WITHDRAWAL",
        amount_usd: 500000000000000.06,
        destination_wallet: "0xfe24952bdf127e851ab1f7a3e4928ea50048a972"
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
            console.log("FINAL LIVE WITHDRAWAL TEST:", body);
            serverProcess.kill();
        });
    });

    req.on('error', err => {
        console.error("Request error:", err.message);
        serverProcess.kill();
    });
    req.write(payload);
    req.end();
}, 1000);
