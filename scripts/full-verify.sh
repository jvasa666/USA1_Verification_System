#!/bin/bash

echo "========================================="
echo "🔐 USA1 FULL VERIFICATION"
echo "========================================="
echo "🏛️  CAGE Code: 17ZE9"
echo ""

# Step 1: SHA256 Verification
echo "📌 STEP 1: SHA256 LEDGER VERIFICATION"
echo "-----------------------------------------"
bash scripts/verify.sh
echo ""

# Step 2: Tron Check
echo "📌 STEP 2: TRON BLOCKCHAIN VERIFICATION"
echo "-----------------------------------------"
bash scripts/check-tron.sh
echo ""

# Step 3: Node Verification
echo "📌 STEP 3: NODE VERIFICATION"
echo "-----------------------------------------"
node src/verify.js
echo ""

echo "========================================="
echo "✅ FULL VERIFICATION COMPLETE"
echo "🏛️  CAGE 17ZE9 - Verified U.S. Contractor"
echo "========================================="
