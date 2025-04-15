# Using a Local Server with jq from a Browser Extension

Yes, you absolutely can call a local server endpoint from your browser extension and have that server process JSON using `jq`. This is a solid approach that overcomes the browser's sandbox limitations.

## Architecture Overview

1. Your browser extension makes HTTP requests to a local server
2. The local server receives the JSON, processes it with `jq`, and returns results
3. Your extension handles the response

## Implementation Steps

### 1. Set up a Local Server

Using Node.js with Express (example):

```javascript
const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Allow cross-origin requests from your extension

app.post('/process-json', (req, res) => {
  const jsonData = req.body;
  const tempFile = './temp.json';
  
  // Write the received JSON to a temporary file
  fs.writeFileSync(tempFile, JSON.stringify(jsonData));
  
  // Run jq command on the file
  const jqQuery = req.query.query || '.'; // Default to identity if no query provided
  exec(`jq '${jqQuery}' ${tempFile}`, (error, stdout, stderr) => {
    if (error) {
      res.status(500).send({ error: stderr });
      return;
    }
    
    // Send the processed result back
    res.send({ result: JSON.parse(stdout) });
    
    // Clean up
    fs.unlinkSync(tempFile);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

### 2. Call the Server from Your Extension

```javascript
// In your extension's JavaScript
async function processWithJq(jsonData, jqQuery) {
  try {
    const response = await fetch('http://localhost:3000/process-json?query=' + encodeURIComponent(jqQuery), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    });
    
    const result = await response.json();
    return result.result;
  } catch (error) {
    console.error('Error calling local server:', error);
    throw error;
  }
}

// Usage example
const myData = { users: [{ name: "John", age: 30 }, { name: "Jane", age: 25 }] };
processWithJq(myData, '.users[] | select(.age > 26)')
  .then(result => console.log('Filtered data:', result));
```

### 3. Required Permissions

In your extension's manifest.json:

```json
{
  "permissions": [
    "http://localhost:3000/*"
  ]
}
```

## Security Considerations

1. The local server should only accept connections from localhost
2. Consider adding authentication if needed
3. Sanitize jq queries to prevent command injection
4. Keep the server running only when needed

This approach gives you the full power of `jq` while maintaining a clean separation between the browser extension and system-level operations.
