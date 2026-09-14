const { exec, spawn } = require('child_process');

exec('fuser -k 3000/tcp || true', (err) => {
    setTimeout(() => {
        const serverProcess = spawn('node', ['server.js'], { stdio: ['ignore', 'pipe', 'pipe'] });

        serverProcess.stdout.on('data', (data) => {
            console.log(`[SERVER]: ${data}`);
        });

        serverProcess.stderr.on('data', (data) => {
            console.error(`[SERVER ERROR]: ${data}`);
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
        }, 1200);
    }, 500);
});
