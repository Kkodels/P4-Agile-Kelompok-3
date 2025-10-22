# P4-Agile-Kelompok-3

## Run & Test

```bash
npm ci
npm run dev:orders   # http://127.0.0.1:5002
npm run dev:notif    # http://127.0.0.1:5003
npm test             # 2 passed, 5 tests
npx spectral lint openapi/api.yaml
