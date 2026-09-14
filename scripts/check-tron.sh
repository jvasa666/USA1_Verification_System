#!/bin/bash

echo "========================================="
echo "📡 TRON CONTRACT CHECK"
echo "========================================="
echo "🏛️  CAGE Code: 17ZE9"
echo ""

TXID="03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a"

echo "📊 Transaction: $TXID"
echo ""
echo "🔍 Checking Tron network..."

curl -s -X POST https://api.trongrid.io/wallet/gettransactionbyid \
  -d "{\"value\": \"$TXID\"}" | grep -q '"contractRet":"SUCCESS"'

if [ $? -eq 0 ]; then
    echo "✅ ✅ ✅ CONTRACT VERIFIED ON TRON!"
    echo "🔗 https://tronscan.org/#/transaction/$TXID"
else
    echo "⚠️  Transaction not found or pending"
fi

echo ""
echo "========================================="
echo "🏛️  CAGE 17ZE9 - Verified U.S. Contractor"
echo "========================================="
