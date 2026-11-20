export type NotificationStatusResponse = {
  loggedIn: boolean;
  optedIn: boolean;
};

export type NotificationToggleRequest = {
  enabled: boolean;
};
