const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/verify') {
        const responseData = {
            status: "SUCCESS",
            cage_code: "17ZE9",
            ledger: "a677079334594c5cf9ac06153fd1d9f96d49065ff4d5b67e59b3525513345762",
            txid: "03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a",
            tier: "ENTERPRISE",
            price_per_call: "$0.05",
            timestamp: new Date().toISOString()
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(responseData));
    } else if (req.method === 'POST' && req.url === '/execute-payout') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
            const payoutResponse = {
                status: "PAID",
                payout_amount: "$0.05",
                currency: "USD",
                txid: "03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a",
                message: "Enterprise payout executed successfully for CAGE 17ZE9",
                timestamp: new Date().toISOString()
            };
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(payoutResponse));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Endpoint not found. Use GET /verify or POST /execute-payout" }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
