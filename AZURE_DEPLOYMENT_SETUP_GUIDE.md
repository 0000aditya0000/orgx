# Azure Deployment Setup Guide

This guide will help you set up CI/CD pipelines for deploying the three applications (Company Management, Multi-Tenant Management, and Tenant Management) to Azure App Service using GitHub Actions.

## Prerequisites

1. **Azure Account** with active subscription
2. **GitHub Repository** with the code
3. **Azure App Service** instances created for each application
4. **Publish Profiles** downloaded from Azure Portal

---

## Step 1: Create Azure App Service Instances

### 1.1 Create App Service for Company Management (React)

1. Go to [Azure Portal](https://portal.azure.com)
2. Click **"Create a resource"**
3. Search for **"Web App"** and select it
4. Click **"Create"**
5. Fill in the details:
   - **Subscription**: Your subscription
   - **Resource Group**: Create new or use existing
   - **Name**: `your-company-management-app` (must be globally unique)
   - **Publish**: Code
   - **Runtime stack**: Node.js 18 LTS
   - **Operating System**: Linux (recommended) or Windows
   - **Region**: Choose your preferred region
6. Click **"Review + create"** then **"Create"**

### 1.2 Create App Service for Multi-Tenant Management (Angular - Host App)

Repeat the same steps as above with:
- **Name**: `your-multi-tenant-management-app`
- **Runtime stack**: Node.js 18 LTS
- **Operating System**: Linux (recommended) or Windows

### 1.3 Create App Service for Tenant Management (Angular)

Repeat the same steps as above with:
- **Name**: `your-tenant-management-app`
- **Runtime stack**: Node.js 18 LTS
- **Operating System**: Linux (recommended) or Windows

---

## Step 2: Configure App Service Settings

For each App Service instance, configure the following:

### 2.1 General Settings

For each App Service, configure the following:

1. Navigate to your App Service in Azure Portal
2. Go to **"Configuration"** → **"General settings"**
3. Set:
   - **Stack**: Node.js 18 LTS
   - **Startup Command**: See app-specific commands below

#### Startup Commands for Each App

**All three apps are Single Page Applications (SPAs)** that need a static file server with history API fallback support for client-side routing.

##### 1. Company Management (React App)

**App Service Name**: `your-company-management-app`

**Startup Command**:
```bash
npx serve -s . -l 8080
```

**Alternative** (if npx doesn't work):
```bash
npm install -g serve && serve -s . -l 8080
```

**What this does**:
- `-s` flag enables single-page application mode (history API fallback)
- `-l 8080` sets the port to 8080 (Azure's default)
- `.` serves from the current directory (`/home/site/wwwroot/`)

##### 2. Tenant Management (Angular App)

**App Service Name**: `your-tenant-management-app`

**Startup Command**:
```bash
npx serve -s . -l 8080
```

**Alternative**:
```bash
npm install -g serve && serve -s . -l 8080
```

**Note**: Same command as React app - Angular SPAs also need history API fallback.

##### 3. Multi-Tenant Management (Angular App)

**App Service Name**: `your-multi-tenant-management-app`

**Startup Command**:
```bash
npx serve -s . -l 8080
```

**Alternative**:
```bash
npm install -g serve && serve -s . -l 8080
```

**Note**: Same command as the other apps - all three are SPAs with client-side routing.

---

**Important Notes**:

1. **Port**: Azure App Service uses port `8080` by default. Don't change this unless you've configured a custom port.

2. **SPA Mode (`-s` flag)**: The `-s` flag is crucial for SPAs because it:
   - Enables history API fallback (routes like `/dashboard` will serve `index.html`)
   - Prevents 404 errors on page refresh
   - Works for both React and Angular SPAs

3. **If `npx serve` doesn't work**: You can install `serve` globally using the alternative command, or add it to your workflow's build step.

4. **Testing**: After setting the startup command, restart your App Service and check the logs to ensure the server starts correctly.

### 2.2 Application Settings (if needed)

If your apps require environment variables:
1. Go to **"Configuration"** → **"Application settings"**
2. Add any required environment variables
3. Click **"Save"**

---

## Step 3: Download Publish Profiles

For each App Service, download the publish profile:

1. Navigate to your App Service in Azure Portal
2. Click **"Get publish profile"** button (top toolbar)
3. Save the downloaded `.PublishSettings` file
4. Open the file and copy the entire content (you'll need this for GitHub Secrets)

**Repeat this for all three App Services.**

---

## Step 4: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**

### 4.1 Add Secrets for Company Management

Add the following secrets:

- **Name**: `AZURE_WEBAPP_NAME_COMPANY_MANAGEMENT`
  - **Value**: The name of your Company Management App Service (e.g., `your-company-management-app`)

- **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE_COMPANY_MANAGEMENT`
  - **Value**: Paste the entire content of the `.PublishSettings` file downloaded from Company Management App Service

### 4.2 Add Secrets for Multi-Tenant Management

Add the following secrets:

- **Name**: `AZURE_WEBAPP_NAME_MULTI_TENANT`
  - **Value**: The name of your Multi-Tenant Management App Service (e.g., `your-multi-tenant-management-app`)

- **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE_MULTI_TENANT`
  - **Value**: Paste the entire content of the `.PublishSettings` file downloaded from Multi-Tenant Management App Service

### 4.3 Add Secrets for Tenant Management

Add the following secrets:

- **Name**: `AZURE_WEBAPP_NAME_TENANT_MANAGEMENT`
  - **Value**: The name of your Tenant Management App Service (e.g., `your-tenant-management-app`)

- **Name**: `AZURE_WEBAPP_PUBLISH_PROFILE_TENANT_MANAGEMENT`
  - **Value**: Paste the entire content of the `.PublishSettings` file downloaded from Tenant Management App Service

---

## Step 5: Verify Workflow Files

The workflow files are already created in `.github/workflows/`:

1. `deploy-company-management.yml` - Deploys React app
2. `deploy-multi-tenant-management.yml` - Deploys Angular host app
3. `deploy-tenant-management.yml` - Deploys Angular tenant app

Each workflow:
- Triggers automatically when files in the respective app directory change
- Can be manually triggered via `workflow_dispatch`
- Builds the app and deploys to the corresponding Azure App Service

---

## Step 6: Test the Deployment

### 6.1 Test Automatic Deployment

1. Make a change in any app (e.g., `company-management/src/components/`)
2. Commit and push to the `main` branch
3. Go to GitHub → **Actions** tab
4. You should see the workflow running for that specific app
5. Wait for it to complete
6. Check your Azure App Service to verify the deployment

### 6.2 Test Manual Deployment

1. Go to GitHub → **Actions** tab
2. Select any workflow (e.g., "Deploy Company Management to Azure")
3. Click **"Run workflow"** → **"Run workflow"**
4. The workflow will run and deploy the app

---

## Step 7: Verify Deployments

After successful deployment:

1. Go to Azure Portal → Your App Service
2. Click **"Browse"** or use the URL: `https://your-app-name.azurewebsites.net`
3. Verify the application is running correctly

---

## How It Works

### Path-Based Triggering

Each workflow uses `paths` filter to trigger only when relevant files change:

- **Company Management**: Triggers on changes in `company-management/**`
- **Multi-Tenant Management**: Triggers on changes in `multi-tenant-management/**`
- **Tenant Management**: Triggers on changes in `tenant-management/**`

This ensures that:
- ✅ Changes to Company Management only deploy Company Management
- ✅ Changes to Multi-Tenant Management only deploy Multi-Tenant Management
- ✅ Changes to Tenant Management only deploy Tenant Management
- ✅ Changes to multiple apps trigger multiple deployments (if needed)

### Build Process

1. **Checkout**: Gets the latest code from the repository
2. **Setup Node.js**: Installs Node.js 18.x
3. **Install Dependencies**: Runs `npm ci` in the app directory
4. **Build**: Runs `npm run build` to create production build
5. **Deploy**: Uses Azure publish profile to deploy the `dist` folder

---

## Troubleshooting

### Build Fails

1. Check the GitHub Actions logs for specific errors
2. Verify Node.js version compatibility
3. Ensure all dependencies are in `package.json`
4. Check for TypeScript/compilation errors

### Deployment Fails

1. Verify the publish profile secret is correct
2. Check the App Service name matches the secret
3. Ensure the App Service is running and accessible
4. Verify the package path is correct:
   - Company Management: `./company-management/dist`
   - Multi-Tenant: `./multi-tenant-management/dist/multi-tenant-management`
   - Tenant: `./tenant-management/dist/tenant-management`

### App Not Loading After Deployment

1. Check Azure App Service logs: **Log stream** or **App Service logs**
2. Verify the startup command (if needed)
3. Check application settings/environment variables
4. Verify the build output directory is correct

### Files Not in /site/wwwroot/ After Deployment

If deployment succeeds but files aren't in `/home/site/wwwroot/`:

1. **Verify the package path in workflow**:
   - Company Management: `./company-management/dist`
   - Multi-Tenant: `./multi-tenant-management/dist/multi-tenant-management`
   - Tenant: `./tenant-management/dist/tenant-management`

2. **Check build output exists**: The workflow now includes a step to list build output. Verify files are being created.

3. **Verify Azure deployment path**: 
   - SSH into your App Service: `az webapp ssh --name <app-name> --resource-group <resource-group>`
   - Check if files exist: `ls -la /home/site/wwwroot/`

4. **Ensure startup command is set**: For static SPAs, you need a startup command to serve files (see Step 2.1)

5. **Check deployment logs**: In GitHub Actions, expand the "Deploy to Azure App Service" step to see what was deployed

---

## Required Azure Information

To complete the setup, you'll need:

1. **Three App Service Names**:
   - Company Management App Service name
   - Multi-Tenant Management App Service name
   - Tenant Management App Service name

2. **Three Publish Profiles**:
   - Company Management publish profile (XML content)
   - Multi-Tenant Management publish profile (XML content)
   - Tenant Management publish profile (XML content)

3. **Azure Subscription Details** (for reference):
   - Subscription ID
   - Resource Group names
   - Region/Location

---

## Additional Notes

- The workflows use Node.js 18.x (you can change this in the workflow files if needed)
- All workflows run on `ubuntu-latest` runners
- The build process uses `npm ci` for faster, reliable, reproducible builds
- Each app builds independently, so they don't interfere with each other
- You can monitor all deployments in the GitHub Actions tab

---

## Support

If you encounter any issues:
1. Check GitHub Actions logs for detailed error messages
2. Review Azure App Service logs
3. Verify all secrets are correctly configured
4. Ensure the App Services are running and accessible
