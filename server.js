const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/verify' && req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({
      status: 'SUCCESS',
      cage_code: '17ZE9',
      ledger: 'a677079334594c5cf9ac06153fd1d9f96d49065ff4d5b67e59b3525513345762',
      txid: '03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a',
      tier: 'ENTERPRISE',
      price_per_call: '$0.05',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({ error: 'Endpoint not found. Use GET /verify' }));
  }
});

server.listen(3000, () => {
  console.log('Production monetization server running on port 3000');
});
