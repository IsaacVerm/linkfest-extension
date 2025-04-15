# Firefox Extension Without Icons

Yes, you can create a Firefox extension without icons. While it's generally recommended to have icons for better user experience, they are not strictly required. Here's how to modify the manifest to create a Firefox extension without icons:

## manifest.json (without icons)
```json
{
  "manifest_version": 2,
  "name": "Linkfest Extension",
  "version": "1.0",
  "description": "Add interesting links to your weblog's links.json file",
  "permissions": [
    "activeTab",
    "http://127.0.0.1:8000/"
  ],
  "browser_action": {
    "default_title": "Linkfest",
    "default_popup": "popup/popup.html"
  }
}
```

I've removed:
- The `default_icon` property from `browser_action`
- The standalone `icons` property

This simplified manifest will create a functional extension without requiring any icon files.

## Note About Browser Behavior
Without an icon, Firefox will display a generic puzzle piece icon for your extension in the toolbar. This is the standard fallback for extensions without custom icons.

## Updated Directory Structure
```
linkfest-extension/
├── manifest.json
└── popup/
    ├── popup.html
    ├── popup.css
    └── popup.js
```

All the other files (popup.html, popup.css, and popup.js) can remain exactly the same as in my previous response.
