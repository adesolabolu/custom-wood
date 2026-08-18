export interface ActivityLog {
  id: string;
  type: string; // 'Status Update', 'New Order', 'Content Edit', 'order', 'support', 'quote'
  title: string;
  desc: string;
  date: string;
}

export function logActivity(type: string, title: string, desc: string) {
  const logsString = localStorage.getItem('woodwork_activity_logs');
  const logs: ActivityLog[] = logsString ? JSON.parse(logsString) : [];
  
  const newLog: ActivityLog = {
    id: Math.random().toString(36).substring(2, 9),
    type,
    title,
    desc,
    date: new Date().toISOString()
  };
  
  logs.unshift(newLog);
  localStorage.setItem('woodwork_activity_logs', JSON.stringify(logs.slice(0, 100))); // Keep last 100
}

export function getActivityLogs(): ActivityLog[] {
  const logsString = localStorage.getItem('woodwork_activity_logs');
  return logsString ? JSON.parse(logsString) : [];
}
