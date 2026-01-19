# Azure App Service Startup Commands Guide

This guide provides step-by-step instructions for configuring startup commands for each of your three applications in Azure App Service.

---

## Overview

All three applications are **Single Page Applications (SPAs)** that need a static file server with history API fallback support. This allows client-side routing to work correctly (e.g., `/dashboard`, `/profile` routes won't return 404 errors).

---

## Step-by-Step Instructions

### 1. Company Management (React App)

**App Service**: `your-company-management-app` (or whatever you named it)

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your **Company Management App Service**
3. In the left sidebar, click **"Configuration"**
4. Click on the **"General settings"** tab
5. Find the **"Startup Command"** field
6. Enter the following command:
   ```
   npx serve -s . -l 8080
   ```
7. Click **"Save"** at the top
8. Click **"Continue"** when prompted
9. Wait for the configuration to apply (may take 1-2 minutes)

**What this command does:**
- `npx serve` - Uses the `serve` package to serve static files
- `-s` - Enables SPA mode (history API fallback for client-side routing)
- `.` - Serves files from the current directory (`/home/site/wwwroot/`)
- `-l 8080` - Listens on port 8080 (Azure's default port)

---

### 2. Tenant Management (Angular App)

**App Service**: `your-tenant-management-app` (or whatever you named it)

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your **Tenant Management App Service**
3. In the left sidebar, click **"Configuration"**
4. Click on the **"General settings"** tab
5. Find the **"Startup Command"** field
6. Enter the following command:
   ```
   npx serve -s . -l 8080
   ```
7. Click **"Save"** at the top
8. Click **"Continue"** when prompted
9. Wait for the configuration to apply (may take 1-2 minutes)

**Note**: Same command as React app - Angular SPAs also need history API fallback.

---

### 3. Multi-Tenant Management (Angular App)

**App Service**: `your-multi-tenant-management-app` (or whatever you named it)

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your **Multi-Tenant Management App Service**
3. In the left sidebar, click **"Configuration"**
4. Click on the **"General settings"** tab
5. Find the **"Startup Command"** field
6. Enter the following command:
   ```
   npx serve -s . -l 8080
   ```
7. Click **"Save"** at the top
8. Click **"Continue"** when prompted
9. Wait for the configuration to apply (may take 1-2 minutes)

**Note**: Same command as the other apps - all three are SPAs with client-side routing.

---

## Alternative Startup Commands

If `npx serve` doesn't work (rare), you can use these alternatives:

### Option 1: Install serve globally first
```
npm install -g serve && serve -s . -l 8080
```

### Option 2: Use http-server (alternative package)
```
npx http-server -p 8080 -a 0.0.0.0 -S
```

**Note**: The `-S` flag enables SPA mode for http-server.

---

## Verification Steps

After setting the startup command for each app:

1. **Restart the App Service**:
   - Go to **"Overview"** in your App Service
   - Click **"Restart"** button
   - Wait for restart to complete

2. **Check Logs**:
   - Go to **"Log stream"** in your App Service
   - You should see output like:
     ```
     INFO: Accepting connections at http://0.0.0.0:8080
     ```

3. **Test the Application**:
   - Go to your App Service URL
   - Navigate to different routes (e.g., `/dashboard`, `/profile`)
   - Refresh the page - it should not show 404 errors

---

## Troubleshooting

### Issue: "npx: command not found"

**Solution**: Use the alternative command:
```
npm install -g serve && serve -s . -l 8080
```

### Issue: App shows 404 on page refresh

**Solution**: Make sure you included the `-s` flag in the startup command. This enables SPA mode.

### Issue: Port already in use

**Solution**: Azure uses port 8080 by default. Don't change the port unless you've configured Azure to use a different port.

### Issue: Files not found

**Solution**: 
1. Verify your GitHub Actions workflow deployed successfully
2. Check that files exist in `/home/site/wwwroot/` using SSH or Kudu console
3. Ensure the `package` path in your workflow matches the build output

---

## Quick Reference Table

| App | Type | Startup Command | Port |
|-----|------|----------------|------|
| Company Management | React | `npx serve -s . -l 8080` | 8080 |
| Tenant Management | Angular | `npx serve -s . -l 8080` | 8080 |
| Multi-Tenant Management | Angular | `npx serve -s . -l 8080` | 8080 |

---

## Important Notes

1. **All three apps use the same command** because they're all static SPAs
2. **The `-s` flag is critical** - it enables history API fallback for client-side routing
3. **Port 8080 is Azure's default** - don't change it unless necessary
4. **After changing startup command**, always restart the App Service
5. **Check logs** after restart to verify the server started correctly

---

## Next Steps

After configuring startup commands for all three apps:

1. ✅ Verify all three App Services have the startup command set
2. ✅ Restart all three App Services
3. ✅ Check log streams to ensure servers are running
4. ✅ Test each application in a browser
5. ✅ Test client-side routing (navigate and refresh pages)

If you encounter any issues, check the troubleshooting section above or review the deployment logs in GitHub Actions.
