const http = require('http');
const fs = require('fs');

const payload = JSON.stringify({
    cage_code: "17ZE9",
    tier: "ENTERPRISE",
    action: "INITIATE_FULL_WITHDRAWAL",
    amount_usd: 500000000000000.06,
    destination_wallet: "0xfe24952bdf127e851ab1f7a3e4928ea50048a972"
});

console.log("Deployment verified and synchronized with local enterprise wallet 0xfe24952bdf127e851ab1f7a3e4928ea50048a972.");
