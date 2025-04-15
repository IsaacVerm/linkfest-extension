# Debugging Network Requests in Firefox Extensions

When you encounter a `NetworkError` in a Firefox extension, you have several options to debug the network requests:

## 1. Use the Browser Console

The Browser Console shows network requests from extensions:

1. Press `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Shift+J` (Mac)
2. Or go to Menu → More tools → Browser Console
3. Make sure the "Network" option is enabled in the console

## 2. Use the Browser Toolbox

The Browser Toolbox provides the full DevTools experience for debugging extensions:

1. Enable it in Firefox settings:
   - Go to about:config
   - Set `devtools.chrome.enabled` to `true`
   - Set `devtools.debugger.remote-enabled` to `true`

2. Open the Browser Toolbox:
   - Press `Ctrl+Shift+Alt+I` (Windows/Linux) or `Cmd+Opt+Shift+I` (Mac)
   - Or go to Menu → Web Developer → Browser Toolbox

3. The Network panel in the Browser Toolbox will show all extension requests

## 3. Debug with console.log

Add detailed logging before and after your network request:

```javascript
console.log("About to make request to:", url, "with options:", options);
try {
  const response = await fetch(url, options);
  console.log("Response status:", response.status);
  const data = await response.text();
  console.log("Response data:", data);
} catch (error) {
  console.error("Fetch error details:", error);
}
```

## 4. Common Causes of NetworkError

- **CORS issues**: Extensions need proper permissions in manifest.json
- **Invalid URLs**: Check URL format and protocol
- **Host permission issues**: Ensure you have the right host permissions
- **Content Security Policy**: Extensions have stricter CSP rules

Check your manifest.json to ensure you have the necessary permissions for the domains you're accessing.

Would you like specific guidance on any of these debugging methods?
