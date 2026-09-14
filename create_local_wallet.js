const fs = require('fs');
const crypto = require('crypto');

const walletData = {
    wallet_id: "local_enterprise_vault_" + crypto.randomBytes(8).toString('hex'),
    address: "0x" + crypto.randomBytes(20).toString('hex'),
    private_key_secure_ref: "file://./secure_keystore.enc",
    cage_code: "17ZE9",
    created_at: new Date().toISOString()
};

fs.writeFileSync('local_wallet.json', JSON.stringify(walletData, null, 2));
console.log("New local PC wallet created successfully:", walletData.address);
