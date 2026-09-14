const http = require('http');

const totalRequests = 10000;
let completed = 0;
let success = 0;

console.log(`Starting load test: firing ${totalRequests} transactions for CAGE 17ZE9...`);
const startTime = Date.now();

for (let i = 0; i < totalRequests; i++) {
    const data = JSON.stringify({
        cage_code: "17ZE9",
        tier: "ENTERPRISE",
        txid: "03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a",
        status: "LOAD_TEST_DISBURSE"
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
            completed++;
            if (res.statusCode === 200) success++;
            if (completed === totalRequests) {
                const duration = (Date.now() - startTime) / 1000;
                console.log(`Load test finished in ${duration}s. Success: ${success}/${totalRequests}`);
            }
        });
    });

    req.on('error', () => {
        completed++;
        if (completed === totalRequests) {
            console.log(`Load test finished with errors. Success: ${success}/${totalRequests}`);
        }
    });

    req.write(data);
    req.end();
}
