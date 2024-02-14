import React from 'react';
import { LogMessage } from './types';
import { useLog } from './useLog';

export const withLogError =
  <P extends object>(WrappedComponent: React.ComponentType<P>) =>
  (callback: (message: LogMessage) => void) => {
    const WithLogError: React.FC<P> = (props) => {
      useLog(callback);
      return <WrappedComponent {...props} />;
    };

    return WithLogError;
  };
