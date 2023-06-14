import { Provider } from 'react-redux';
import store from './store';
import React from 'react';

type ReduxProviderProps = {
  children: JSX.Element;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
