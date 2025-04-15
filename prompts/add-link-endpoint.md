# Code for the `/add-link` Endpoint

Here's the code to implement a server that handles adding links to your `links.json` file:

```python
from flask import Flask, request, jsonify
import json
import os

app = Flask(__name__)

# Set this to your weblog repository path where links.json is located
LINKS_JSON_PATH = os.path.expanduser("~/path/to/your/weblog/links.json")

@app.route('/add-link', methods=['POST'])
def add_link():
    try:
        # Get the link data from the request
        link_data = request.json
        
        # Validate required fields
        required_fields = ['title', 'source']
        for field in required_fields:
            if field not in link_data or not link_data[field].strip():
                return jsonify({'success': False, 'message': f'Missing required field: {field}'}), 400
        
        # Ensure all expected fields exist (even if empty)
        expected_fields = ['title', 'source', 'key_text', 'why_interesting', 'screenshot']
        for field in expected_fields:
            if field not in link_data:
                link_data[field] = ""
        
        # Read the existing links.json file
        try:
            with open(LINKS_JSON_PATH, 'r', encoding='utf-8') as file:
                links = json.load(file)
                if not isinstance(links, list):
                    return jsonify({'success': False, 'message': 'Invalid links.json format'}), 500
        except FileNotFoundError:
            # If file doesn't exist, create a new list
            links = []
        except json.JSONDecodeError:
            return jsonify({'success': False, 'message': 'Invalid JSON in links.json'}), 500
        
        # Add the new link to the beginning of the list
        links.insert(0, link_data)
        
        # Write back to links.json
        with open(LINKS_JSON_PATH, 'w', encoding='utf-8') as file:
            json.dump(links, file, indent=4, ensure_ascii=False)
        
        return jsonify({'success': True, 'message': 'Link added successfully'})
    
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000)
```

## Usage Instructions

1. Install requirements:
   ```
   pip install flask
   ```

2. Update the `LINKS_JSON_PATH` variable to point to your `links.json` file's location.

3. Run the server:
   ```
   python app.py
   ```

The server will listen on http://127.0.0.1:8000 and will accept POST requests to `/add-link` with a JSON body containing the link data.

## Security Note

This server only listens on localhost (127.0.0.1), which means only applications running on your computer can access it. This is a security measure to prevent remote systems from adding links to your file.

## CORS Configuration

If you experience CORS issues with your browser extension, you can add CORS support by adding these lines:

```python
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
```

You would need to install the additional dependency:
```
pip install flask-cors
```
