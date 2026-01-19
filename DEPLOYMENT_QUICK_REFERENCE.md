# Deployment Quick Reference

## Workflow Files Created

1. **`.github/workflows/deploy-company-management.yml`**
   - Deploys React app (Company Management)
   - Triggers on: Changes in `company-management/**`
   - Build output: `company-management/dist`

2. **`.github/workflows/deploy-multi-tenant-management.yml`**
   - Deploys Angular host app (Multi-Tenant Management)
   - Triggers on: Changes in `multi-tenant-management/**`
   - Build output: `multi-tenant-management/dist/multi-tenant-management`

3. **`.github/workflows/deploy-tenant-management.yml`**
   - Deploys Angular app (Tenant Management)
   - Triggers on: Changes in `tenant-management/**`
   - Build output: `tenant-management/dist/tenant-management`

## GitHub Secrets Required

### Company Management
- `AZURE_WEBAPP_NAME_COMPANY_MANAGEMENT`
- `AZURE_WEBAPP_PUBLISH_PROFILE_COMPANY_MANAGEMENT`

### Multi-Tenant Management
- `AZURE_WEBAPP_NAME_MULTI_TENANT`
- `AZURE_WEBAPP_PUBLISH_PROFILE_MULTI_TENANT`

### Tenant Management
- `AZURE_WEBAPP_NAME_TENANT_MANAGEMENT`
- `AZURE_WEBAPP_PUBLISH_PROFILE_TENANT_MANAGEMENT`

## How Path-Based Triggering Works

Each workflow only runs when files in its specific directory change:

- ✅ Change in `company-management/src/` → Only Company Management deploys
- ✅ Change in `multi-tenant-management/src/` → Only Multi-Tenant deploys
- ✅ Change in `tenant-management/src/` → Only Tenant Management deploys
- ✅ Change in multiple apps → Multiple workflows run in parallel

## Manual Deployment

You can manually trigger any workflow:
1. Go to GitHub → Actions
2. Select the workflow you want to run
3. Click "Run workflow" → "Run workflow"

## Build Commands

- **Company Management**: `npm run build` (webpack production build)
- **Multi-Tenant Management**: `npm run build -- --configuration production` (Angular production build)
- **Tenant Management**: `npm run build -- --configuration production` (Angular production build)

## Node.js Version

All workflows use **Node.js 18.x** (can be changed in workflow files if needed)
