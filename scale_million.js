const http = require('http');

const totalRequests = 1000000;
const concurrency = 500;
let activeRequests = 0;
let completed = 0;
let success = 0;
let nextIndex = 0;

console.log(`Starting mega-scale load test: firing ${totalRequests} transactions for CAGE 17ZE9...`);
const startTime = Date.now();

function sendRequest() {
    if (nextIndex >= totalRequests) return;
    nextIndex++;
    activeRequests++;

    const data = JSON.stringify({
        cage_code: "17ZE9",
        tier: "ENTERPRISE",
        txid: "03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a",
        status: "MEGA_SCALE_DISBURSE"
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
            activeRequests--;
            if (res.statusCode === 200) success++;
            
            if (completed % 50000 === 0) {
                const elapsed = (Date.now() - startTime) / 1000;
                console.log(`Progress: ${completed}/${totalRequests} completed. Success: ${success}. Elapsed: ${elapsed.toFixed(1)}s`);
            }

            if (completed === totalRequests) {
                const duration = (Date.now() - startTime) / 1000;
                console.log(`Mega scale test finished in ${duration}s. Success: ${success}/${totalRequests}`);
            } else {
                sendRequest();
            }
        });
    });

    req.on('error', () => {
        completed++;
        activeRequests--;
        if (completed === totalRequests) {
            console.log(`Mega scale test finished with errors. Success: ${success}/${totalRequests}`);
        } else {
            sendRequest();
        }
    });

    req.write(data);
    req.end();
}

for (let i = 0; i < concurrency; i++) {
    sendRequest();
}
