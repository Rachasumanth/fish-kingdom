import { Hono } from 'hono';
import type { NotificationStatusResponse, NotificationToggleRequest } from '../../shared/engagement';
import { getNotificationStatus, setNotifications } from '../core/notifications';

export const notificationsRoute = new Hono();

notificationsRoute.get('/status', async (c) => {
  try {
    return c.json<NotificationStatusResponse>(await getNotificationStatus());
  } catch (error) {
    console.error('Notification status error:', error);
    return c.json({ loggedIn: false, optedIn: false }, 500);
  }
});

notificationsRoute.post('/toggle', async (c) => {
  const body = await c.req.json<NotificationToggleRequest>().catch(() => null);
  if (typeof body?.enabled !== 'boolean') {
    return c.json({ status: 'error', message: 'enabled must be a boolean' }, 400);
  }
  try {
    const ok = await setNotifications(body.enabled);
    if (!ok) return c.json({ status: 'error', message: 'Log in to turn on notifications' }, 401);
    return c.json<NotificationStatusResponse>({ loggedIn: true, optedIn: body.enabled });
  } catch (error) {
    console.error('Notification toggle error:', error);
    return c.json({ status: 'error', message: 'Could not update notifications' }, 500);
  }
});
