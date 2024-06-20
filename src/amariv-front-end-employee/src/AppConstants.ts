export const Constants = {
  ApiHost: 'https://api.amariv.com/Emp/',
};

export const getApiUrl = (): string => {
  return Constants.ApiHost;
}

/**
 * Local constants
 */
export const TOKEN_KEY = 't_sys_auth';