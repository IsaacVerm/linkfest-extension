You're encountering a CORS (Cross-Origin Resource Sharing) error because your Firefox extension is trying to make a request to your Flask application, but the Flask application isn't configured to accept cross-origin requests.

To fix this, you need to add CORS headers to your Flask application. Here's how to update your app.py:

```python
from flask import Flask, send_from_directory, request, jsonify
import json
import os
from flask_cors import CORS  # Import the flask_cors extension

app = Flask(__name__)

CORS(app)  # Enable CORS for all routes

LINKS_JSON_PATH = os.path.expanduser("~/Documents/index/projects/weblog/static/data/links.json")

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
        with open(LINKS_JSON_PATH, 'r', encoding='utf-8') as file:
            links = json.load(file)
        
        # Add the new link to the beginning of the list
        links.insert(0, link_data)
        
        # Write back to links.json
        with open(LINKS_JSON_PATH, 'w', encoding='utf-8') as file:
            json.dump(links, file, indent=4, ensure_ascii=False)
        
        return jsonify({'success': True, 'message': 'Link added successfully'})
    
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error: {str(e)}'}), 500

@app.route('/')
def show_index():
    return send_from_directory('static/pages', 'posts_overview_public.html')

@app.route('/private')
def show_private_index():
    return send_from_directory('static/pages', 'posts_overview_private.html')

@app.route('/linkfest')
def show_linkfest():
    return send_from_directory('static/pages', 'linkfest.html')

@app.route('/posts/<post_name>')
def show_post(post_name):
    # using f-string to avoid having to use the complete filename in the url
    # now you don't have to specify the .html extension in the url yourself
    # e.g. /posts/first-post instead of /posts/first-post.html
    return send_from_directory('static/posts', f'{post_name}.html')

@app.route('/data/<filename>')
def get_data(filename):
    return send_from_directory('static/data', f'{filename}.json', mimetype='application/json')
```

You'll need to install the Flask-CORS extension if you haven't already:

```
pip install flask-cors
```

This solution adds CORS support to all routes in your Flask application. If you want to be more selective and only enable CORS for specific routes, you can do that as well:

```python
# For specific routes only
@app.route('/add-link', methods=['POST'])
@cross_origin()  # Add this decorator to specific routes
def add_link():
    # Your existing code...
```

With this change, your Firefox extension should be able to make requests to your Flask application without encountering CORS errors.
