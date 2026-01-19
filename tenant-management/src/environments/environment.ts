

export const environment = {
  production: false,
  appVersion: '1.0.0',
  api: {
    baseUrl: 'https://orgx-apis.azurewebsites.net/',
    routes: {
      createTenant: {endpoint: 'tenant', method: 'POST'},
      getTenant: {endpoint: 'tenant/', method: 'GET'},
      updateTenant: {endpoint: 'tenant/', method: 'PATCH'},
      deleteTenant: {endpoint: 'tenants/status/', method: 'PATCH'},
      createSubscription: {endpoint: 'subscription', method: 'POST'},
      getSubscription: {endpoint: 'subscription', method: 'GET'},
      updateSubscription: {endpoint: 'subscription', method: 'PUT'},
    }
  }
};


