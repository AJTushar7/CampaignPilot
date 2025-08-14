import { Component, OnInit } from '@angular/core';

interface MessageStatus {
  id: string;
  campaignName: string;
  channel: 'SMS' | 'WhatsApp' | 'Email' | 'Push' | 'RCS';
  status: 'sent' | 'delivered' | 'read' | 'clicked' | 'failed';
  timestamp: Date;
  customerSegment: string;
  messageContent: string;
  statusHistory: StatusEvent[];
}

interface StatusEvent {
  status: string;
  timestamp: Date;
  details?: string;
}

@Component({
  selector: 'app-message-status-tracker',
  templateUrl: './message-status-tracker.component.html',
  styleUrls: ['./message-status-tracker.component.scss']
})
export class MessageStatusTrackerComponent implements OnInit {
  recentMessages: MessageStatus[] = [];
  selectedChannel = 'all';
  selectedStatus = 'all';
  
  channelOptions = [
    { label: 'All Channels', value: 'all' },
    { label: 'SMS', value: 'SMS' },
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'Email', value: 'Email' },
    { label: 'Push', value: 'Push' },
    { label: 'RCS', value: 'RCS' }
  ];

  statusOptions = [
    { label: 'All Status', value: 'all' },
    { label: 'Sent', value: 'sent' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Read', value: 'read' },
    { label: 'Clicked', value: 'clicked' },
    { label: 'Failed', value: 'failed' }
  ];

  statusStats = {
    sent: 2847,
    delivered: 2720,
    read: 1980,
    clicked: 456,
    failed: 127
  };

  ngOnInit(): void {
    this.loadRecentMessages();
    this.startRealTimeUpdates();
  }

  loadRecentMessages(): void {
    this.recentMessages = [
      {
        id: 'msg_001',
        campaignName: 'Festival Flash Sale',
        channel: 'WhatsApp',
        status: 'read',
        timestamp: new Date(Date.now() - 2 * 60000),
        customerSegment: 'Premium Users',
        messageContent: '🎉 Exclusive 50% off on premium products! Valid for 24hrs only...',
        statusHistory: [
          { status: 'sent', timestamp: new Date(Date.now() - 5 * 60000) },
          { status: 'delivered', timestamp: new Date(Date.now() - 4 * 60000) },
          { status: 'read', timestamp: new Date(Date.now() - 2 * 60000) }
        ]
      },
      {
        id: 'msg_002',
        campaignName: 'Order Confirmation',
        channel: 'SMS',
        status: 'delivered',
        timestamp: new Date(Date.now() - 5 * 60000),
        customerSegment: 'Recent Buyers',
        messageContent: 'Your order #12345 has been confirmed. Expected delivery: Tomorrow...',
        statusHistory: [
          { status: 'sent', timestamp: new Date(Date.now() - 6 * 60000) },
          { status: 'delivered', timestamp: new Date(Date.now() - 5 * 60000) }
        ]
      },
      {
        id: 'msg_003',
        campaignName: 'Weekly Newsletter',
        channel: 'Email',
        status: 'clicked',
        timestamp: new Date(Date.now() - 8 * 60000),
        customerSegment: 'Subscribers',
        messageContent: 'This Week in Tech: AI Breakthrough, New Product Launches...',
        statusHistory: [
          { status: 'sent', timestamp: new Date(Date.now() - 10 * 60000) },
          { status: 'delivered', timestamp: new Date(Date.now() - 9 * 60000) },
          { status: 'read', timestamp: new Date(Date.now() - 8 * 60000) },
          { status: 'clicked', timestamp: new Date(Date.now() - 8 * 60000) }
        ]
      },
      {
        id: 'msg_004',
        campaignName: 'App Update Notification',
        channel: 'Push',
        status: 'failed',
        timestamp: new Date(Date.now() - 12 * 60000),
        customerSegment: 'Mobile Users',
        messageContent: 'New app version available with exciting features!',
        statusHistory: [
          { status: 'sent', timestamp: new Date(Date.now() - 12 * 60000) },
          { status: 'failed', timestamp: new Date(Date.now() - 12 * 60000), details: 'Device not reachable' }
        ]
      },
      {
        id: 'msg_005',
        campaignName: 'Banking Alert',
        channel: 'RCS',
        status: 'read',
        timestamp: new Date(Date.now() - 15 * 60000),
        customerSegment: 'Account Holders',
        messageContent: 'Transaction alert: ₹5,000 debited from your account ending in 1234',
        statusHistory: [
          { status: 'sent', timestamp: new Date(Date.now() - 16 * 60000) },
          { status: 'delivered', timestamp: new Date(Date.now() - 15 * 60000) },
          { status: 'read', timestamp: new Date(Date.now() - 15 * 60000) }
        ]
      }
    ];
  }

  startRealTimeUpdates(): void {
    // Simulate real-time updates every 30 seconds
    setInterval(() => {
      this.simulateNewMessage();
    }, 30000);
  }

  simulateNewMessage(): void {
    const channels = ['WhatsApp', 'SMS', 'Email', 'Push', 'RCS'];
    const statuses = ['sent', 'delivered', 'read', 'clicked'];
    const campaigns = ['Flash Sale', 'Order Update', 'Newsletter', 'Reminder', 'Alert'];
    
    const newMessage: MessageStatus = {
      id: `msg_${Date.now()}`,
      campaignName: campaigns[Math.floor(Math.random() * campaigns.length)],
      channel: channels[Math.floor(Math.random() * channels.length)] as any,
      status: statuses[Math.floor(Math.random() * statuses.length)] as any,
      timestamp: new Date(),
      customerSegment: 'Live Users',
      messageContent: 'Real-time message simulation...',
      statusHistory: [
        { status: 'sent', timestamp: new Date() }
      ]
    };

    this.recentMessages.unshift(newMessage);
    if (this.recentMessages.length > 20) {
      this.recentMessages.pop();
    }
  }

  getStatusIcon(status: string): string {
    const icons = {
      sent: 'pi-send',
      delivered: 'pi-check',
      read: 'pi-eye',
      clicked: 'pi-external-link',
      failed: 'pi-times-circle'
    };
    return icons[status] || 'pi-circle';
  }

  getStatusClass(status: string): string {
    const classes = {
      sent: 'status-sent',
      delivered: 'status-delivered',
      read: 'status-read',
      clicked: 'status-clicked',
      failed: 'status-failed'
    };
    return classes[status] || 'status-default';
  }

  getChannelIcon(channel: string): string {
    const icons = {
      WhatsApp: 'pi-whatsapp',
      SMS: 'pi-mobile',
      Email: 'pi-envelope',
      Push: 'pi-bell',
      RCS: 'pi-comments'
    };
    return icons[channel] || 'pi-circle';
  }

  getFilteredMessages(): MessageStatus[] {
    return this.recentMessages.filter(message => {
      const channelMatch = this.selectedChannel === 'all' || message.channel === this.selectedChannel;
      const statusMatch = this.selectedStatus === 'all' || message.status === this.selectedStatus;
      return channelMatch && statusMatch;
    });
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }

  onChannelFilterChange(): void {
    // Filter logic handled by getFilteredMessages()
  }

  onStatusFilterChange(): void {
    // Filter logic handled by getFilteredMessages()
  }
}