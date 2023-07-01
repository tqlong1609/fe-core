import { useEffect, useState } from 'react';

const GET_SESSION_STORAGE = 'getSessionStorage';
const SET_SESSION_STORAGE = 'setSessionStorage';
const SESSION_STORAGE_CHANNEL = 'session_storage_channel';

type ParamsType = { key: string; value: string };

type SESSION_STORAGE_CHANNEL_TYPE = 'update_session' | 'remove_session';

const setAccessTokenSessionStorage = (params: ParamsType) => {
  sessionStorage.setItem(params.key, params.value);
};

const removeAccessTokenSessionStorage = (key: ParamsType['key']) => {
  sessionStorage.removeItem(key);
};

const postMessageSessionStorage = (params: ParamsType) => {
  const bc = new BroadcastChannel(SESSION_STORAGE_CHANNEL);
  bc.postMessage({
    type: 'update_session' as SESSION_STORAGE_CHANNEL_TYPE,
    newValue: { [params.key]: params.value },
  });
};

const removeMessageSessionStorage = (key: ParamsType['key']) => {
  const bc = new BroadcastChannel(SESSION_STORAGE_CHANNEL);
  bc.postMessage({
    type: 'remove_session' as SESSION_STORAGE_CHANNEL_TYPE,
    key,
  });
};

export const putSessionStorageTabs = (params: ParamsType) => {
  setAccessTokenSessionStorage(params);
  postMessageSessionStorage(params);
};

export const deleteSessionStorageTabs = (key: ParamsType['key']) => {
  removeAccessTokenSessionStorage(key);
  removeMessageSessionStorage(key);
};

export const useSessionStorageTabs = (key: ParamsType['key']) => {
  const [isRefresh, setIsRefresh] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    const bc = new BroadcastChannel(SESSION_STORAGE_CHANNEL);
    bc.onmessage = (messageEvent) => {
      const data = messageEvent.data;
      switch (data.type as SESSION_STORAGE_CHANNEL_TYPE) {
        case 'update_session':
          if (data.newValue) {
            for (let key in data.newValue) {
              sessionStorage.setItem(key, data.newValue[key]);
            }
            setIsRefresh((pre) => !pre);
          }
          break;
        case 'remove_session':
          sessionStorage.removeItem(data.key);
          break;
        default:
          console.log('we received a message');
      }
    };

    return () => {
      bc.close();
    };
  }, []);

  useEffect(() => {
    if (!sessionStorage.length) {
      localStorage.setItem(GET_SESSION_STORAGE, Date.now().toString());
    }

    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === GET_SESSION_STORAGE) {
        localStorage.setItem(
          SET_SESSION_STORAGE,
          JSON.stringify(sessionStorage)
        );
        localStorage.removeItem(SET_SESSION_STORAGE);
        setIsRefresh((pre) => !pre);
      } else if (event.key === SET_SESSION_STORAGE && !sessionStorage.length) {
        if (event.newValue) {
          const data = JSON.parse(event.newValue);
          for (let key in data) {
            sessionStorage.setItem(key, data[key]);
          }
          setIsRefresh((pre) => !pre);
        }
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem(key);
    if (token) {
      setToken(token as string);
    }
  }, [isRefresh]);

  return {
    token,
  };
};
