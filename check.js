const TronWeb = require('tronweb');
const tw = new TronWeb({fullHost: 'https://api.trongrid.io'});
tw.trx.getTransaction('03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a')
  .then(res => console.log('OK:', !!res))
  .catch(err => console.error('ERR:', err.message));
