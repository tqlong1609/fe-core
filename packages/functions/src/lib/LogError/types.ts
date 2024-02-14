export type LogType = 'info' | 'notice' | 'error' | 'debug' | 'warn';

export type LogMessage = {
  message: string;
  type: LogType;
  filename?: string;
  lineno?: number;
  colno?: number;
  screen_size?: string;
  user_agent?: string;
  stack?: string;
};
