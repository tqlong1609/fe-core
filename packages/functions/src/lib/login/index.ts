import { useState } from 'react';

export const useIsLogin = () => {
  const [isLogin, setIsLogin] = useState(false);

  return {
    isLogin,
  };
};
