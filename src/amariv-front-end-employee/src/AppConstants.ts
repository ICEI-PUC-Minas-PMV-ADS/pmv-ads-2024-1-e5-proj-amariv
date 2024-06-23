export const Constants = {
  ApiHost: 'https://api.amariv.com/Emp/',
  //ApiHost: 'https://localhost:5100/Emp/',
};

export const getApiUrl = (): string => {
  return Constants.ApiHost;
}

/**
 * Local constants
 */
export const TOKEN_KEY = 't_sys_auth';