export const environment = {
  production: true,
  appVersion: '1.0.0',
  api: {
    baseUrl: 'https://orgx-apis.azurewebsites.net/',
    routes: {
      createTenant: {endpoint: 'tenants', method: 'POST'},
      getTenant: {endpoint: 'tenants/', method: 'GET'},
      updateTenant: {endpoint: 'tenants/', method: 'PATCH'},
      deleteTenant: {endpoint: 'tenants/status/', method: 'PATCH'},
      createSubscription: {endpoint: 'subscription', method: 'POST'},
      getSubscription: {endpoint: 'subscription', method: 'GET'},
      updateSubscription: {endpoint: 'subscription', method: 'PUT'}
    }
  }
};
