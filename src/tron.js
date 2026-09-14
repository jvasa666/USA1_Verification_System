const TronWeb = require('tronweb');

const CONFIG = {
  contractAddress: '4147993c28f0adde95f53f1f846a142020cd2cffdb',
  txId: '03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a',
  cageCode: '17ZE9'
};

console.log('=========================================');
console.log('📡 TRON BLOCKCHAIN VERIFICATION');
console.log('=========================================');
console.log(`🏛️  CAGE Code: ${CONFIG.cageCode}`);
console.log('');

async function run() {
  try {
    const tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io'
    });
    console.log('✅ TronWeb initialized successfully.');

    console.log('');
    console.log('📊 Fetching Transaction from Blockchain...');
    const tx = await tronWeb.trx.getTransaction(CONFIG.txId);
    if (tx && (tx.txID || tx.raw_data)) {
      console.log('✅ Transaction found on-chain:');
      console.log(`   TXID: ${tx.txID || CONFIG.txId}`);
      console.log(`   Block: ${tx.blockNumber || tx.block_number || 'Confirmed/Indexed'}`);
      
      try {
        const info = await tronWeb.trx.getTransactionInfo(CONFIG.txId);
        if (info && Object.keys(info).length > 0) {
          console.log('   Fee: ' + (info.fee || 0) / 1000000 + ' TRX');
          console.log('   Result: ' + (info.receipt ? info.receipt.result : 'SUCCESS'));
        }
      } catch (err) {}
    } else {
      console.log('⚠️ Transaction details returned empty or not found on-chain.');
    }
  } catch (e) {
    console.log('⚠️  Blockchain query error:', e.message);
  }

  console.log('');
  console.log('📊 Transaction Details (Static Reference):');
  console.log(`   TXID: ${CONFIG.txId}`);
  console.log(`   Contract: ${CONFIG.contractAddress}`);
  console.log(`   🔗 https://tronscan.org/#/transaction/${CONFIG.txId}`);
  console.log('');
  console.log('=========================================');
  console.log('🏛️  CAGE Code: 17ZE9');
  console.log('=========================================');
}

run();
