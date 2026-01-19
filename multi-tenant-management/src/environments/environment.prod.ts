export const environment = {
  production: true,
  remoteEntryForTenantManagement: 'http://localhost:4201/remoteEntry.js',
  remoteEntryForCompanyManagement: 'http://localhost:4204/remoteEntry.js',
  appVersion: '1.0.0',
  aesSecretKey:"AjsGD1FM1QsSHT90uMjdXg==",
  api: {
    baseUrl: 'https://orgx-apis.azurewebsites.net/',
    routes: {
      login: {endpoint: 'auth/login', method: 'POST'},
      refresh: {endpoint: 'auth/refreshToken', method: 'POST'},
      getSubscription: {endpoint: 'subscription', method: 'GET'},
      resetPassword: {endpoint: 'employee/reset-password', method: 'PATCH'},
      forgotPassword: {endpoint: 'employee/forgot-password', method: 'POST'},
      register: {endpoint: 'tenant/register', method: 'POST'}
    }
  }
};
