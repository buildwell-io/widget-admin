import { ENV } from '../../environments/env';

const base_url = ENV.baseUrl;

export const URL_SIGN_UP = base_url + '/authentication/sign-up';
export const URL_SIGN_IN = base_url + '/authentication/sign-in';
export const URL_SIGN_OUT = base_url + '/authentication/sign-in';
export const URL_TOKEN_REFRESH = base_url + '/authentication/refresh';
