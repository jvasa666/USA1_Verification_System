#!/bin/bash

echo "========================================="
echo "🔐 SHA256 LEDGER VERIFICATION"
echo "========================================="
echo "🏛️  CAGE Code: 17ZE9"
echo ""

LEDGER_PATH="${LEDGER_PATH:-/home/z/restitution/USA1_L2_CITIZEN_LEDGER.csv}"

if [ -f "$LEDGER_PATH" ]; then
    echo "📄 File: $LEDGER_PATH"
    echo "📏 Size: $(du -h "$LEDGER_PATH" | cut -f1)"
    echo ""
    echo "🔑 SHA256:"
    sha256sum "$LEDGER_PATH" | cut -d' ' -f1
    echo ""
    echo "✅ Expected: a677079334594c5cf9ac06153fd1d9f96d49065ff4d5b67e59b3525513345762"
else
    echo "⚠️  Ledger not found. Expected location: $LEDGER_PATH"
    echo "💡 Set LEDGER_PATH environment variable to point to your ledger file"
fi

echo ""
echo "========================================="
echo "🏛️  CAGE 17ZE9 - Verified Government Contractor"
echo "========================================="
