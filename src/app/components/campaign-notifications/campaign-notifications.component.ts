import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-campaign-notifications',
  templateUrl: './campaign-notifications.component.html',
  styleUrls: ['./campaign-notifications.component.scss']
})
export class CampaignNotificationsComponent implements OnInit {
  liveNotifications = [
    {
      id: 1,
      title: 'Summer Sale Campaign',
      message: 'Campaign starting at 3:25 PM',
      type: 'starting',
      time: '2 min',
      status: 'info',
      icon: 'pi-clock'
    },
    {
      id: 2,
      title: 'Welcome Series',
      message: 'Campaign has just started execution',
      type: 'executing',
      time: 'Now',
      status: 'success',
      icon: 'pi-play'
    },
    {
      id: 3,
      title: 'Product Launch',
      message: 'High engagement detected - 23% above average',
      type: 'performing',
      time: '5 min',
      status: 'success',
      icon: 'pi-chart-line'
    },
    {
      id: 4,
      title: 'Promo Email',
      message: 'Low delivery rate detected - needs attention',
      type: 'warning',
      time: '12 min',
      status: 'warning',
      icon: 'pi-exclamation-triangle'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  dismissNotification(notificationId: number): void {
    this.liveNotifications = this.liveNotifications.filter(n => n.id !== notificationId);
  }

  viewCampaignDetails(notification: any): void {
    console.log('Viewing campaign details for:', notification.title);
  }

  getNotificationClass(status: string): string {
    const statusClasses = {
      'info': 'bg-blue-50 border-blue-200 text-blue-900',
      'success': 'bg-green-50 border-green-200 text-green-900',
      'warning': 'bg-orange-50 border-orange-200 text-orange-900',
      'error': 'bg-red-50 border-red-200 text-red-900'
    };
    return statusClasses[status as keyof typeof statusClasses] || statusClasses.info;
  }

  getIconClass(status: string): string {
    const iconClasses = {
      'info': 'text-blue-600',
      'success': 'text-green-600',
      'warning': 'text-orange-600',
      'error': 'text-red-600'
    };
    return iconClasses[status as keyof typeof iconClasses] || iconClasses.info;
  }
}