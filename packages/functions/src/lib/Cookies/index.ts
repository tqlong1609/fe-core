export const getCookie = (cname: string) => {
  const name = cname + '=';
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const setCookie = (
  cname: string,
  cvalue: string,
  milliseconds: number
) => {
  const expirationTime = new Date();
  expirationTime.setTime(expirationTime.getTime() + milliseconds); // 9 hours in milliseconds
  document.cookie = `${cname}=${cvalue}; expires=${expirationTime.toUTCString()}; path=/`;
};

export const deleteCookie = (cname: string) => {
  document.cookie = `${cname}=;Expires=Thu, 01 Jan 1970 00:00:00 UTC;Path=/`;
};
