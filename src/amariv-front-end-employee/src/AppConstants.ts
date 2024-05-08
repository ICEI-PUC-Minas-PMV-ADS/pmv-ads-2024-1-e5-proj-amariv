import { isDesktop } from "react-device-detect";

export const Constants = {
  ApiHost: 'http://localhost:5100/Emp/',
  ApiHostMobile: 'http://10.0.2.2:5100/Emp/',
};

export const getApiUrl = (): string => {
  return isDesktop ? Constants.ApiHost : Constants.ApiHostMobile;
}

/**
 * Local constants
 */
export const TOKEN_KEY = 't_sys_auth';