import { isDesktop } from "react-device-detect";

export const Constants = {
  ApiHost: 'http://localhost:5100/Emp/',
  // ApiHostMobile: 'https://9bc9-177-54-156-208.ngrok-free.app/Emp/',
  ApiHostMobile: 'http://10.0.2.2:5100/Emp/',
};

export const getApiUrl = (): string => {
  return isDesktop ? Constants.ApiHost : Constants.ApiHostMobile;
}

// ngrok http http://127.0.0.1:5100 --request-header-add 'ngrok-skip-browser-warning: 69420'

/**
 * Local constants
 */
export const TOKEN_KEY = 't_sys_auth';