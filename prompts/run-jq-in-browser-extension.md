# Running Commands like jq in a Browser Extension

Browser extensions cannot directly run command-line tools like `jq` as they operate within the browser's sandbox environment, not the operating system's shell.

## Alternatives for JSON Processing in Browser Extensions

Instead of using `jq`, you have several options:

1. **Native JavaScript Methods**:
   ```javascript
   // Parse JSON
   const jsonData = JSON.parse(jsonString);
   
   // Access and manipulate data
   const filteredData = jsonData.items.filter(item => item.value > 10);
   
   // Extract specific fields
   const names = jsonData.people.map(person => person.name);
   ```

2. **Browser-compatible JSON Libraries**:
   - **jsonpath-plus**: Similar syntax to jq's path expressions
   - **json-query**: Lightweight JSON querying
   - **lodash**: Provides powerful data manipulation methods

3. **Reading Local Files**:
   ```javascript
   // In extension code with appropriate permissions
   const fileInput = document.createElement('input');
   fileInput.type = 'file';
   fileInput.onchange = (event) => {
     const file = event.target.files[0];
     const reader = new FileReader();
     reader.onload = (e) => {
       const jsonData = JSON.parse(e.target.result);
       // Process the JSON data here
     };
     reader.readAsText(file);
   };
   document.body.appendChild(fileInput);
   ```

## Permissions Required

For file access, your manifest.json needs:
```json
{
  "permissions": ["fileSystem"],
  "optional_permissions": ["fileSystem.write"]
}
```

Note that browser extension capabilities and permissions vary between browsers, with Chrome/Edge having different restrictions than Firefox.
