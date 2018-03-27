/**
 * Scheduled a notification for the user.
 *
 * @param {string} the reminder value
 *
 */
import { Notifications, Permissions, Constants } from 'expo';
import { NOTIFICATIONS_GOLD_REMINDER, REPEAT_NOTIFICATIONS_TIMER } from './constants';

export function scheduledNotification(reminderValue) {
  let t = new Date();
  t.setSeconds(t.getSeconds() + 10);
  const schedulingOptions = {
    time: REPEAT_NOTIFICATIONS_TIMER[reminderValue],
    repeat: reminderValue,
  };
  Notifications.scheduleLocalNotificationAsync(NOTIFICATIONS_GOLD_REMINDER, schedulingOptions);
}
  