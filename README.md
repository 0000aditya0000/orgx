# Micro frontend with Multi Tenant Management

**Prerequisite**
1. Make sure you have installed the latest Node.js.
2. Angular CLI 14** and higher.
3. Basic knowledge of JavaScript, React.js, Angular & Webpack.

**Important**: This code is written in Angular CLI 14** and higher. We have created a Tenant Management System where there will be an Admin who can only create tenants, and Tenants can use this application to Sign in and Add their studios. Under those studios, they can add the Employees and do the CRUD operations.

## Part 1: Steps to run

1. Clone the starterkit for this tutorial:
   https://github.com/KnoNirajSharma/microfrontends.git --branch master

2. Move into the project directory and install the dependencies of each micro frontend 

    ```javascript
    cd multi-tenant-management/
    npm i

    cd tenant-management/
    npm i

    cd company-management/
    npm i
    ```

3. And you'll see the Sign in application in Port 4200 with the name of MultiTenantManagement.



## Part 2: Module federation

1. Switch into the project ``tenant-management`` and open the generated configuration file ``webpack.config.js``. It contains the module federation configuration. In the exposes object you have to add whichever module you have to expose or access other MF's ex:

    ```javascript
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

    module.exports = withModuleFederationPlugin({

        name: 'tenant-management',
        filename: "remoteEntry.js",
        exposes: {
            './tenant-management': './src/app/app.module.ts',
        },
        shared: {
            ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
        },

    });
    ```

    Here I  exposes the ``app module`` under the name ``./tenant-management``. Hence, the container can use this path to load it.
    Note. If you want to expose app module make sure in routing file you have to use RouterModule.forChild(routes) instead of   RouterModule.forRoot(routes).


2. Switch into the project ``company-management`` and open the generated configuration file ``webpack.config.js``. It contains the module federation configuration. In the exposes object you have to add whichever module you have to expose or access other MF's ex):

    ```javascript
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
    const CopyWebpackPlugin = require("copy-webpack-plugin");

    module.exports = withModuleFederationPlugin({

       name: "react",
        library: {
          type: "var",
          name: "react"
        },
        filename: "remoteEntry.js", // <-- Meta Data
        exposes: {
          './web-components': './app.js',
        },
        shared: ["react", "react-dom"]
      }),
      new CopyWebpackPlugin({
        patterns: [{
          from: './*.html'
        }]
      })
    ],
    devServer: {
      port: 4204
    }
    });
    ```
2.1 Need to add some extra webpack packages for react.
```
npm install --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server babel-loader

```
    


3. We can access ``tenant-management module`` two ways in ``multi-tenant-management`` applictaion.

  
3.1 Switch into the ``tenant-management`` app and open the file ``webpack.config.js``

```javascript
 new ModuleFederationPlugin({
        library: { type: "module" },

        name: "angular",
        filename: "remoteEntry.js",
        exposes: {
            './tenant-management': './src/app/app.module.ts',
        },

        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
    }),
```


3.2 Switch into the ``multi-tenant-management`` app and open the file ``routing file``

```javascript
[
  { path:'', redirectTo:'login' , pathMatch:'full'},
  {
      path: 'login',
      component: LoginPageComponent,
      data: {title: "Admin Login"},
  },
    {
    path: 'home',
    component:MainComponent,
    canActivate: [CompanyGuard],
    children: [  {
      path: 'tenant',
      loadChildren: () =>
        loadRemoteModule({
          type: 'module',
          remoteEntry: 'http://localhost:4201/remoteEntry.js',
          exposedModule: './tenant-management'
        })
          .then((m: any) => m.AppModule),
          canActivate: [SuperAdminAuthGuard],
    },
    {
      path: 'company',
      component: WebComponentWrapper,
      data: {
        type: 'script',
        remoteEntry: 'http://localhost:4204/remoteEntry.js',
        remoteName: 'react',
        exposedModule: './web-components',
        elementName: 'react-element',
      } as WebComponentWrapperOptions,
    },]
  },

];
```

Please note that the imported URL consists of the names defined in the configuration files above.
  

## Part 3: Try it out

Now, let's try it out!

1. Start the ``multi-tenant-management``,  ``tenant-management`` and ``company-management`` side by side:

    ```
    ng s -o (for multi-tenant-management & tenant-management app)
    npm start (for company-management app)
    ```

2. To install Stencil globally run this command:
   ```
   npm install -g stencil
   ```
   
   2.1  To run ``Stencil library`` do:
   ```
   npm install
   npm start
   ```

   2.2 To create another web component:

   ```
   npx stencil generate component-namne
   ```
