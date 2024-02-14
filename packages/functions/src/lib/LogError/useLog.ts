import { useEffect } from 'react';
import { LogMessage } from './types';
import { IS_SEND_LOG_SERVER, maximumMessages } from './const';

// Use a request queue to prevent DoS-ing the server in infinite loops
let requestQueue = Promise.resolve();

const sendMessage = (
  { stack, ...message }: LogMessage,
  callback: (message: LogMessage) => void
) => {
  try {
    requestQueue = requestQueue.then(async () => {
      Object.assign(message, {
        message: JSON.stringify({
          stack,
        }),
        user_agent: navigator.userAgent,
        screen_size: `${innerWidth} 𝗑 ${innerHeight}`,
      });
      // callback here
      callback(message);
    });
  } catch (error) {
    console.error(error);
  }
};

const excludedMessages = [''];
let messagesSent = 0;
const log = (
  callback: (message: LogMessage) => void,
  ...messages: LogMessage[]
) => {
  if (IS_SEND_LOG_SERVER) {
    messages
      .filter((message) => !excludedMessages.includes(message.message))
      .forEach((message) => {
        if (messagesSent++ < maximumMessages) {
          sendMessage(message, callback);
        } else if (messagesSent >= maximumMessages) {
          sendMessage(
            {
              message: 'Maximum messages exceeded',
              type: 'notice',
            },
            callback
          );
        }
      });
  }
};

export const useLog = (callback: (message: LogMessage) => void) => {
  useEffect(() => {
    const handleErrorEvent = (props: any) => {
      const path = props.currentTarget.location.href;
      const error = props.error;

      log(callback, {
        message: props.message,
        filename: path,
        lineno: 0,
        colno: props.colno,
        stack: error.stack,
        type: 'error',
      });
    };

    const handleUnhandledEvent = ({ reason }: { reason: string }) => {
      log(callback, { message: reason, type: 'notice' });
    };

    // Catch whenever throw error
    window.addEventListener('error', handleErrorEvent);

    // Catch whenever Promise rejected and no rejection handler
    window.addEventListener('unhandledrejection', handleUnhandledEvent);

    return () => {
      window.removeEventListener('error', handleErrorEvent);
      window.removeEventListener('unhandledrejection', handleUnhandledEvent);
    };
  }, [callback]);
};
