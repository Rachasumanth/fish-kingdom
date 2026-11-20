import { Hono } from 'hono';
import type { PaymentHandlerResponse } from '@devvit/web/server';
import type { Order } from '@devvit/web/shared';
import { SUPPORT_SKU, recordSupport } from '../core/support';

export const payments = new Hono();

payments.post('/fulfill', async (c) => {
  const order = await c.req.json<Order>();
  if (!order.products.some((p) => p.sku === SUPPORT_SKU)) {
    return c.json<PaymentHandlerResponse>({ success: false, reason: 'Unknown product' });
  }
  await recordSupport();
  return c.json<PaymentHandlerResponse>({ success: true });
});
