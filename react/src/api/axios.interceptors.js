import instance from './axios';

let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (cb) => {
  subscribers.push(cb);
};

const onRefreshed = (token) => {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config || {};
    const status = error?.response?.status;
    const isAuthUrl = typeof originalRequest?.url === 'string' && originalRequest.url.indexOf('/api/auth/') !== -1;

    if (status === 401 && !originalRequest._retry && !isAuthUrl) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        localStorage.removeItem('token');
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            resolve(instance(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const res = await instance.post('/api/auth/refresh/', { refresh: refreshToken });
        const newToken = res?.data?.access;
        if (newToken) {
          localStorage.setItem('token', newToken);
          onRefreshed(newToken);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return instance(originalRequest);
        }
      } catch (e) {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// No exports needed; importing this file attaches interceptors
