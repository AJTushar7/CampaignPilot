// Angular equivalent of shared schema
export interface User {
  id: number;
  username: string;
  password: string;
}

export interface InsertUser {
  username: string;
  password: string;
}

export interface Campaign {
  id: string;
  name: string;
  segment: string;
  status: 'scheduled' | 'active' | 'completed';
  channel: string;
  startAt: string;
  progress: number;
  errors: number;
  retryCost: number;
}

export interface AlertItem {
  id: string;
  text: string;
  time?: string;
  type?: 'info' | 'warning' | 'success' | 'error';
}

export interface ChannelData {
  name: string;
  delivery: number;
  engagement: number;
  cpm: number;
  color: string;
  recommended?: boolean;
}

export interface BSPProvider {
  name: string;
  cost: number;
  delivery: number;
  engagement: number;
  support: number;
  tag: string;
  recommended: boolean;
}