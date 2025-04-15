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