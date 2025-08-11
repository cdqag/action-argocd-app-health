# ArgoCD Application Health Check

A GitHub Action that reports the health status of ArgoCD applications, providing detailed diagnostics for unhealthy resources including events, pod logs, and intelligent log parsing.

## Features

- 🔍 **Health Status Monitoring**: Check the health of ArgoCD applications and their resources
- 📋 **Resource Tree Analysis**: Examine the complete resource tree for unhealthy components
- 📝 **Event Reporting**: Display Kubernetes events for problematic resources
- 📊 **Pod Log Analysis**: Retrieve and analyze container logs for debugging
- 🤖 **Intelligent Log Parsing**: Automatically parse JSON logs and create GitHub annotations
- 🚨 **GitHub Annotations**: Convert errors and warnings into actionable GitHub workflow annotations

## Usage

```yaml
name: ArgoCD Health Check
on:
  schedule:
    - cron: '*/15 * * * *'  # Check every 15 minutes
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - name: Check ArgoCD Application Health
        uses: cdqag/action-argocd-app-health@v1
        with:
          app-name: 'my-application'
          server-url: 'https://argocd.example.com'
          user-login: ${{ secrets.ARGOCD_USERNAME }}
          user-password: ${{ secrets.ARGOCD_PASSWORD }}
          fail-on-unhealthy: 'true'
```

## Inputs

| Input | Description | Required |
|-------|-------------|----------|
| `app-name` | Name of the ArgoCD application to monitor | ✅ |
| `server-url` | ArgoCD server URL (e.g., `https://argocd.example.com`) | ✅ |
| `user-login` | ArgoCD username for authentication | ✅ |
| `user-password` | ArgoCD password for authentication | ✅ |
| `fail-on-unhealthy` | If set to `true`, the action will fail if the application is unhealthy | ❌ (default: `false`) |

## Outputs

| Output | Description |
|--------|-------------|
| `app-health` | Health status of the application |

## How It Works

1. **Authentication**: Connects to ArgoCD using provided credentials
2. **Application Health Check**: Retrieves the overall health status of the specified application
3. **Resource Analysis**: If the application is unhealthy, analyzes the resource tree to identify problematic components
4. **Event Collection**: Gathers Kubernetes events for unhealthy resources
5. **Log Retrieval**: For unhealthy pods, retrieves container logs for analysis
6. **Intelligent Parsing**: Automatically parses JSON logs and creates GitHub annotations for errors and warnings

## Output Examples

### Healthy Application

```text
💚 Application my-app is in Healthy state
```

### Unhealthy Application with Details

```text
💔 Application my-app is in Degraded state because: one or more objects failed
❗ Pod my-app-7d4b6c8f9-xyz is in Error state because: CrashLoopBackOff
  ↘️ Pod my-app-7d4b6c8f9-xyz has the following events:
    ❗ BackOff (5): Back-off restarting failed container
    ❗ Failed (3): Error: failed to create containerd task: failed to create shim task
  ↘️ Pod my-app-7d4b6c8f9-xyz has the following containers:
    📦 app-container (my-app:v1.2.3)
      ↘️ Logs:
        {"level":"ERROR","message":"Database connection failed","stack_trace":"..."}
```

## Health Status Indicators

The action uses emoji indicators to represent different health states:

- 💚 **Healthy**: All resources are functioning correctly
- 💔 **Degraded**: Some resources are experiencing issues
- ❗ **Error**: Critical errors detected
- 🔵 **Progressing**: Resources are being deployed or updated
- ❓ **Unknown**: Health status cannot be determined
- 🟨 **Suspended**: Application is intentionally suspended
- ⚪ **Missing**: Expected resources are missing

## Log Parsing Features

The action includes intelligent log parsing capabilities:

### JSON Log Processing

- Automatically detects JSON-formatted log entries
- Extracts `level`, `message`, and `stack_trace` fields
- Creates GitHub annotations for:
  - **Errors**: Shows error message and stack trace
  - **Warnings**: Highlights warning messages

### Supported Log Formats

Currently supports parsing of structured JSON logs with fields like:

```json
{
  "level": "ERROR",
  "message": "Database connection failed",
  "stack_trace": "java.sql.SQLException: Connection refused..."
}
```

## Permissions

The action requires the following ArgoCD permissions:

- `applications:get` - To retrieve application details
- `applications:read` - To access application resources
- `logs:get` - To retrieve pod logs (optional, will show warning if not available)

## Error Handling

The action gracefully handles various error scenarios:

- **Authentication failures**: Clear error messages for login issues
- **Permission errors**: Warnings for insufficient permissions
- **Network issues**: Proper error reporting for connectivity problems
- **Missing resources**: Informative messages when resources are not found

## Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the action
npm run build

# Lint code
npm run lint
```

### Project Structure

```text
├── src/
│   ├── main.ts              # Main entry point
│   ├── utils.ts             # Utility functions
│   ├── print.ts             # Output formatting
│   ├── argocd/              # ArgoCD client and models
│   │   ├── client.ts        # ArgoCD API client
│   │   └── models/          # TypeScript models
│   └── interpreters/        # Log parsing interpreters
│       ├── AbstractInterpreter.ts
│       ├── JSONInterpreter.ts
│       └── __tests__/       # Unit tests
├── action.yml              # Action metadata
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes with tests
4. Run the test suite
5. Submit a pull request

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Support

For issues and questions:

- Create an issue in the GitHub repository
- Check existing issues for similar problems
- Provide detailed information about your ArgoCD setup and application configuration
