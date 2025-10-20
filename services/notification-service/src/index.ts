import express from 'express';
import rateLimit from 'express-rate-limit';
import { httpLogger, correlationId, requireBearer } from '../../../utils';

const app = express();
app.use(httpLogger);
app.use(correlationId);
app.use(rateLimit({ windowMs: 60_000, max: 120 }));

app.get('/notifications', requireBearer, (req, res) => {
  const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 10));
  const data = Array.from({ length: Math.min(1, limit) }).map((_, i) => ({
    type: 'ORDER_CREATED',
    message: 'Order created successfully',
    createdAt: new Date().toISOString(),
  }));

  res.status(200).json({
    data,
    total: data.length,
  });
});

export default app;