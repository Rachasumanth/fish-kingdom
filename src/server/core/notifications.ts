import { notifications } from '@devvit/notifications';
import { reddit } from '@devvit/web/server';
import type { NotificationStatusResponse } from '../../shared/engagement';

export const getNotificationStatus = async (): Promise<NotificationStatusResponse> => {
  const user = await reddit.getCurrentUser();
  if (!user) return { loggedIn: false, optedIn: false };
  const optedIn = await notifications.isOptedIn(user.id);
  return { loggedIn: true, optedIn };
};

export const setNotifications = async (enabled: boolean): Promise<boolean> => {
  const user = await reddit.getCurrentUser();
  if (!user) return false;
  if (enabled) {
    await notifications.optInCurrentUser();
  } else {
    await notifications.optOutCurrentUser();
  }
  return true;
};
