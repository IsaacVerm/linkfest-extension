# linkfest-extension

## Purpose

This browser extension allows me to add links to `links.json` in my local weblog repository.
`links.json` contains all the links I display on a separate page on my weblog.

`links.json` is a JSON array of objects. This is an example of what an object element in `links.json` might look like:

```json
{
    "title": "In Praise of Idleness",
    "source": "https://harpers.org/archive/1932/10/in-praise-of-idleness/",
    "key_text": "I think that there is far too much work done in the world, that immense harm is caused by the belief that work is virtuous, and that what needs to be preached in modern industrial countries is quite different from what always has been preached.",
    "why_interesting": "",
    "screenshot": "bertrand-russell-child.jpg"
}
```

Committing the added links and pushing them to the remote repository is done automatically and not part of this.

## UI extension

The UI of the extension itself contains just 5 text fields, one for each key of `links.json`.
If I press the send button, a POST request is made which handles adding the link input in the extension to the `links.json` file.

## Server to handle adding the link to `links.json`

Browser extensions cannot directly add links on the filesystem as they operate within the browser's sandbox environment, not the operating system's shell. That's why the extension need to POST to `/add-link` at `http://127.0.0.1:8000` with the link object as body.

