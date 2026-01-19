# Azure Details Required for Deployment Setup

This document lists all the information you need to provide from Azure to complete the CI/CD setup.

---

## 1. App Service Names

You need to provide the **exact names** of your three Azure App Services:

### Company Management (React App)
- **App Service Name**: `___________________________`
- Example: `orgx-company-management-prod`

### Multi-Tenant Management (Angular Host App)
- **App Service Name**: `___________________________`
- Example: `orgx-multi-tenant-prod`

### Tenant Management (Angular App)
- **App Service Name**: `___________________________`
- Example: `orgx-tenant-management-prod`

**Where to find**: Azure Portal → Your App Service → Overview → Name

---

## 2. Publish Profiles

You need to download and provide the **publish profile** for each App Service:

### Company Management Publish Profile
- Download from: Azure Portal → Company Management App Service → **"Get publish profile"**
- **Content**: Paste the entire XML content here or save securely

### Multi-Tenant Management Publish Profile
- Download from: Azure Portal → Multi-Tenant Management App Service → **"Get publish profile"**
- **Content**: Paste the entire XML content here or save securely

### Tenant Management Publish Profile
- Download from: Azure Portal → Tenant Management App Service → **"Get publish profile"**
- **Content**: Paste the entire XML content here or save securely

**Note**: The publish profile is an XML file that contains authentication credentials. Keep it secure and add it as a GitHub Secret.

---

## 3. GitHub Secrets Configuration

Once you have the above information, you'll need to add these secrets in GitHub:

### Secrets for Company Management:
1. `AZURE_WEBAPP_NAME_COMPANY_MANAGEMENT` = [Your Company Management App Service Name]
2. `AZURE_WEBAPP_PUBLISH_PROFILE_COMPANY_MANAGEMENT` = [Publish Profile XML Content]

### Secrets for Multi-Tenant Management:
1. `AZURE_WEBAPP_NAME_MULTI_TENANT` = [Your Multi-Tenant Management App Service Name]
2. `AZURE_WEBAPP_PUBLISH_PROFILE_MULTI_TENANT` = [Publish Profile XML Content]

### Secrets for Tenant Management:
1. `AZURE_WEBAPP_NAME_TENANT_MANAGEMENT` = [Your Tenant Management App Service Name]
2. `AZURE_WEBAPP_PUBLISH_PROFILE_TENANT_MANAGEMENT` = [Publish Profile XML Content]

---

## 4. Optional: Additional Configuration

If your applications require environment variables or specific Azure configurations, you may also need:

### Application Settings (if applicable)
- Any environment variables needed at runtime
- API endpoints or base URLs
- Authentication keys or tokens

### Startup Command (if needed)
- Custom startup commands for the App Services
- Node.js startup scripts

---

## Quick Checklist

Before starting the deployment setup, ensure you have:

- [ ] Created three Azure App Services (one for each app)
- [ ] Noted down the exact App Service names
- [ ] Downloaded publish profiles for all three App Services
- [ ] Have access to GitHub repository settings
- [ ] Have permissions to add GitHub Secrets
- [ ] Verified the App Services are running and accessible

---

## How to Get Publish Profile

1. Log in to [Azure Portal](https://portal.azure.com)
2. Navigate to your App Service
3. Click the **"Get publish profile"** button in the top toolbar
4. A `.PublishSettings` file will be downloaded
5. Open the file in a text editor
6. Copy the entire XML content
7. This content will be used as the GitHub Secret value

**Important**: The publish profile contains sensitive authentication information. Never commit it to the repository. Always use GitHub Secrets.

---

## Next Steps

Once you have all the information above:

1. Follow the **AZURE_DEPLOYMENT_SETUP_GUIDE.md** step by step
2. Add the secrets to GitHub as described in Step 4
3. Test the deployment by making a small change to one of the apps
4. Monitor the deployment in GitHub Actions

---

## Support

If you need help gathering this information:
- Azure Portal documentation: https://docs.microsoft.com/en-us/azure/
- GitHub Secrets documentation: https://docs.github.com/en/actions/security-guides/encrypted-secrets
