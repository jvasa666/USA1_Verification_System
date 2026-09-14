const http = require('http');
http.get('http://localhost:3000/verify', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const response = JSON.parse(data);
        console.log(`[PAID] CAGE: ${response.cage_code} | Tier: ${response.tier} | Payout Rate: ${response.price_per_call} | TXID: ${response.txid}`);
    });
}).on('error', err => console.error('Error:', err.message));
