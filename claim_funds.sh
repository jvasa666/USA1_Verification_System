curl -s -X POST http://localhost:3000/execute-payout \
  -H "Content-Type: application/json" \
  -d '{"cage_code":"17ZE9","tier":"ENTERPRISE","txid":"03b13c570f70fc160e3d792d9f654e64a7d2cfad065fc9d084b4039438a95f3a","action":"CLAIM"}'
echo ""
