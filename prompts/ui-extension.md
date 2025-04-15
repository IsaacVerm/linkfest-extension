# Firefox Extension for Link Management

I'll create a Firefox extension that allows you to add links to your `links.json` file through a simple UI form. Here's the code organized by files:

## manifest.json
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
    "default_icon": {
      "48": "icons/icon-48.png"
    },
    "default_title": "Linkfest",
    "default_popup": "popup/popup.html"
  },
  "icons": {
    "48": "icons/icon-48.png"
  }
}
```

## popup/popup.html
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <h1>Add Link to Collection</h1>
    <form id="linkForm">
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" id="title" name="title" required>
      </div>
      
      <div class="form-group">
        <label for="source">Source URL</label>
        <input type="url" id="source" name="source" required>
      </div>
      
      <div class="form-group">
        <label for="key_text">Key Text</label>
        <textarea id="key_text" name="key_text"></textarea>
      </div>
      
      <div class="form-group">
        <label for="why_interesting">Why Interesting</label>
        <textarea id="why_interesting" name="why_interesting"></textarea>
      </div>
      
      <div class="form-group">
        <label for="screenshot">Screenshot Filename</label>
        <input type="text" id="screenshot" name="screenshot">
      </div>
      
      <div class="form-group">
        <button type="submit" id="submitBtn">Add Link</button>
      </div>
      
      <div id="status"></div>
    </form>
  </div>
  <script src="popup.js"></script>
</body>
</html>
```

## popup/popup.css
```css
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  width: 400px;
  margin: 0;
  padding: 0;
}

.container {
  padding: 16px;
}

h1 {
  font-size: 18px;
  margin-top: 0;
  color: #333;
}

.form-group {
  margin-bottom: 12px;
}

label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  font-size: 14px;
}

input, textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 14px;
}

textarea {
  min-height: 80px;
  resize: vertical;
}

button {
  background-color: #0060df;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  width: 100%;
}

button:hover {
  background-color: #0050bc;
}

#status {
  margin-top: 12px;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
  display: none;
}

.success {
  background-color: #e6f4ea;
  color: #137333;
  display: block !important;
}

.error {
  background-color: #fce8e6;
  color: #c5221f;
  display: block !important;
}
```

## popup/popup.js
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Autofill the source URL with the current tab's URL
  browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
    if (tabs[0]) {
      document.getElementById('source').value = tabs[0].url;
      
      // Also try to get the page title
      document.getElementById('title').value = tabs[0].title || '';
    }
  });

  // Handle form submission
  document.getElementById('linkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const statusEl = document.getElementById('status');
    statusEl.className = '';
    statusEl.style.display = 'none';
    statusEl.textContent = '';
    
    // Get form data
    const linkData = {
      title: document.getElementById('title').value,
      source: document.getElementById('source').value,
      key_text: document.getElementById('key_text').value,
      why_interesting: document.getElementById('why_interesting').value,
      screenshot: document.getElementById('screenshot').value
    };
    
    // Validate required fields
    if (!linkData.title || !linkData.source) {
      statusEl.textContent = 'Title and Source URL are required fields';
      statusEl.classList.add('error');
      return;
    }
    
    // Submit to the local server
    fetch('http://127.0.0.1:8000/add-link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(linkData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      statusEl.textContent = 'Link added successfully!';
      statusEl.classList.add('success');
      
      // Clear form after successful submission (optional)
      document.getElementById('title').value = '';
      document.getElementById('source').value = '';
      document.getElementById('key_text').value = '';
      document.getElementById('why_interesting').value = '';
      document.getElementById('screenshot').value = '';
    })
    .catch(error => {
      statusEl.textContent = `Error: ${error.message}`;
      statusEl.classList.add('error');
    });
  });
});
```

## /icons folder
You'll need to create a simple icon file named `icon-48.png` in an `icons` directory. You can create a simple icon or use any appropriate icon that represents link management.

## Installation Instructions

1. Create the directory structure as follows:
   ```
   linkfest-extension/
   ├── manifest.json
   ├── icons/
   │   └── icon-48.png
   └── popup/
       ├── popup.html
       ├── popup.css
       └── popup.js
   ```

2. To load the extension in Firefox:
   - Open Firefox
   - Navigate to `about:debugging`
   - Click "This Firefox" in the sidebar
   - Click "Load Temporary Add-on..."
   - Select the `manifest.json` file in your extension directory

3. Make sure your local server is running at `http://127.0.0.1:8000` and has an endpoint at `/add-link` that can receive and process the link data.

This extension provides a simple form interface for adding links with all the required fields and automatically captures the current page's URL and title to save you time.
