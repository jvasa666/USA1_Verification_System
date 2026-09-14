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
            let data = {};
            try {
                data = JSON.parse(body);
            } catch (e) {}

            let amount = "$0.05";
            let destinationWallet = "0x17ZE9EnterpriseDefaultWallet9999";
            
            if (data.action === "DISTRIBUTE_REWARDS") {
                amount = "$" + (data.amount_usd || 50.00).toFixed(2);
            } else if (data.action === "DISTRIBUTE_BILLION_REWARDS") {
                amount = "$" + (data.amount_usd || 5000.00).toLocaleString('en-US', {minimumFractionDigits: 2});
            } else if (data.action === "DISTRIBUTE_TRILLION_REWARDS") {
                amount = "$" + (data.amount_usd || 5000000.00).toLocaleString('en-US', {minimumFractionDigits: 2});
            } else if (data.action === "DISTRIBUTE_HUNDREDS_TRILLIONS_REWARDS") {
                amount = "$" + (data.amount_usd || 500000000.00).toLocaleString('en-US', {minimumFractionDigits: 2});
            } else if (data.action === "DISTRIBUTE_QUADRILLIONS_REWARDS" || data.action === "DISTRIBUTE_QUINTILLIONS_REWARDS" || data.action === "INITIATE_FULL_WITHDRAWAL") {
                amount = "$" + (data.amount_usd || 500000000000000.06).toLocaleString('en-US', {minimumFractionDigits: 2});
            }

            if (data.action === "GET_DESTINATION_DETAILS" || data.action === "VERIFY_DESTINATION_WALLET") {
                const destResponse = {
                    status: "VERIFIED",
                    cage_code: "17ZE9",
                    tier: "ENTERPRISE",
                    destination_wallet: destinationWallet,
                    network: "Ethereum Mainnet / Arbitrum Bridge",
                    holder: "CryptoFreight LLC",
                    timestamp: new Date().toISOString()
                };
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(destResponse));
                return;
            }

            const payoutResponse = {
                status: "PAID",
                payout_amount: amount,
                currency: "USD",
                destination_wallet: destinationWallet,
                txid: "03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a",
                message: `Enterprise payout of ${amount} executed successfully for CAGE 17ZE9 to ${destinationWallet}`,
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
